// imagine this comes from e.g. a 'test_builder'
export class JSonModuleGenerator {
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
export class ModuleGeneratorWriter {
    // replace JSonModuleGenerator with an interface for ↑↑
    write(moduleGenerator: JSonModuleGenerator, fsPath: string) {
        const output = moduleGenerator.generate();
        fs.writeFileSync(fsPath, output.lines.join('\n'));
    }
}
