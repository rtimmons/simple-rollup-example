import * as rollup from 'rollup';
import * as glue from './plugin-glue';
import * as fs from "fs";
import {JSonModuleGenerator, ModuleGeneratorWriter} from "../fuzzer/StepGenerator";

async function main() {
    const writer = new ModuleGeneratorWriter();
    const generator = new JSonModuleGenerator({foo: 1});

    fs.copyFileSync('./src/fuzzer/unified.js.txt', './generated/unified.js');
    writer.write(generator, './generated/generated-config.js');

    const inputOpts: rollup.InputOptions = {
        input: './generated/unified.js',
        plugins: [glue.plugin],
        preserveModules: false,
        external: ['../libfuzz/sbi.js'],
    };
    const outputOpts: rollup.OutputOptions = {
        file: 'generated/rolled-up.js',
        format: 'iife',
        sourcemap: true,
    };

    const bundle = await rollup.rollup(inputOpts);
    const { output } = await bundle.generate(outputOpts);

    const lines = [];
    for (const chunkOrAsset of output) {
        lines.push(chunkOrAsset.code);
    }

    fs.writeFileSync('./generated/generated-test.js', lines.join('\n'));
}

Promise.resolve(main().catch(e => console.error(e)));
