import { DynamicModule, Module } from '@nestjs/common';
import { MuxModuleAsyncOptions, MuxModuleOptions } from './interfaces';
import MuxCoreModule from './mux-core.module';

@Module({})
export default class MuxModule {
  static forRoot(options: MuxModuleOptions): DynamicModule {
    return {
      module: MuxModule,
      imports: [MuxCoreModule.forRoot(options)],
    };
  }

  static forRootAsync(options: MuxModuleAsyncOptions): DynamicModule {
    return {
      module: MuxModule,
      imports: [MuxCoreModule.forRootAsync(options)],
    };
  }
}
