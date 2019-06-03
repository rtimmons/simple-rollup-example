// imagine this comes from e.g. a 'test_builder'
class JSonModuleGenerator {
    private readonly obj: object;
    constructor(obj: object) {
        this.obj = obj;
    }
    // probably expose more than just lines?
    generate(): {lines: string[]} {
        const lines = [
            "export default ",
            JSON.stringify(this.obj),
            ";\n"
        ];
        return {
            lines: lines,
        };
    }
}

// this would be "framework" code
import * as fs from 'fs';
class ModuleGeneratorWriter {
    // replace JSonModuleGenerator with an interface for ↑↑
    write(moduleGenerator: JSonModuleGenerator, fsPath: string) {
        const output = moduleGenerator.generate();
        fs.writeFileSync(fsPath, output.lines.join('\n'));
    }
}

import * as rollup from 'rollup';
import * as config from './rollup.config';

async function main() {
    const writer = new ModuleGeneratorWriter();
    const generator = new JSonModuleGenerator({foo: 1});

    const genPath = './generated-config.js';

    writer.write(generator, genPath);

    const inputOpts: rollup.InputOptions = {
        input: './unified.ts',
        plugins: [config.plugin],
        preserveModules: false,
    };
    const outputOpts: rollup.OutputOptions = {
        file: 'rolled-up.js',
        format: 'iife',
        sourcemap: true,
    };

    const bundle = await rollup.rollup(inputOpts);
    const { output } = await bundle.generate(outputOpts);

    const lines = [];
    for (const chunkOrAsset of output) {
        lines.push(chunkOrAsset.code);
    }

    fs.writeFileSync('./rolled-up.js', lines.join('\n'));
}

Promise.resolve(main().catch(e => console.error(e)));
