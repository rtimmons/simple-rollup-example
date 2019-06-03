import * as rollup from 'rollup';
import * as glue from './plugin-glue';
import * as fs from "fs";

// TODO: probably move to another file
class ModuleGeneratorWriter {
    // TODO: interface for moduleGenerator based on the one in "fuzzer"
    write(moduleGenerator: any, fsPath: string) {
        const output = moduleGenerator.generate();
        fs.writeFileSync(fsPath, output.lines.join('\n'));
    }
}


async function main() {
    // TODO: don't hard-code path here, read from argv
    // TODO: don't "reach in" to the fuzzer dir, just require(argv[2]) and then
    //       extract the generator
    const fuzzer = require('../fuzzer/StepGenerator');
    // TODO: just use `fuzzer.generator` and rename the import
    const generator = new fuzzer.JSonModuleGenerator({foo: 1});

    const writer = new ModuleGeneratorWriter();
    writer.write(generator, './generated/generated-config.js');

    // TODO: read the file from the fuzzer export object
    fs.copyFileSync('./src/fuzzer/unified.js.txt', './generated/unified.js');

    const inputOpts: rollup.InputOptions = {
        input: './generated/unified.js',
        // This works around a rollup-typescript-plugin oddity
        plugins: [glue.plugin],
        preserveModules: false,
        // Don't actually put the `sbi` stuff into the generated file
        external: ['../libfuzz/sbi.js', '../libfuzz/sbi'],
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
