/* eslint-disable import/no-extraneous-dependencies */
import nixt from 'nixt';

describe('CLI test', () => {

    test('no argument', (done) => {
        nixt()
            .run('./bin/ts-example-cli')
            .stdout(/.*try running\?*/)
            .end(done);
    });

    test('invalid command', (done) => {
        nixt()
            .run('./bin/ts-example-cli hello')
            .stderr(/.*Unused args: hello*/)
            .stdout(/.*try running*/)
            .end(done);
    });

    test('valid command', (done) => {
        nixt()
            .run('./bin/ts-example-cli greeter')
            .stdout(/.*Hello world*/)
            .end(done);
    });

    test('valid command with option', (done) => {
        nixt()
            .run('./bin/ts-example-cli greeter --subject you')
            .stdout(/.*Hello you*/)
            .end(done);
    });
});
