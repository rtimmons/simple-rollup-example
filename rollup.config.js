import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';

module.exports = {
    input: 'index.ts',
    plugins: [
        typescript() // so Rollup can convert TypeScript to JavaScript
    ],
    output: [
        {
            file: 'rolled-up.js',
            format: 'iife',
            name: 'rolledUp',
            footer: ';rolledUp();',
            sourcemap: true,
        },
    ]
};

