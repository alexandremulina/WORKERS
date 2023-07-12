const fibonacci = (n: number): number => {
  console.log(`Worker thread started for n = ${n}`);

  if (n <= 1) {
    return n;
  }
  let prev = 0;
  let current = 1;
  for (let i = 2; i <= n; i++) {
    const next = prev + current;
    prev = current;
    current = next;
    console.log(`Intermediate result for n = ${n}: ${current}`);
  }

  console.log(`Worker thread completed for n = ${n}`);
  return current;
};

module.exports = fibonacci;
