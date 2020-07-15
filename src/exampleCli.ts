import {
    PLUGIN_REGISTRY_SERVICE,
    STDOUT_PRINTER_SERVICE,
    BaseNodeCLI,
    Command,
    CommandArgs,
    Context,
    MultiCommandHelpGlobalCommand,
    MultiCommandHelpSubCommand,
    PluginManagerConfig,
    Printer,
    PrompterService,
    StderrPrinterService,
    StdoutPrinterService,
    SubCommand,
    UsageCommand,
    VersionCommand
} from '@flowscripter/cli-framework';

const helpGlobalCommand = new MultiCommandHelpGlobalCommand();
const usageCommand = new UsageCommand(helpGlobalCommand);

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

    const nodeCli = new BaseNodeCLI([
        new StderrPrinterService(90),
        new StdoutPrinterService(90),
        new PrompterService(90)
    ], [
        helpGlobalCommand,
        new MultiCommandHelpSubCommand(),
        new VersionCommand(),
        getCommand()
    ], serviceConfigs, new Map(), 'ts-example-cli', usageCommand, usageCommand);

    await nodeCli.execute();
})();
