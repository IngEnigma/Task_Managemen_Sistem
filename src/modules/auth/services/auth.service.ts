import { Injectable } from '@nestjs/common';
import { RegisterUseCase } from 'src/core/use-case/auth/register.usecase';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { LoginUseCase } from 'src/core/use-case/auth/login.usecase';

@Injectable()
export class AuthService {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  async register(dto: RegisterDto) {
    return this.registerUseCase.execute(dto);
  }

  async login(dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }
}

