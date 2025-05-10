import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUseCase } from './login.usecase';
import { IUserRepository } from 'src/core/repositories/users/user.repositories';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let mockUserRepo: Partial<IUserRepository>;
  let mockJwtService: Partial<JwtService>;

  let mockUser: { id: string; email: string; password: string };

  beforeEach(async () => {
    mockUser = {
      id: '123',
      email: 'test@example.com',
      password: await bcrypt.hash('password123', 10),
    };
  });

  beforeEach(() => {
    mockUserRepo = {
      findByEmail: jest.fn().mockResolvedValue(mockUser),
    };

    mockJwtService = {
      sign: jest.fn().mockReturnValue('fake-jwt-token'),
    };

    loginUseCase = new LoginUseCase(
      mockUserRepo as IUserRepository,
      mockJwtService as JwtService,
    );
  });

  it('debería loguear exitosamente y devolver accessToken', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);

    const result = await loginUseCase.execute({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(result).toEqual({ accessToken: 'fake-jwt-token' });
    expect(mockUserRepo.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(mockJwtService.sign).toHaveBeenCalledWith({
      sub: '123',
      email: 'test@example.com',
    });
  });

  it('debería lanzar UnauthorizedException si falta email o password', async () => {
    await expect(
      loginUseCase.execute({ email: '', password: '' }),
    ).rejects.toThrow(UnauthorizedException);

    await expect(
      loginUseCase.execute({ email: 'only@email.com', password: '' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('debería lanzar UnauthorizedException si no encuentra al usuario', async () => {
    jest.spyOn(mockUserRepo, 'findByEmail').mockResolvedValue(null);

    await expect(
      loginUseCase.execute({ email: 'no@existe.com', password: 'pass' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('debería lanzar UnauthorizedException si la contraseña es incorrecta', async () => {
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

    await expect(
      loginUseCase.execute({ email: 'test@example.com', password: 'wrong' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
