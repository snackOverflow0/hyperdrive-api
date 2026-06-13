import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TripsModule } from './trips/trips.module';
import { StorageModule } from './storage/storage.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
  ConfigModule.forRoot({ isGlobal: true }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'),
    serveRoot: '/uploads'
  }),

  PrismaModule,
  AuthModule,
  TripsModule,
  StorageModule
  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
