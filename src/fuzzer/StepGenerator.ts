// TODO: extract to a proper interface
export class JSonModuleGenerator {
    private readonly obj: object;
    constructor(obj: object) {
        this.obj = obj;
    }
    generate(): {lines: string[]} {
        const lines = [
            "export const generated = ",
            JSON.stringify(this.obj),
            ";",
        ];
        return {
            lines: lines,
        };
    }
}
