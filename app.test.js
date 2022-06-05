const calc = require('./app');

test('basic math tests', () => {
  expect(calc.add(1, 2)).toBe(3);
  expect(calc.add(-1, -2)).toBe(-3);
  expect(calc.sub(1, 2)).toBe(-1);
  expect(calc.sub(-1, -2)).toBe(1);
  expect(calc.div(4, 2)).toBe(2);
  expect(calc.div(4, 0)).toBe(Infinity);
  expect(calc.div(0, 4)).toBe(0);
  expect(calc.mul(4, 2)).toBe(8);
  expect(calc.mul(0, 4)).toBe(0);
  expect(calc.sqrt(4)).toBe(2);
  expect(calc.sqrt(100)).toBe(10);
  expect(calc.power(4, 2)).toBe(16);
  expect(calc.power(2, 3)).toBe(8);
});