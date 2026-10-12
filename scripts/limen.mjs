import { spawnSync } from 'node:child_process';
import { main } from '../vendor/limen/src/main.ts';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { delimiter, resolve } from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
process.env.LIMEN_HOME ||= resolve(root,'.limen/home');
process.env.LIMEN_ENGINE ||= 'pi';
const existing=resolve(homedir(),'.pi/agent');
process.env.PI_CODING_AGENT_DIR ||= existsSync(resolve(existing,'auth.json'))?existing:resolve(root,'.limen/pi-agent');
process.env.LIMEN_PACKAGE=resolve(root,'vendor/limen');
process.env.PATH=resolve(root,'node_modules/.bin')+delimiter+(process.env.PATH||'');
process.chdir(root);
const args=process.argv.slice(2);
const launching=['spawn','continue','keeper','ticket-author'].includes(args[0])||(args[0]==='group'&&args[1]==='start');
const option=name=>{const i=args.indexOf(name);return i>=0?args[i+1]:undefined};
if(launching&&(option('--engine')||process.env.LIMEN_ENGINE)==='pi'){
 const model=option('--model')||process.env.LIMEN_WORKER_MODEL;
 const provider=option('--provider')||(model?.includes('/')?model.split('/')[0]:undefined);
 if(args[0]!=='continue'&&!model){console.error('Seleciona --model e --provider no Pi autenticado antes de iniciar um job.');process.exit(2)}
 const result=spawnSync(resolve(root,'node_modules/.bin/pi'),['auth','check',...(provider?['--provider',provider]:[]),...(model?['--model',model]:[])],{cwd:root,env:process.env,encoding:'utf8'});
 if(result.status!==0||result.stdout.trim()!=='ready'){console.error('Pi: not_ready. Executa npm run agents, usa /login e configura o provider/modelo. Nenhum job foi iniciado.');process.exit(2)}
}
await main(args);
