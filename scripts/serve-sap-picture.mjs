import { createServer } from 'node:http';
import { resolve } from 'node:path';
import { buildSapPicture, root } from './build-sap-picture.mjs';
import { activityReader } from '../vendor/limen/src/picture/activity.ts';
const port=Number(process.env.SAP_PICTURE_PORT||4747);
if(!Number.isInteger(port)||port<1||port>65535)throw new Error('Porta inválida');
const read=activityReader(resolve(root,'.limen/jobs'));
let snapshot=JSON.stringify(await read()),signature='';let refreshing=false;
const clients=new Set();
const server=createServer(async(req,res)=>{
 try{
  if(![`127.0.0.1:${port}`,`localhost:${port}`].includes(req.headers.host)){res.writeHead(403).end('Host inválido');return}
  const path=new URL(req.url,'http://127.0.0.1').pathname;
  if(req.method!=='GET'){res.writeHead(405).end();return}
  if(path==='/'||path==='/sap-picture.html'){
   const {html}=await buildSapPicture('/sap-live/events');
   res.writeHead(200,{'content-type':'text/html; charset=utf-8','cache-control':'no-store'}).end(html);return;
  }
  if(path==='/activity.json'){res.writeHead(200,{'content-type':'application/json','cache-control':'no-store'}).end(snapshot);return}
  if(path==='/events'||path==='/sap-live/events'){
   res.writeHead(200,{'content-type':'text/event-stream','cache-control':'no-store',connection:'keep-alive'});
   res.write('retry: 2000\n\nevent: activity\ndata: '+snapshot+'\n\n');clients.add(res);req.on('close',()=>clients.delete(res));return;
  }
  res.writeHead(404).end('Não encontrado');
 }catch(e){if(!res.headersSent)res.writeHead(500);res.end('Falha ao gerar mapa');console.error(e.message)}
});
const refresh=setInterval(async()=>{
 if(refreshing)return;refreshing=true;
 try{const s=await read();snapshot=JSON.stringify(s);const next=JSON.stringify([s.jobs,s.groups]);if(next!==signature){signature=next;for(const c of clients)c.write('event: activity\ndata: '+snapshot+'\n\n')}}
 catch(e){console.error('Falha ao ler atividade:',e.message)}finally{refreshing=false}
},1000);
const ping=setInterval(()=>{for(const c of clients)c.write('event: ping\ndata: '+JSON.stringify({at:new Date().toISOString()})+'\n\n')},15000);
server.listen(port,'127.0.0.1',()=>console.log(`SAP Picture live: porta ${port}; atividade Limen real, sem lançar agentes.`));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>{clearInterval(refresh);clearInterval(ping);for(const c of clients)c.end();server.close(()=>process.exit(0))});
server.on('error',e=>{clearInterval(refresh);clearInterval(ping);console.error(e.message);process.exitCode=1});
