// tests/load-test.js - Load testing script

const https = require('https');
const http = require('http');

class LoadTester {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.results = {
      total: 0,
      success: 0,
      failed: 0,
      averageTime: 0,
      times: []
    };
  }

  async makeRequest(endpoint, method = 'GET') {
    return new Promise((resolve) => {
      const startTime = Date.now();
      const url = `${this.baseUrl}${endpoint}`;
      const client = url.startsWith('https') ? https : http;
      
      const req = client.request(url, { method }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const endTime = Date.now();
          const responseTime = endTime - startTime;
          
          resolve({
            success: res.statusCode < 400,
            statusCode: res.statusCode,
            responseTime,
            dataLength: data.length
          });
        });
      });

      req.on('error', (error) => {
        const endTime = Date.now();
        resolve({
          success: false,
          error: error.message,
          responseTime: endTime - startTime
        });
      });

      req.end();
    });
  }

  async runLoadTest(endpoint, concurrentUsers, requestsPerUser) {
    console.log(`🚀 Starting load test: ${concurrentUsers} users, ${requestsPerUser} requests each`);
    console.log(`📡 Testing endpoint: ${endpoint}`);
    
    const startTime = Date.now();
    const promises = [];

    // Create concurrent users
    for (let user = 0; user < concurrentUsers; user++) {
      for (let req = 0; req < requestsPerUser; req++) {
        promises.push(this.makeRequest(endpoint));
      }
    }

    // Wait for all requests to complete
    const results = await Promise.all(promises);
    const endTime = Date.now();

    // Analyze results
    const successful = results.filter(r => r.success).length;
    const failed = results.length - successful;
    const responseTimes = results.map(r => r.responseTime);
    const averageTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
    const maxTime = Math.max(...responseTimes);
    const minTime = Math.min(...responseTimes);

    const report = {
      test: {
        endpoint,
        concurrentUsers,
        requestsPerUser,
        totalRequests: results.length,
        duration: `${(endTime - startTime) / 1000}s`
      },
      results: {
        successful,
        failed,
        successRate: `${((successful / results.length) * 100).toFixed(2)}%`
      },
      performance: {
        averageResponseTime: `${averageTime.toFixed(2)}ms`,
        minResponseTime: `${minTime}ms`,
        maxResponseTime: `${maxTime}ms`,
        requestsPerSecond: ((results.length / (endTime - startTime)) * 1000).toFixed(2)
      }
    };

    return report;
  }

  async runComprehensiveTest() {
    console.log('🧪 Running comprehensive load test...\n');
    
    const endpoints = [
      '/api/monasteries',
      '/api/monasteries/1',
      '/api/search/rumtek',
      '/api/festivals',
      '/api/analytics'
    ];

    const testResults = [];

    for (const endpoint of endpoints) {
      console.log(`Testing ${endpoint}...`);
      const result = await this.runLoadTest(endpoint, 10, 5);
      testResults.push(result);
      
      // Wait between tests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Generate summary report
    console.log('\n📊 COMPREHENSIVE LOAD TEST REPORT');
    console.log('=====================================');
    
    testResults.forEach(result => {
      console.log(`\n🔗 ${result.test.endpoint}`);
      console.log(`   Success Rate: ${result.results.successRate}`);
      console.log(`   Avg Response: ${result.performance.averageResponseTime}`);
      console.log(`   Requests/sec: ${result.performance.requestsPerSecond}`);
    });

    const overallSuccessRate = testResults.reduce((sum, r) => 
      sum + parseFloat(r.results.successRate), 0) / testResults.length;
    
    console.log(`\n🎯 Overall Success Rate: ${overallSuccessRate.toFixed(2)}%`);
    
    if (overallSuccessRate > 95) {
      console.log('✅ EXCELLENT - Production ready!');
    } else if (overallSuccessRate > 85) {
      console.log('⚡ GOOD - Minor optimizations needed');
    } else {
      console.log('⚠️ NEEDS WORK - Performance issues detected');
    }

    return testResults;
  }
}

// Run load test
const baseUrl = process.argv[2] || 'http://localhost:3001';
const tester = new LoadTester(baseUrl);
tester.runComprehensiveTest().catch(console.error);