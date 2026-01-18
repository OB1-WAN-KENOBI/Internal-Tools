const fs = require('fs');
const logPath = '/home/obi-wan/Рабочий стол/Internal Tools/.cursor/debug.log';

module.exports = (req, res, next) => {
  // #region agent log
  try { fs.appendFileSync(logPath, JSON.stringify({location:'cors-middleware.cjs:8',message:'CORS middleware hit',data:{path:req.path,method:req.method,origin:req.headers.origin},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'F,G'}) + '\n'); } catch(e) {}
  // #endregion
  
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
  if (req.method === 'OPTIONS') {
    // #region agent log
    try { fs.appendFileSync(logPath, JSON.stringify({location:'cors-middleware.cjs:17',message:'OPTIONS preflight',data:{path:req.path},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'F'}) + '\n'); } catch(e) {}
    // #endregion
    return res.sendStatus(200);
  }
  
  next();
};
