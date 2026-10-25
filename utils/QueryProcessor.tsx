export default function QueryProcessor(query: string): string {
  const q = query.toLowerCase();
  const n = (q.match(/\d+/g) || []).map(Number);

  if (q.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (q.includes("andrew id")) {
    return "snaimi";
  }

  if (q.includes("largest")) {
    return String(Math.max(...n));
  }

  if (q.includes("smallest")) {
    return String(Math.min(...n));
  }

  if (q.includes("primes")) {
    const isPrime = (x: number) => {
      if (x < 2) return false;
      for (let i = 2; i * i <= x; i++) if (x % i === 0) return false;
      return true;
    };
    return n.filter(isPrime).join(", ");
  }

  if (q.includes("square and a cube")) {
    return n
      .filter((x) => Math.round(Math.pow(x, 1 / 6)) ** 6 === x)
      .join(", ");
  }

  if (q.startsWith("what is") && n.length >= 2) {
    try {
      const t = q
        .replace("what is", "")
        .replace("?", "")
        .replace(/to the power of/g, "^")
        .replace(/multiplied by/g, "*")
        .replace(/plus/g, "+")
        .replace(/minus/g, "-")
        .trim()
        .split(/\s+/);
      const pow = (a: bigint, b: bigint) => {
        let r = BigInt(1);
        for (let k = 0; k < Number(b); k++) r = r * a;
        return r;
      };
      const nums: bigint[] = [];
      const ops: string[] = [];
      for (let i = 0; i < t.length; i++) {
        if (i % 2 === 0) nums.push(BigInt(t[i]));
        else ops.push(t[i]);
      }
      for (const level of [["^"], ["*"], ["+", "-"]]) {
        for (let i = 0; i < ops.length; ) {
          if (level.includes(ops[i])) {
            const a = nums[i];
            const b = nums[i + 1];
            const r =
              ops[i] === "^" ? pow(a, b) :
              ops[i] === "*" ? a * b :
              ops[i] === "+" ? a + b : a - b;
            nums.splice(i, 2, r);
            ops.splice(i, 1);
          } else {
            i++;
          }
        }
      }
      return nums[0].toString();
    } catch {
      return "";
    }
  }

  if (q.includes("name")) {
    return "Eduardo";
  }

  return "";
}
