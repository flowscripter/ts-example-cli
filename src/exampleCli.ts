import {
    PLUGIN_REGISTRY_SERVICE,
    STDOUT_PRINTER_SERVICE,
    AdvancedMultiCommandNodeCLI,
    Command,
    CommandArgs,
    Context,
    PluginManagerConfig,
    Printer,
    SubCommand
} from '@flowscripter/cli-framework';

function getCommand(): Command {
    return {
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
            const printer = context.serviceRegistry.getServiceById(STDOUT_PRINTER_SERVICE) as unknown as Printer;
            if (printer == null) {
                throw new Error('STDOUT_PRINTER_SERVICE not available in context');
            }
            printer.info(`Hello ${commandArgs.subject}\n`);
        }
    } as SubCommand;
}

(async (): Promise<void> => {
    // Provide PluginRegistry custom config to use a custom package install location
    // and force a module scope
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const serviceConfigs = new Map<string, any>();
    serviceConfigs.set(PLUGIN_REGISTRY_SERVICE, {
        moduleScope: '@flowscripter',
        pluginLocation: '/tmp/ts-example-cli-plugins'
    } as PluginManagerConfig);

    const cli = new AdvancedMultiCommandNodeCLI([], [getCommand()], serviceConfigs, new Map(), 'ts-example-cli');

    await cli.execute();
})();
