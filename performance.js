// middleware/performance.js - Performance monitoring

const performanceStats = {
  requests: 0,
  errors: 0,
  totalResponseTime: 0,
  slowRequests: []
};

const performanceMiddleware = (req, res, next) => {
  const startTime = Date.now();
  
  performanceStats.requests++;
  
  res.on('finish', () => {
    const responseTime = Date.now() - startTime;
    performanceStats.totalResponseTime += responseTime;
    
    // Log slow requests (>1000ms)
    if (responseTime > 1000) {
      performanceStats.slowRequests.push({
        url: req.originalUrl,
        method: req.method,
        responseTime,
        timestamp: new Date().toISOString()
      });
      
      // Keep only last 10 slow requests
      if (performanceStats.slowRequests.length > 10) {
        performanceStats.slowRequests.shift();
      }
    }
    
    // Log errors
    if (res.statusCode >= 400) {
      performanceStats.errors++;
    }
  });
  
  next();
};

const getPerformanceStats = () => {
  const avgResponseTime = performanceStats.requests > 0 
    ? performanceStats.totalResponseTime / performanceStats.requests 
    : 0;
    
  return {
    ...performanceStats,
    averageResponseTime: Math.round(avgResponseTime),
    errorRate: performanceStats.requests > 0 
      ? ((performanceStats.errors / performanceStats.requests) * 100).toFixed(2) + '%'
      : '0%'
  };
};

module.exports = { performanceMiddleware, getPerformanceStats };