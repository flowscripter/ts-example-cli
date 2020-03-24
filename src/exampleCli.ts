import { NodeCLI } from '@flowscripter/cli-framework';
import ExampleCommandFactory from './ExampleCommandFactory';

(async (): Promise<void> => {
    const nodeCli: NodeCLI = new NodeCLI();

    nodeCli.addCommandFactory(new ExampleCommandFactory());

    await nodeCli.execute();
})();
