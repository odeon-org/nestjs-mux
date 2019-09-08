# nestjs-mux

[Mux](https://mux.com) module that provides standardized setup and dependency injection in a [Nest](https://nestjs.com) project for the [Mux API client](https://github.com/muxinc/mux-node-sdk).

## Installation

### Yarn

```bash
yarn add nestjs-mux
```

### npm

```bash
npm install nestjs-mux --save
```

## Getting Started

### Configuration

Import and configure `MuxModule` with [Mux's access and secret tokens](https://dashboard.mux.com/settings/access-tokens) into the root module `AppModule`.

```typescript
import { Module } from '@nestjs/common';
import { MuxModule } from 'nestjs-mux';

@Module({
  imports: [
    MuxModule.forRoot({
      id: idToken,
      secret: secretToken,
    }),
  ],
})
export default class AppModule {}
```

#### Asynchronous

If you need to load the configuration options asynchronously you can use the following options:

##### Use Factory Function

```typescript
import { Module } from '@nestjs/common';
import { MuxModule } from 'nestjs-mux';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

@Module({
  imports: [
    MuxModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        id: configService.getString('MUX_ID_TOKEN'),
        secret: configService.getString('MUX_SECRET_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
```

##### Use Class

```typescript
import { Module } from '@nestjs/common';
import { MuxModule } from 'nestjs-mux';
import { MuxConfigService } from './config/mux.config.service';

@Module({
  imports: [
    MuxModule.forRootAsync({
      useClass: MuxConfigService,
    }),
  ],
})
export class AppModule {}
```

##### Use Existing

```typescript
import { Module } from '@nestjs/common';
import { MuxModule } from 'nestjs-mux';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/mux.config.service';

@Module({
  imports: [
    MuxModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: ConfigService,
    }),
  ],
})
export class AppModule {}
```

## Usage

You can then inject the Mux client into constructors with its decorator.

```typescript
import * as Mux from '@mux/mux-node';
import { Injectable } from '@nestjs/common';
import { InjectMux } from 'nestjs-mux';

@Injectable()
export default class AppService {
  public constructor(@InjectMux() private readonly muxClient: Mux) {}
}
```
