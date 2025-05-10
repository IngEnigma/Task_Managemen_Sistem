import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUseCase } from 'src/core/use-case/auth/register.usecase'; 
import { LoginUseCase } from 'src/core/use-case/auth/login.usecase';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUseCase,
    private readonly loginUserUseCase: LoginUseCase,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.registerUserUseCase.execute(registerDto);
    return user;
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async login(@Body() loginDto: LoginDto) {
    const token = await this.loginUserUseCase.execute(loginDto);
    return token;
  }
}