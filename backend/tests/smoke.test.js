import assert from 'assert';
import axios from 'axios';

// Basic smoke tests assuming backend is running locally
describe('Backend smoke', () => {
  it('GET /quotes returns a quote', async () => {
    const res = await axios.get('http://localhost:3000/quotes');
    assert.ok(res.data.text, 'quote text missing');
  });
});
