import '../libfuzz/sbi.js';

export function runSteps(steps: any) {
  // print twice!
  print(steps);
  print(steps);
}
