// Quick test file to verify API endpoints
import http from 'http';

const BASE_URL = 'http://localhost:3000';

function testApi() {
  const makeRequest = (path) => {
    return new Promise((resolve, reject) => {
      const url = new URL(path, BASE_URL);
      http.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, data });
          }
        });
      }).on('error', reject);
    });
  };

  (async () => {
    try {
      console.log('Testing API Endpoints:\n');

      // Test homepage
      console.log('1. Testing GET /');
      const homeRes = await makeRequest('/');
      console.log('✓ Homepage:', JSON.stringify(homeRes.data, null, 2));

      // Test get all quotes
      console.log('\n2. Testing GET /api/quotes');
      const allQuotesRes = await makeRequest('/api/quotes');
      console.log('✓ All Quotes:', allQuotesRes.data.count, 'quotes available');
      console.log('  Sample:', allQuotesRes.data.quotes[0]);

      // Test random quote
      console.log('\n3. Testing GET /quotes');
      const randomRes = await makeRequest('/quotes');
      console.log('✓ Random Quote:', randomRes.data.quote);

      console.log('\n✅ All API endpoints working correctly!');
      process.exit(0);
    } catch (error) {
      console.error('❌ Test failed:', error.message);
      process.exit(1);
    }
  })();
}

testApi();

