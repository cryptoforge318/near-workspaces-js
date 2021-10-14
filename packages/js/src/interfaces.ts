import {ClientConfig, KeyStore} from './types';
import {NearAccount} from './account/near-account';

export interface Config extends ClientConfig {
  homeDir: string;
  port: number;
  init: boolean;
  rm: boolean;
  refDir: string | null;
  initFn?: InitWorkspaceFn;
  keyStore?: KeyStore;
}

export interface WorkspaceContainerInterface {
  fork(fn: WorkspaceFn): Promise<void>;
  createRun(fn: InitWorkspaceFn): Promise<ReturnedAccounts>; // What to call this?
}

export interface InitWorkspaceArg {
  workspace: WorkspaceContainerInterface;
  root: NearAccount;
}

export type ReturnedAccounts = Record<string, NearAccount>;

export interface AccountArgs extends ReturnedAccounts {
  root: NearAccount;
}
export type InitWorkspaceFn = (args: InitWorkspaceArg) => Promise<ReturnedAccounts>;
export type WorkspaceFn = (args: AccountArgs, workspace: WorkspaceContainerInterface) => Promise<void>;
