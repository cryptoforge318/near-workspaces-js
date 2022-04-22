import { ClientConfig } from '../types';
import { NearAccount, NearAccountManager } from '../account';
import { Config } from '../interfaces';
import { JsonRpcProvider } from '../jsonrpc';
export declare abstract class Worker {
    config: Config;
    protected manager: NearAccountManager;
    constructor(config: Config);
    static init(config?: Partial<Config>): Promise<Worker>;
    get rootAccount(): NearAccount;
    abstract tearDown(): Promise<void>;
}
export declare class TestnetWorker extends Worker {
    static init(config: Partial<Config>): Promise<TestnetWorker>;
    tearDown(): Promise<void>;
    static get defaultConfig(): Config;
    static get clientConfig(): ClientConfig;
}
export declare class SandboxWorker extends Worker {
    private server;
    static init(config: Partial<Config>): Promise<SandboxWorker>;
    tearDown(): Promise<void>;
    static defaultConfig(): Promise<Config>;
    static get clientConfig(): ClientConfig;
    get provider(): JsonRpcProvider;
    get rpcAddr(): string;
}
//# sourceMappingURL=runtime.d.ts.map