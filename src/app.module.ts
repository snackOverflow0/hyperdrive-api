import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TripsModule } from './trips/trips.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [

  ConfigModule.forRoot({ isGlobal: true }),
  PrismaModule,
  AuthModule,
  TripsModule,
  StorageModule

  ],
  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
