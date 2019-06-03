import * as sbi from '../libfuzz/sbi.js';

export function mymain(steps: any) {
  sbi.print(steps);
}
