// shell-built-ins
import * as sbi from '../libfuzz/sbi.js';

export function runSteps(steps: any) {
  sbi.print(steps);
}
