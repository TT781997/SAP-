import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { homedir } from 'node:os';
const root=fileURLToPath(new URL('../',import.meta.url));
const binary=resolve(root,'node_modules/.bin/pi');
if(!existsSync(binary)){console.log('Pi: não instalado. Executar npm install.');process.exitCode=1}else{
 const local=resolve(root,'.limen/pi-agent');const existing=resolve(homedir(),'.pi/agent');
 const agentDir=process.env.PI_CODING_AGENT_DIR||(existsSync(resolve(existing,'auth.json'))?existing:local);
 const r=spawnSync(binary,['auth','check',...process.argv.slice(2)],{cwd:root,env:{...process.env,PI_CODING_AGENT_DIR:agentDir,PI_OFFLINE:'1'},encoding:'utf8'});
 const status=r.stdout.trim();
 console.log('Node:',process.versions.node);console.log('Limen: instalado a partir do commit 102b009ad1c035f49fbde54f5e23c73eb6b01db7');
 console.log('Pi: instalado; autenticação:',status==='ready'?'ready':'not_ready');
 if(status!=='ready'||r.status!==0){console.log('Abrir npm run agents, autenticar com /login e escolher um modelo; repetir este check. Não enviar credenciais no chat.');process.exitCode=2}
}
