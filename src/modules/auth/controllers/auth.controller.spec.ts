import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { RegisterUseCase } from 'src/core/use-case/auth/register.usecase';
import { LoginUseCase } from 'src/core/use-case/auth/login.usecase';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { UserRole } from 'src/core/enums/user-role.enum';

describe('AuthController', () => {
  let controller: AuthController;
  let registerUseCase: RegisterUseCase;
  let loginUseCase: LoginUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: RegisterUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
        {
          provide: LoginUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    registerUseCase = module.get<RegisterUseCase>(RegisterUseCase);
    loginUseCase = module.get<LoginUseCase>(LoginUseCase);
  });

  describe('register', () => {
    it('should call RegisterUseCase with correct data and return the user', async () => {
      const dto: RegisterDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'secret123',
        role: UserRole.MEMBER,
      };

      const expectedUser = {
        id: 'user-id-123',
        ...dto,
        password: 'hashed_password',
      };

      jest.spyOn(registerUseCase, 'execute').mockResolvedValue(expectedUser as any);

      const result = await controller.register(dto);
      expect(registerUseCase.execute).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedUser);
    });
  });

  describe('login', () => {
    it('should call LoginUseCase with correct data and return the token', async () => {
      const dto: LoginDto = {
        email: 'john@example.com',
        password: 'secret123',
      };

      const expectedToken = { accessToken: 'jwt-token' };

      jest.spyOn(loginUseCase, 'execute').mockResolvedValue(expectedToken);

      const result = await controller.login(dto);
      expect(loginUseCase.execute).toHaveBeenCalledWith(dto);
      expect(result).toEqual(expectedToken);
    });
  });
});
