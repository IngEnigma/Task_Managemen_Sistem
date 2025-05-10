import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { RegisterDto } from '../dtos/register.dto';
import { RegisterUseCase } from 'src/core/use-case/auth/register.usecase';
import { LoginUseCase } from 'src/core/use-case/auth/login.usecase';
import { UserRole } from 'src/core/enums/user-role.enum';
import { User } from 'src/core/domain/entities/user.entiti';

describe('AuthService', () => {
  let service: AuthService;
  let registerUseCase: RegisterUseCase;
  let loginUseCase: LoginUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: RegisterUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: LoginUseCase,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    registerUseCase = module.get<RegisterUseCase>(RegisterUseCase);
    loginUseCase = module.get<LoginUseCase>(LoginUseCase);
  });

  it('should register a user', async () => {
    const registerDto: RegisterDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: UserRole.MEMBER,
    };

    const expectedUser: User = {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedPassword123',
      role: UserRole.MEMBER,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    (registerUseCase.execute as jest.Mock).mockResolvedValue(expectedUser);

    const result = await service.register(registerDto);

    expect(result).toEqual(expectedUser); 
  });

  it('should login a user and return access token', async () => {
    const loginDto = {
      email: 'test@example.com',
      password: 'password123',
    };

    const expectedResult = {
      accessToken: 'jwt-token',
    };

    (loginUseCase.execute as jest.Mock).mockResolvedValue(expectedResult);

    const result = await service.login(loginDto);

    expect(result).toEqual(expectedResult); 
  });
});
