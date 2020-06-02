import { NodeCLI, PLUGIN_REGISTRY_SERVICE } from '@flowscripter/cli-framework';
import ExampleCommandFactory from './ExampleCommandFactory';

(async (): Promise<void> => {

    // Provide PluginRegistry custom config to use a custom package install location
    // and force a module scope
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const serviceConfigs = new Map<string, any>();
    serviceConfigs.set(PLUGIN_REGISTRY_SERVICE, {
        moduleScope: '@flowscripter',
        pluginLocation: '/tmp/ts-example-cli-plugins'
    });

    const nodeCli: NodeCLI = new NodeCLI('ts-example-cli', serviceConfigs, new Map());

    nodeCli.addCommandFactory(new ExampleCommandFactory());

    await nodeCli.execute();
})();
