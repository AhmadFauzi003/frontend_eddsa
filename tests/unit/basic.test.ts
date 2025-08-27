export {}; // Make this a module

describe('Basic Test', () => {
  test('should pass', () => {
    expect(1 + 1).toBe(2);
  });

  test('should work with strings', () => {
    expect('hello world').toContain('world');
  });
});
