import { RegisterUseCase } from './register.usecase';
import { ConflictException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from 'src/core/repositories/users/user.repositories';
import { RegisterDto } from 'src/modules/auth/dtos/register.dto';
import { User } from 'src/core/domain/entities/user.entiti';
import { UserRole } from 'src/core/enums/user-role.enum';

describe('RegisterUseCase', () => {
  let useCase: RegisterUseCase;
  let userRepo: jest.Mocked<IUserRepository>;

  const mockUser: User = new User(
    1,
    'John Doe',
    'john@example.com',
    'hashedpassword',
    UserRole.MEMBER,
    new Date(),
    new Date(),
  );

  beforeEach(() => {
    userRepo = {
      findByEmail: jest.fn(),
      create: jest.fn(),
    } as any;

    useCase = new RegisterUseCase(userRepo);
  });

  it('debería lanzar BadRequestException si faltan email o password', async () => {
    const dto = {
      name: 'John',
      email: '',
      password: '',
      role: UserRole.MEMBER,
    } as RegisterDto;

    await expect(useCase.execute(dto)).rejects.toThrow(BadRequestException);
  });

  it('debería lanzar ConflictException si el email ya está en uso', async () => {
    userRepo.findByEmail.mockResolvedValue(mockUser);

    const dto: RegisterDto = {
      name: 'Jane Doe',
      email: 'john@example.com',
      password: '123456',
      role: UserRole.MEMBER,
    };

    await expect(useCase.execute(dto)).rejects.toThrow(ConflictException);
  });

  it('debería crear un usuario si los datos son válidos', async () => {
    userRepo.findByEmail.mockResolvedValue(null);
    userRepo.create.mockResolvedValue(mockUser);
    jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedpassword');

    const dto: RegisterDto = {
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: '123456',
      role: UserRole.ADMIN,
    };

    const result = await useCase.execute(dto);

    expect(userRepo.findByEmail).toHaveBeenCalledWith(dto.email);
    expect(bcrypt.hash).toHaveBeenCalledWith(dto.password, 10);
    expect(userRepo.create).toHaveBeenCalledWith({
      ...dto,
      password: 'hashedpassword',
    });
    expect(result).toEqual(mockUser);
  });
});
