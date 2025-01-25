import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigService } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }),
  TypeOrmModule.forRootAsync({
    useClass: DbConfigService,
    inject: [DbConfigService]
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
