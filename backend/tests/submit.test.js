import assert from 'assert';
import axios from 'axios';

// Requires backend running at localhost:3000
// Smoke test for POST /quotes (no auth)

describe('POST /quotes (smoke)', () => {
  it('accepts a new quote and returns an object', async () => {
    const payload = { text: `Test quote ${Date.now()}`, author: 'Smoke Tester' };
    const res = await axios.post('http://localhost:3000/quotes', payload, {
      headers: { 'Content-Type': 'application/json' },
      validateStatus: () => true,
    });
    assert.ok(res.status === 200 || res.status === 201, `unexpected status ${res.status}`);
    assert.ok(res.data && (res.data.text || res.data.quote?.text), 'response missing quote text');
  });
});
