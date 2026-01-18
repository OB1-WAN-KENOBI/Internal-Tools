const fs = require('fs');
const logPath = '/home/obi-wan/Рабочий стол/Internal Tools/.cursor/debug.log';

module.exports = (req, res, next) => {
  // #region agent log
  try { fs.appendFileSync(logPath, JSON.stringify({location:'sse-middleware.cjs:6',message:'SSE middleware hit',data:{path:req.path,method:req.method},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'F,H'}) + '\n'); } catch(e) {}
  // #endregion
  
  if (req.path === '/metrics/stream') {
    // #region agent log
    try { fs.appendFileSync(logPath, JSON.stringify({location:'sse-middleware.cjs:13',message:'SSE endpoint matched',data:{},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'F'}) + '\n'); } catch(e) {}
    // #endregion
    
    console.log('📡 SSE client connected');
    
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'X-Accel-Buffering': 'no',
    });
    
    // #region agent log
    try { fs.appendFileSync(logPath, JSON.stringify({location:'sse-middleware.cjs:25',message:'SSE headers set',data:{},timestamp:Date.now(),sessionId:'debug-session',runId:'fix-v2',hypothesisId:'G'}) + '\n'); } catch(e) {}
    // #endregion

    // Send initial data immediately
    const initialData = {
      activeUsers: Math.floor(Math.random() * 1000) + 100,
      eventsPerMinute: Math.floor(Math.random() * 500) + 50,
      errorRate: Math.random() * 5,
      revenue: Math.floor(Math.random() * 10000) + 1000,
    };
    
    const message = `data: ${JSON.stringify(initialData)}\n\n`;
    res.write(message);
    
    // #region agent log
    try { fs.appendFileSync(logPath, JSON.stringify({location:'sse-middleware.cjs:39',message:'Initial SSE data sent',data:{message:message,length:message.length},timestamp:Date.now(),sessionId:'debug-session',runId:'fix-v2',hypothesisId:'I,J'}) + '\n'); } catch(e) {}
    // #endregion
    
    console.log('📊 Sent initial data');

    const interval = setInterval(() => {
      const data = {
        activeUsers: Math.floor(Math.random() * 1000) + 100,
        eventsPerMinute: Math.floor(Math.random() * 500) + 50,
        errorRate: Math.random() * 5,
        revenue: Math.floor(Math.random() * 10000) + 1000,
      };
      const message = `data: ${JSON.stringify(data)}\n\n`;
      res.write(message);
      console.log('📊 Sent metrics update');
      
      // #region agent log
      try { fs.appendFileSync(logPath, JSON.stringify({location:'sse-middleware.cjs:57',message:'Periodic update sent',data:{messageLength:message.length},timestamp:Date.now(),sessionId:'debug-session',runId:'fix-v2',hypothesisId:'K'}) + '\n'); } catch(e) {}
      // #endregion
    }, 3000);

    req.on('close', () => {
      clearInterval(interval);
      console.log('📡 SSE client disconnected');
    });
  } else {
    next();
  }
};
