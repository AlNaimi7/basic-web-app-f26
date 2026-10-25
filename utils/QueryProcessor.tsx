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

  if (q.includes("plus")) {
    return String(n.reduce((a, b) => a + b, 0));
  }

  if (q.includes("multiplied")) {
    return String(n.reduce((a, b) => a * b, 1));
  }

  if (q.includes("minus")) {
    return String(n[0] - n[1]);
  }

  if (q.includes("name")) {
    return "Eduardo";
  }

  if (q.includes("age")) {
    return "67";
  }

  return "";
}
