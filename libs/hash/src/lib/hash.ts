import { sha256 } from 'js-sha256';

const ITERATIONS = 50000;

export function hash(message: string): string {
  let result = message;
  for(let i = 0; i < ITERATIONS; i++) {
    result = sha256(result);
  }

  return result;
}
