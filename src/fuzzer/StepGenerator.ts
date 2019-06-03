import * as fs from 'fs';

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
