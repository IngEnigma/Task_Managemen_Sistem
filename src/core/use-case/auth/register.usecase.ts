import { ConflictException, Injectable, BadRequestException } from '@nestjs/common';
import { IUserRepository } from 'src/core/repositories/users/user.repositories';
import { RegisterDto } from 'src/modules/auth/dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/core/domain/entities/user.entiti';
import { UserRepository } from 'src/infrastructure/database/repositories/prisma-user.repository';

@Injectable()
export class RegisterUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async execute(dto: RegisterDto): Promise<User> {
    const { email, password } = dto;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    const userExists = await this.userRepo.findByEmail(email);
    if (userExists) {
      throw new ConflictException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepo.create({
      ...dto,
      password: hashedPassword,
    });

    return user;
  }
}
