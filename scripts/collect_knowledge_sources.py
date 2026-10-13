#!/usr/bin/env python3
"""Materialize the pinned public prose sources without executing upstream code.

Use a cache outside the checkout. Only docs/Markdown/man pages/licenses are checked out.
"""
import argparse
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def git(directory, *args, input_=None):
    subprocess.run(['git', '-C', str(directory), *args], input=input_, text=True, check=True)


def collect(cache):
    cache.mkdir(parents=True, exist_ok=True)
    for source in json.loads((ROOT/'research/knowledge-sources.json').read_text()):
        repo, commit = source['repository'], source['commit']
        directory = cache / repo.replace('/', '__')
        if (directory/'.git').exists():
            actual = subprocess.check_output(['git','-C',str(directory),'rev-parse','HEAD'], text=True).strip()
            if actual == commit: continue
            raise ValueError('Cache is at another revision; use a fresh cache: ' + repo)
        directory.mkdir(exist_ok=True)
        git(directory, 'init', '--quiet')
        git(directory, 'remote', 'add', 'origin', 'https://github.com/'+repo+'.git')
        git(directory, 'config', 'core.sparseCheckout', 'true')
        git(directory, 'fetch', '--filter=blob:none', '--depth=1', 'origin', commit)
        paths = subprocess.check_output(['git','-C',str(directory),'ls-tree','-r','--name-only','FETCH_HEAD'], text=True).splitlines()
        selected = []
        for p in paths:
            prose = p.lower().endswith(('.md','.mdx')) and (repo != 'MicrosoftDocs/azure-docs' or p.startswith('articles/sap/'))
            notice = Path(p).name.lower().startswith(('license','licence','notice','copying'))
            man = repo == 'SUSE/SAPHanaSR' and p.startswith('man/') and p.endswith(('.5','.7','.8'))
            if prose or notice or man: selected.append('/'+p)
        git(directory, 'sparse-checkout', 'set', '--no-cone', '--stdin', input_='\n'.join(selected)+'\n')
        git(directory, 'checkout', '--detach', 'FETCH_HEAD')
        print('Collected pinned prose:',repo,len(selected),flush=True)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output-directory', type=Path, required=True)
    collect(parser.parse_args().output_directory)
