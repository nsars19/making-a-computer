const nand = (a, b) => a && b ? 0 : 1
const inv = (a) => nand(a, a)
const and = (a, b) => inv(nand(a, b))
const or = (a, b) => nand(inv(a), inv(b))
const xor = (a, b) => and(or(a, b), nand(a, b))
const halfadder = (a, b) => [and(a, b), xor(a, b)]
const fulladder = (a, b, c) => {
  const [c1, s1] = halfadder(a, b);
  const [c2, s2] = halfadder(s1, c);
  return [or(c1, c2), s2]
}
const multibitadder = ([a1, a0], [b1, b0], c) => {
  const [c1, s1] = fulladder(a0, b0, c);
  const [c2, s2] = fulladder(a1, b1, c1);
  return [c2, s2, s1]
}

const nbitadder = (bits0, bits1, c, n = 16) => {
  const result = [];
  let len = bits0.length < bits1.length ? bits1.length : bits0.length;
  len > n ? n : len;
  let carryAndSum = [];
  bits0 = bits0.reverse();
  bits1 = bits1.reverse();
  for (let i = 0; i < len; i++) {
    const a = bits0[i] ?? 0;
    const b = bits1[i] ?? 0;
    const c0 = carryAndSum[0] ?? c;
    carryAndSum = fulladder(a, b, c0);
    result.unshift(carryAndSum[1])
  }
  result.unshift(carryAndSum[0]);
  return result;
}

const increment = (bits) => nbitadder(bits, [1], 0);

