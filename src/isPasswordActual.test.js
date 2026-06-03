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

  it(`should return immediate change status for password changed a year ago`, () => {
    const lastYear = isPasswordActual(today.year - 1, today.month, today.date);

    expect(lastYear).toBe('Immediately change the password!');
  });

  it(`should return warning status for password changed a month ago`, () => {
    const lastMonth = isPasswordActual(today.year, today.month - 1, today.date);

    expect(lastMonth).toBe('You should change your password.');
  });

  it(`should return actual status for password changed 30 days ago`, () => {
    const lastDay = isPasswordActual(today.year, today.month, today.date - 30);

    expect(lastDay).toBe('Password is actual.');
  });
});
