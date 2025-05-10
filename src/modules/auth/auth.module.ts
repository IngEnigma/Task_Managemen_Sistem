import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { PrismaService } from 'src/infrastructure/database/prisma.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginUseCase } from 'src/core/use-case/auth/login.usecase';
import { RegisterUseCase } from 'src/core/use-case/auth/register.usecase';
import { ConfigModule } from '@nestjs/config';
import { UserRepository } from 'src/infrastructure/database/repositories/prisma-user.repository';
import { IUserRepository } from 'src/core/repositories/users/user.repositories'; 

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret', 
      signOptions: { expiresIn: '1d' },
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    LoginUseCase,
    RegisterUseCase,
    UserRepository,
    {
      provide: 'IUserRepository',  
      useClass: UserRepository,  
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}

