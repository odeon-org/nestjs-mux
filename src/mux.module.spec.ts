/* eslint max-classes-per-file: off, class-methods-use-this: off */
import { Module } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as Mux from '@mux/mux-node';
import { MUX_TOKEN } from './mux.constants';
import { MuxModuleOptions, MuxOptionsFactory } from './interfaces';
import { MuxModule } from './mux.module';

describe('MuxModule', () => {
  describe('forRoot', () => {
    it('should provide the mux client', async () => {
      const module = await Test.createTestingModule({
        imports: [
          MuxModule.forRoot({
            id: 'idToken',
            secret: 'secretToken',
          }),
        ],
      }).compile();

      const muxClient = module.get(MUX_TOKEN);
      expect(muxClient).toBeInstanceOf(Mux);
    });
  });

  describe('forRootAsync', () => {
    class ConfigService implements MuxOptionsFactory {
      createMuxOptions(): Promise<MuxModuleOptions> | MuxModuleOptions {
        return {
          id: 'idToken',
          secret: 'secretToken',
        };
      }
    }

    describe('when the `useFactory` option is used', () => {
      it('should provide the mux client', async () => {
        const module = await Test.createTestingModule({
          imports: [
            MuxModule.forRootAsync({
              useFactory: () => ({
                id: 'idToken',
                secret: 'secretToken',
              }),
            }),
          ],
        }).compile();

        const muxClient = module.get(MUX_TOKEN);
        expect(muxClient).toBeInstanceOf(Mux);
      });
    });

    describe('when the `useExisting` option is used', () => {
      it('should provide the mux client', async () => {
        @Module({ providers: [ConfigService], exports: [ConfigService] })
        class ConfigModule {}

        const module = await Test.createTestingModule({
          imports: [
            MuxModule.forRootAsync({
              imports: [ConfigModule],
              useExisting: ConfigService,
            }),
          ],
        }).compile();

        const muxClient = module.get(MUX_TOKEN);
        expect(muxClient).toBeInstanceOf(Mux);
      });
    });

    describe('when the `useClass` option is used', () => {
      it('should provide the mux client', async () => {
        const module = await Test.createTestingModule({
          imports: [
            MuxModule.forRootAsync({
              useClass: ConfigService,
            }),
          ],
        }).compile();

        const muxClient = module.get(MUX_TOKEN);
        expect(muxClient).toBeInstanceOf(Mux);
      });
    });
  });
});
