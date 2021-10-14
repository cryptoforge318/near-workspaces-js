import { WorkspaceContainer } from './runtime';
import { Config, WorkspaceFn, InitWorkspaceFn } from './interfaces';
/**
 * The main interface to near-workspaces. Create a new workspace instance with {@link Workspace.init}, then run code using {@link Workspace.clone}.
 *
 * @example
 * // Run multiple routines on testnet simultaneously
 * const workspace = Workspace.init({
 *   network: 'testnet', // Can also set the network using the NEAR_WORKSPACES_NETWORK environment variable
 *   rootAccount: 'me.testnet',
 * });
 * await Promise.all([
 *   workspace.clone(async ({root}) => {
 *     await root.call('some-contract.testnet', 'some_method', { a: 1, b: 2 });
 *   }),
 *   workspace.clone(async ({root}) => {
 *     await root.call('some-other-contract.testnet', 'some_method', { a: 2, b: 3 });
 *   }),
 * ]);
 *
 * @example
 * // Alternative syntax for the above
 * Workspace.open({network: 'testnet', rootAccount: 'me.testnet'}, async ({root}) => {
 *   await Promise.all([
 *     root.call('some-contract.testnet', 'some_method', { a: 1, b: 2 }),
 *     root.call('some-other-contract.testnet', 'some_method', { a: 2, b: 3 }),
 *   ]);
 * });
 *
 * @example
 * const {Workspace, NEAR} from 'near-workspaces';
 * // Test contracts in local sandbox mode, creating initial state for each `workspace.clone`
 * const workspace = Workspace.init(async ({root}) => {
 *   // Create a subaccount of `root`, such as `alice.dev-account-123456.testnet`
 *   const alice = root.createAccount('alice');
 *   // Create a subaccount of `root`, deploy a contract to it, and call a method on that contract
 *   const contract = root.createAndDeploy('contract-account-name', '../path/to/contract.wasm', {
 *     method: 'init',
 *     args: {owner_id: root}
 *   });
 *   // Everything in this Workspace.init function will happen prior to each call of `workspace.clone`
 *   await alice.call(contract, 'some_registration_method', {}, {
 *     attachedDeposit: NEAR.parse('50 milliNEAR')
 *   });
 *   // Accounts returned from `Workspace.init` function will be available in `workspace.clone` calls
 *   return {alice, contract};
 * });
 * workspace.clone(async ({alice, contract, root}) => {
 *   await root.call(contract, 'some_change_method', {account_id: alice});
 *   console.log({
 *     valueForRoot: await contract.view('some_view_method', {account_id: root});
 *     valueForAlice: await contract.view('some_view_method', {account_id: alice});
 *   });
 * });
 * workspace.clone(async ({alice, contract, root}) => {
 *   // This workspace does not call `some_change_method`
 *   console.log({
 *     valueForRoot: await contract.view('some_view_method', {account_id: root});
 *     valueForAlice: await contract.view('some_view_method', {account_id: alice});
 *   });
 * });
 */
export declare class Workspace {
    private container?;
    private readonly ready;
    protected constructor(workspaceContainerPromise: Promise<WorkspaceContainer>);
    /**
     * Initialize a new workspace. In local sandbox mode, this will:
     *
     *   - Create a new local blockchain
     *   - Create the root account for that blockchain, available as `root`:
     *         Workspace.init(async => ({root}) => {...})
     *   - Execute any actions passed to the function
     *   - Shut down the newly created blockchain, but *save the data*
     *
     * In testnet mode, the same functionality is achieved via different means,
     * since all actions must occur on one blockchain instead of N.
     *
     * @param configOrFunction Either a configuration object or a function to run. Accounts returned from this function will be passed as arguments to subsequent `workspace.clone` calls.
     * @param f If configOrFunction is a config object, this must be a function to run
     * @returns an instance of the Workspace class, to be used as a starting point for cloned workspaces.
     */
    static init(configOrFunction?: InitWorkspaceFn | Partial<Config>, f?: InitWorkspaceFn): Workspace;
    static networkIsTestnet(): boolean;
    static networkIsSandbox(): boolean;
    static getNetworkFromEnv(): 'sandbox' | 'testnet';
    startWaiting(container: Promise<WorkspaceContainer>): Promise<void>;
    /**
     * Run code in the context of a workspace initialized with `Workspace.init`.
     * In local sandbox mode, each `workspace.clone` will:
     *
     *   - start a new local blockchain
     *   - copy the state from the blockchain created in `Workspace.init`
     *   - get access to the accounts created in `Workspace.init` using the same variable names
     *   - keep all data isolated from other `workspace.clone` calls, so they can be run concurrently
     *   - shut down at the end, forgetting all new data created
     *
     * In testnet mode, the same functionality is achieved via different means,
     * since all actions must occur on one blockchain instead of N blockchains.
     *
     * @param fn code to run; has access to `root` and other accounts returned from function passed to `Workspace.init`. Example: `workspace.clone(async ({root, alice, bob}) => {...})`
     */
    clone(fn: WorkspaceFn): Promise<WorkspaceContainer>;
    /**
     * Like `clone`, but only runs when in local sandbox mode, not on testnet or mainnet. See `clone` docs for more info.
     *
     * @param fn code to run; has access to `root` and other accounts returned from function passed to `Workspace.init`. Example: `workspace.cloneSandbox(async ({root, alice, bob}) => {...})`
     */
    cloneSandbox(fn: WorkspaceFn): Promise<WorkspaceContainer | null>;
}
//# sourceMappingURL=runner.d.ts.map