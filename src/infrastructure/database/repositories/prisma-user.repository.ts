import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; 
import { IUserRepository } from 'src/core/repositories/users/user.repositories';
import { User } from 'src/core/domain/entities/user.entiti';
import { RegisterDto } from 'src/modules/auth/dtos/register.dto';
import { UserRole } from 'src/core/enums/user-role.enum';
import { fromPrismaUserRole, toPrismaUserRole } from 'src/core/adapters/prisma-emun-mapper/user-role.mapper';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: RegisterDto): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: toPrismaUserRole(data.role ?? UserRole.MEMBER),
      },
    });

    return new User(
      createdUser.id,
      createdUser.name,
      createdUser.email,
      createdUser.password,
      fromPrismaUserRole(createdUser.role),
      createdUser.createdAt,
      createdUser.updatedAt,
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return new User(
      user.id,
      user.name,
      user.email,
      user.password,
      fromPrismaUserRole(user.role),
      user.createdAt,
      user.updatedAt,
    );
  }
}
