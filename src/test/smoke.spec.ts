import chai from 'chai';
const { expect } = chai;

describe('Smoke test', () => {
  it('should test if the world is still normal', () => {
    expect(1 + 1).to.equal(2)
  });

  it('should check for environment variables', () => {
    expect(process.env.JWT_SECRET).to.not.be.empty;
  })
})