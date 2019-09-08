import * as Mux from '@mux/mux-node';
import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import {
  MuxModuleAsyncOptions,
  MuxModuleOptions,
  MuxOptionsFactory,
} from './mux-options.interface';
import { MUX_MODULE_OPTIONS, MUX_TOKEN } from './mux.constant';

@Global()
@Module({})
export default class MuxCoreModule {
  static forRoot(options: MuxModuleOptions): DynamicModule {
    const { id, secret } = options;

    const clientProvider = {
      provide: MUX_TOKEN,
      useValue: new Mux(id, secret),
    };

    return {
      module: MuxCoreModule,
      providers: [clientProvider],
      exports: [clientProvider],
    };
  }

  static forRootAsync(options: MuxModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);

    const muxProvider: Provider = {
      inject: [MUX_MODULE_OPTIONS],
      provide: MUX_TOKEN,
      useFactory: (muxOptions: MuxModuleOptions) => {
        const { id, secret } = muxOptions;
        return new Mux(id, secret);
      },
    };

    return {
      module: MuxCoreModule,
      imports: options.imports,
      providers: [...asyncProviders, muxProvider],
      exports: [...asyncProviders],
    };
  }

  private static createAsyncProviders(options: MuxModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    const useClass = options.useClass as Type<MuxOptionsFactory>;
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: MuxModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: MUX_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    const inject = [options.useClass || options.useExisting];
    return {
      provide: MUX_MODULE_OPTIONS,
      useFactory: async (optionsFactory: MuxOptionsFactory): Mux => {
        return optionsFactory.createMuxOptions();
      },
      inject,
    };
  }
}
