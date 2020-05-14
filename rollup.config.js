import cleanup from 'rollup-plugin-cleanup';
import commonjs from 'rollup-plugin-commonjs';
import { eslint } from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import ts from 'typescript';
import tempDir from 'temp-dir';

module.exports = [
    {
        input: {
            node: 'src/exampleCli.ts'
        },
        output: {
            dir: 'dist',
            format: 'es',
            sourcemap: true
        },
        watch: {
            include: 'src/**',
        },
        external: [
            'assert',
            'crypto',
            'events',
            'fs',
            'os',
            'path',
            'readline',
            'stream',
            'tty',
            'util',
            'http',
            'https',
            'zlib',
            'url',
            'string_decoder',
            'events',
            'buffer',
            'constants',
            'readable-stream'
        ],
        plugins: [
            eslint({
                include: [
                    'src/**/*.ts'
                ]
            }),
            typescript({
                typescript: ts,
                useTsconfigDeclarationDir: true,
                cacheRoot: `${tempDir}/.rpt2_cache`
            }),
            commonjs(),
            resolve(),
            cleanup({
                extensions: [
                    'ts'
                ]
            })
        ]
    }
];
