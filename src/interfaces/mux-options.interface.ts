import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';

/**
 * Options passed for registering the Mux module.
 */
export interface MuxModuleOptions {
  id: string;
  secret: string;
}

export interface MuxOptionsFactory {
  createMuxOptions(): Promise<MuxModuleOptions> | MuxModuleOptions;
}

/**
 * Options available when registering the module with options passed asynchronously.
 */
export interface MuxModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  id?: string;
  secret?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFactory?: (...args: any[]) => Promise<MuxModuleOptions> | MuxModuleOptions;
  useClass?: Type<MuxOptionsFactory>;
  useExisting?: Type<MuxOptionsFactory>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inject?: any[];
}
