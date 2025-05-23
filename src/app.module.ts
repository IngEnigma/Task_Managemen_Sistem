import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaService } from './infrastructure/database/prisma.service';
import { ConfigModule } from '@nestjs/config'; 

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),  
    AuthModule, 
  ], 
  controllers: [AppController],
  providers: [AppService, PrismaService], 
})
export class AppModule {}
