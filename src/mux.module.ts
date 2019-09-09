import { DynamicModule, Module } from '@nestjs/common';
import { MuxModuleAsyncOptions, MuxModuleOptions } from './interfaces';
import MuxCoreModule from './mux-core.module';

/**
 * Module for the MUX API client.
 */
@Module({})
export class MuxModule {
  /**
   * Register the Mux module with options passed synchronously.
   * @param options object containing the id and secret tokens for connecting to Mux.
   */
  static forRoot(options: MuxModuleOptions): DynamicModule {
    return {
      module: MuxModule,
      imports: [MuxCoreModule.forRoot(options)],
    };
  }

  /**
   * Register the Mux module with options passed asynchronously.
   * @param options object containing the id and secret tokens for connecting to Mux.
   */
  static forRootAsync(options: MuxModuleAsyncOptions): DynamicModule {
    return {
      module: MuxModule,
      imports: [MuxCoreModule.forRootAsync(options)],
    };
  }
}
