import * as Mux from '@mux/mux-node';
import { Inject } from '@nestjs/common';
import { MUX_TOKEN } from './mux.constants';

/**
 * Inject the Mux client object
 */
export const InjectMux = (): Mux => Inject(MUX_TOKEN);
