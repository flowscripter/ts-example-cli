/* eslint-disable import/no-extraneous-dependencies */
import nixt from 'nixt';

describe('CLI test', () => {

    test('no argument', (done) => {
        nixt()
            .run('./bin/ts-example-cli')
            .stdout(/.*Try running\?*/)
            .end(done);
    });

    test('invalid command', (done) => {
        nixt()
            .run('./bin/ts-example-cli hello')
            .stderr(/.*Unused arg: hello/)
            .stdout(/.*Try running/)
            .end(done);
    });

    test('valid command', (done) => {
        nixt()
            .run('./bin/ts-example-cli greeter')
            .stdout(/.*Hello world/)
            .end(done);
    });

    test('valid command with option', (done) => {
        nixt()
            .run('./bin/ts-example-cli greeter --subject you')
            .stdout(/.*Hello you/)
            .end(done);
    });

    test('valid command with invalid option', (done) => {
        nixt()
            .run('./bin/ts-example-cli greeter -w')
            .stdout(/.*Try running\?*/)
            .stderr(/.*Unused arg: -w/)
            .end(done);
    });
});
