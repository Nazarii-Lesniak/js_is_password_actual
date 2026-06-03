'use strict';

describe(`Function 'isPasswordActual':`, () => {
  const isPasswordActual = require('./isPasswordActual');
  const date = new Date(Date.now());
  const today = {
    year: date.getUTCFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
  };

  it(`should be declared`, () => {
    expect(isPasswordActual).toBeInstanceOf(Function);
  });

  it(`should return a string`, () => {
    expect(typeof isPasswordActual(today.year, today.month, today.date)).toBe(
      'string',
    );
  });

  it(`should return immediate change status if changed more than 60 days ago`, () => {
    const lastYear = isPasswordActual(today.year, today.month, today.date - 61);

    expect(lastYear).toBe('Immediately change the password!');
  });

  it(`should return warning status if changed between 31 and 60 days ago`, () => {
    const lowerBoundaryCase = isPasswordActual(
      today.year,
      today.month,
      today.date - 60,
    );
    const upperBoundaryCase = isPasswordActual(
      today.year,
      today.month,
      today.date - 31,
    );

    expect(lowerBoundaryCase).toBe('You should change your password.');
    expect(upperBoundaryCase).toBe('You should change your password.');
  });

  it(`should return actual status if changed 30 days ago or less`, () => {
    const lastDay = isPasswordActual(today.year, today.month, today.date - 30);

    expect(lastDay).toBe('Password is actual.');
  });
});
