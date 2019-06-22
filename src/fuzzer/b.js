import {Foo} from './a';

export class Bar {
    getFoo() { return this.foo; }
    constructor() {
        this.foo = new Foo(this);
        console.log('Constructed Bar');
    }
}
