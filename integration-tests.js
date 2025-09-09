// tests/integration-tests.js - Complete integration test suite

const baseUrl = 'http://localhost:3001';

class IntegrationTester {
  constructor() {
    this.results = {
      total: 0,
      passed: 0,
      failed: 0,
      tests: []
    };
  }

  async runTest(name, testFn) {
    this.results.total++;
    console.log(`🧪 Testing: ${name}...`);
    
    try {
      await testFn();
      this.results.passed++;
      this.results.tests.push({ name, status: 'PASSED' });
      console.log(`✅ ${name}: PASSED`);
    } catch (error) {
      this.results.failed++;
      this.results.tests.push({ name, status: 'FAILED', error: error.message });
      console.log(`❌ ${name}: FAILED - ${error.message}`);
    }
  }

  async makeRequest(endpoint, options = {}) {
    const url = `${baseUrl}${endpoint}`;
    const response = await fetch(url, options);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  }

  async runAllTests() {
    console.log('🚀 Starting Complete Integration Test Suite\n');
    
    // Basic Connectivity Tests
    await this.runTest('Server Health Check', async () => {
      const data = await this.makeRequest('/test');
      if (!data.message.includes('successful')) {
        throw new Error('Health check failed');
      }
    });

    await this.runTest('API Documentation', async () => {
      const data = await this.makeRequest('/api/docs');
      if (!data.title || !data.endpoints) {
        throw new Error('API docs incomplete');
      }
    });

    // Monastery API Tests
    await this.runTest('Get All Monasteries', async () => {
      const data = await this.makeRequest('/api/monasteries');
      if (!data.success || data.count < 10) {
        throw new Error('Insufficient monastery data');
      }
    });

    await this.runTest('Get Single Monastery', async () => {
      const data = await this.makeRequest('/api/monasteries/1');
      if (!data.success || !data.data.name) {
        throw new Error('Single monastery fetch failed');
      }
    });

    await this.runTest('Search Functionality', async () => {
      const data = await this.makeRequest('/api/search/rumtek');
      if (!data.success || data.count === 0) {
        throw new Error('Search returned no results');
      }
    });

    // Authentication Tests
    let authToken = '';
    await this.runTest('User Registration', async () => {
      const data = await this.makeRequest('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Test User',
          email: `test${Date.now()}@example.com`,
          password: 'password123'
        })
      });
      
      if (!data.success || !data.data.token) {
        throw new Error('Registration failed');
      }
      authToken = data.data.token;
    });

    await this.runTest('User Profile Access', async () => {
      if (!authToken) throw new Error('No auth token available');
      
      const data = await this.makeRequest('/api/auth/profile', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      
      if (!data.success || !data.data.name) {
        throw new Error('Profile access failed');
      }
    });

    // Festival Tests
    await this.runTest('Festival Calendar', async () => {
      const data = await this.makeRequest('/api/festivals');
      if (!data.success) {
        throw new Error('Festival calendar failed');
      }
    });

    // Maps API Tests
    await this.runTest('Maps Monastery Data', async () => {
      const data = await this.makeRequest('/api/maps/monasteries');
      if (!data.success || !data.center) {
        throw new Error('Maps data incomplete');
      }
    });

    // Performance Tests
    await this.runTest('Response Time Check', async () => {
      const start = Date.now();
      await this.makeRequest('/api/monasteries');
      const responseTime = Date.now() - start;
      
      if (responseTime > 1000) {
        throw new Error(`Slow response: ${responseTime}ms`);
      }
    });

    // Error Handling Tests
    await this.runTest('404 Error Handling', async () => {
      try {
        await this.makeRequest('/non-existent-endpoint');
        throw new Error('Should have thrown 404 error');
      } catch (error) {
        if (!error.message.includes('404')) {
          throw new Error('Incorrect error handling');
        }
      }
    });

    this.printResults();
  }

  printResults() {
    console.log('\n📊 INTEGRATION TEST RESULTS');
    console.log('================================');
    console.log(`Total Tests: ${this.results.total}`);
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`Success Rate: ${((this.results.passed / this.results.total) * 100).toFixed(1)}%`);
    
    if (this.results.failed > 0) {
      console.log('\n🔍 FAILED TESTS:');
      this.results.tests
        .filter(t => t.status === 'FAILED')
        .forEach(t => console.log(`   - ${t.name}: ${t.error}`));
    }
    
    if (this.results.passed === this.results.total) {
      console.log('\n🎉 ALL TESTS PASSED - BACKEND IS DEMO READY!');
    } else {
      console.log('\n⚠️ Some tests failed - please fix before demo');
    }
  }
}

// Run tests
const tester = new IntegrationTester();
tester.runAllTests().catch(console.error);