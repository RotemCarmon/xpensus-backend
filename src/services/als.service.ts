import { AsyncLocalStorage } from 'node:async_hooks';
export const asyncLocalStorage = new AsyncLocalStorage<Store>();

export interface Store {
  traceID?: string;
}
