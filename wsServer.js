const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const status = {
  'relaxed': 0,
  'normal': 0,
  'busy': 0
};

wss.on('connection', function connection(ws) {
  console.log('Client connected');

  // 클라이언트에 초기 상태 보내기
  ws.send(JSON.stringify({
    type: 'update',
    status: status
  }));

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    
    // 모든 클라이언트에게 상태 업데이트 메시지 보내기
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({
          type: 'update',
          status: status
        }));
      }
    });
  });
});

console.log('WebSocket server started on ws://localhost:8080');
