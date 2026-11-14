// 젠가 PvP 서버: 정적 파일(index.html) + WebSocket 릴레이 (초대코드 4자리 = 방)
const http=require('http'),fs=require('fs'),path=require('path'),{WebSocketServer}=require('ws');
const types={'.html':'text/html; charset=utf-8','.svg':'image/svg+xml'};
const srv=http.createServer((q,r)=>{
  const f=q.url.split('?')[0]=='/'?'index.html':q.url.slice(1);
  if(!/^[\w.-]+$/.test(f)||!types[path.extname(f)]){r.writeHead(404);return r.end()}
  fs.readFile(path.join(__dirname,f),(e,b)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'Content-Type':types[path.extname(f)]});r.end(b)});
});
const rooms=new Map();let n=0;
new WebSocketServer({server:srv}).on('connection',ws=>{
  ws.id='p'+(++n);
  ws.on('message',raw=>{let m;try{m=JSON.parse(raw)}catch{return}
    if(m.t=='j'&&/^\d{4}$/.test(m.c)){ws.room=m.c;if(!rooms.has(m.c))rooms.set(m.c,new Set());const R=rooms.get(m.c);
      if(R.size>=4)return ws.close();
      for(const o of R)if(o.pres)ws.send(JSON.stringify({t:'p',i:o.id,d:o.pres}));R.add(ws);return}
    const R=rooms.get(ws.room);if(!R)return;
    if(m.t=='p')ws.pres=m.d;
    for(const o of R)if(o!==ws&&o.readyState==1)o.send(JSON.stringify(m.t=='p'?{t:'p',i:ws.id,d:m.d}:{t:'e',d:m.d}));
  });
  ws.on('close',()=>{const R=rooms.get(ws.room);if(!R)return;R.delete(ws);for(const o of R)o.send(JSON.stringify({t:'l',i:ws.id}));if(!R.size)rooms.delete(ws.room)});
});
const PORT=process.env.PORT||3000;srv.listen(PORT,()=>console.log('젠가 PvP 서버: http://localhost:'+PORT));
