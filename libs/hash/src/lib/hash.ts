import { sha256 } from 'js-sha256';

const ITERATIONS = 50000;

export function hash(message: string): string {
  let hash = message;
  for(let i = 0; i < ITERATIONS; i++) {
    hash = sha256(hash);
  }

  return hash;
}
