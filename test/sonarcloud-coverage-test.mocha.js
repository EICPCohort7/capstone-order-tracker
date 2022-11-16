import hello from '../server/coverage_test_app.js';
import { expect } from 'chai';

describe('Test coverage', () => {
  it('Smoke test', async () => {
    let result = hello;
    expect(result).to.equal('hello world');
  });
});
