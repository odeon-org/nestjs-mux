import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';

export interface MuxModuleOptions {
  id: string;
  secret: string;
}

export interface MuxOptionsFactory {
  createMuxOptions(): Promise<MuxModuleOptions> | MuxModuleOptions;
}

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
