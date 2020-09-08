import { Command, flags } from '@oclif/command';
import { BootstrapUtils, ConfigService, RunService } from '../service';

export default class Run extends Command {
    static description = `It boots the network via docker using the generated docker-compose.yml file and configuration. The config and compose methods/commands need to be called before this method. This is just a wrapper for docker-compose up bash call`;

    static examples = [`$ symbol-bootstrap run`];

    static flags = {
        help: flags.help({ char: 'h', description: 'It shows the help of this command.' }),
        target: flags.string({
            char: 't',
            description: 'the target folder',
            default: ConfigService.defaultParams.target,
        }),
        daemon: flags.boolean({
            char: 'd',
            description:
                'If provided, docker-compose will run with -d (--detached) and this command will wait unit server is running before returning',
        }),
        service: flags.string({
            char: 's',
            description: 'If you are starting a particular service, example rest-gateway, db, node-peer-0',
        }),

        build: flags.boolean({
            char: 'b',
            description: 'If provided, docker-compose will run with -b (--build)',
        }),
        timeout: flags.integer({
            char: 't',
            description: 'If running in daemon mode, how long before timing out (in MS)',
            default: RunService.defaultParams.timeout,
        }),
    };

    public run(): Promise<void> {
        const { flags } = this.parse(Run);
        BootstrapUtils.showBanner();
        return new RunService(flags).run();
    }
}
