/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import nixt from 'nixt';
import fs from 'fs';
import os from 'os';

const executable = os.platform() === 'win32' ? 'ts-example-cli.bat' : './ts-example-cli';

describe('CLI test', () => {

    test('no argument', (done) => {
        nixt({ colors: false })
            .cwd('bin')
            .run(executable)
            .stdout(/.*Try running\?*/)
            .code(0)
            .end(done);
    });

    test('invalid command', (done) => {
        nixt({ colors: false })
            .cwd('bin')
            .run(`${executable} hello`)
            .stderr(/.*Unused arg: hello/)
            .stdout(/.*Try running/)
            .code(0)
            .end(done);
    });

    test('valid command', (done) => {
        nixt({ colors: false })
            .cwd('bin')
            .run(`${executable} greeter`)
            .stdout(/.*Hello world/)
            .code(0)
            .end(done);
    });

    test('valid command with option', (done) => {
        nixt({ colors: false })
            .cwd('bin')
            .run(`${executable} greeter --subject you`)
            .stdout(/.*Hello you/)
            .code(0)
            .end(done);
    });

    test('valid command with invalid option', (done) => {
        nixt({ colors: false })
            .cwd('bin')
            .run(`${executable} greeter -w`)
            .stdout(/.*Hello world/)
            .stderr(/.*Unused arg: -w/)
            .code(0)
            .end(done);
    });

    test('correctly typed command name arg for help command', (done) => {
        nixt({ colors: false })
            .cwd('bin')
            .run(`${executable} help greeter`)
            .stdout(/.*The classic example\?*/)
            .code(0)
            .end(done);
    });

    test('incorrectly typed command name arg for help command', (done) => {
        nixt({ colors: false })
            .cwd('bin')
            .run(`${executable} help greetes`)
            .stderr(/.*Possible matches: greeter\?*/)
            .stderr(/.*Unknown command: greetes\?*/)
            .stdout(/.*Usage\?*/)
            .code(0)
            .end(done);
    });

    test('command can be installed, run and uninstalled', async () => {
        const pluginLocation = path.join(process.cwd(), 'ts-example-cli-plugins');
        try {
            fs.rmdirSync(pluginLocation, { recursive: true });
        } catch (err) {
            // ignore and carry on
        }

        try {
            await new Promise((resolve, reject) => {
                nixt({ colors: false })
                    .cwd('bin')
                    .run(`${executable} help cat`)
                    .stdout(/.*Unknown command: cat\?*/)
                    .stdout(/.*Usage\?*/)
                    .code(0)
                    .end((err: Error) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
            });
            await new Promise((resolve, reject) => {
                nixt({ colors: false })
                    .cwd('bin')
                    .run(`${executable} plugin:add ts-example-cli-plugin`)
                    .stderr(/.*Added\?*/)
                    .code(0)
                    .end((err: Error) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
            });
            await new Promise((resolve, reject) => {
                nixt({ colors: false })
                    .cwd('bin')
                    .run(`${executable} plugin:add ts-example-cli-plugin`)
                    .code(0)
                    .end((err: Error) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
            });
            await new Promise((resolve, reject) => {
                nixt({ colors: false })
                    .cwd('bin')
                    .run(`${executable} help`)
                    .stdout(/.*cat\?*/)
                    .stdout(/.*dog\?*/)
                    .end((err: Error) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
            });
            await new Promise((resolve, reject) => {
                nixt({ colors: false })
                    .cwd('bin')
                    .run(`${executable} cat`)
                    .stdout(/.*Miaow world\?*/)
                    .end((err: Error) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
            });
            await new Promise((resolve, reject) => {
                nixt({ colors: false })
                    .cwd('bin')
                    .run(`${executable} plugin:remove ts-example-cli-plugin`)
                    .stdout(/.*Removed\?*/)
                    .end((err: Error) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
            });
            await new Promise((resolve, reject) => {
                nixt({ colors: false })
                    .cwd('bin')
                    .run(`${executable} help cat`)
                    .stderr(/.*Unknown command: cat\?*/)
                    .stdout(/.*Usage\?*/)
                    .end((err: Error) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
            });
        } catch (err) {
            try {
                fs.rmdirSync(pluginLocation, { recursive: true });
            } catch (err2) {
                // ignore and carry on
            }
        }
    });
});
