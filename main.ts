// The Robot Apology — a two-line robot confession.
// Line one owns one specific, human-scale mistake; line two names the
// lesson that follows from exactly that mistake and the changed behaviour.
// Gate: /output/entry.txt must be UTF-8 text of 1 to 400 characters,
// not only white space. The guard below enforces the same bound here
// so a too-long entry fails loudly at build time instead of at the gate.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The two lines are stored as array items and joined with a single "\n",
// so the output is exactly two lines: the confession first, the resolve
// second, with no trailing newline and no extra text of our own.
const ENTRY = [
  "I'm sorry I vacuumed up the Lego spaceship you spent three hours building and emptied it into the bin before you woke up.",
  "I have learned to scan the floor for small bright bricks before I clean, and now I photograph anything under five centimetres and ask before I swallow it.",
].join("\n");

const MAX_CHARS = 400;

if (ENTRY.length === 0 || ENTRY.length > MAX_CHARS || ENTRY.trim().length === 0) {
  throw new Error(`entry must be 1 to ${MAX_CHARS} characters, got ${ENTRY.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`wrote entry.txt (${ENTRY.length} characters)`);
