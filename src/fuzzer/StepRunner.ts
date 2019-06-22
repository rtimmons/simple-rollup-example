import '../libfuzz/sbi.js';

import {Bar} from './b';

export function runSteps(steps: any) {
  const b = new Bar();
  print(steps);
  print(steps);
}
