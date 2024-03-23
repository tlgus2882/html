const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

const status = {
  'relaxed': 0,
  'normal': 0,
  'busy': 0 };
  wss.on('connection', function connection(ws) { console.log('새로운 클라이언트가 연결되었습니다.');

  // 클라이언트에게 초기 상태 전송 ws.send(JSON.stringify(status));
  
  ws.on('message', function incoming(message) { console.log('받은 메시지:', message); const data = JSON.parse(message);
  if (data.action === 'increment' && status[data.type] < 50) {
    status[data.type]++;
  }
  
  // 모든 클라이언트에게 최신 상태 전송
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(status));
    }
  });
}); });
console.log('웹소켓 서버가 3000번 포트에서 실행 중입니다...');