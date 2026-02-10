const fibonacci = (n) => {
  if (!Number.isInteger(n) || n < 0) return [];

  if (n === 0) return [];
  if (n === 1) return [0];

  const series = [0, 1];

  for (let i = 2; i < n; i++) {
    series.push(series[i - 1] + series[i - 2]);
  }

  return series;
};

const isPrime = (num) => {
  if (!Number.isInteger(num) || num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }

  return true;
};

const gcd = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);

  while (b !== 0) {
    [a, b] = [b, a % b];
  }

  return a;
};

const hcf = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) return 0;

  return arr.reduce((acc, curr) => gcd(acc, curr));
};

const lcmTwo = (a, b) => {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
};

const lcm = (arr) => {
  if (!Array.isArray(arr) || arr.length === 0) return 0;

  return arr.reduce((acc, curr) => lcmTwo(acc, curr));
};

module.exports = {
  fibonacci,
  isPrime,
  hcf,
  lcm
};
