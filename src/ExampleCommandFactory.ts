import {
    Command,
    CommandFactory,
    Context,
    Printer,
    STDOUT_PRINTER_SERVICE,
    SubCommand,
    CommandArgs
} from '@flowscripter/cli-framework';

export default class ExampleCommandFactory implements CommandFactory {

    // eslint-disable-next-line class-methods-use-this
    public getCommands(): Iterable<Command> {
        return [{
            name: 'greeter',
            description: 'The classic example',
            options: [{
                name: 'subject',
                defaultValue: 'world',
                description: 'Who to greet',
                shortAlias: 's',
                isOptional: true
            }],
            positionals: [],
            run: async (commandArgs: CommandArgs, context: Context): Promise<void> => {
                const printer = context.getService(STDOUT_PRINTER_SERVICE) as unknown as Printer;
                if (printer == null) {
                    throw new Error('STDOUT_PRINTER_SERVICE not available in context');
                }
                printer.info(`Hello ${commandArgs.subject}\n`);
            }
        } as SubCommand];
    }
}
