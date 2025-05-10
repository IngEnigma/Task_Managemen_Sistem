import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './prisma-user.repository'; 
import { PrismaService } from '../prisma.service';
import { RegisterDto } from 'src/modules/auth/dtos/register.dto';
import { UserRole } from 'src/core/enums/user-role.enum';
import { User } from 'src/core/domain/entities/user.entiti';

const mockPrismaService = {
  user: {
    create: jest.fn(),
    findUnique: jest.fn(),
  },
};

describe('UserRepository', () => {
  let repository: UserRepository;
  let prisma: PrismaService & typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
    prisma = module.get<PrismaService>(PrismaService) as PrismaService & typeof mockPrismaService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user and return User entity', async () => {
      const dto: RegisterDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword',
        role: UserRole.ADMIN,
      };

      const fakeUser = {
        id: '1',
        name: dto.name,
        email: dto.email,
        password: dto.password,
        role: 'ADMIN',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.user.create.mockResolvedValue(fakeUser);

      const result = await repository.create(dto);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          name: dto.name,
          email: dto.email,
          password: dto.password,
          role: 'ADMIN',
        },
      });

      expect(result).toBeInstanceOf(User);
      expect(result.name).toBe(dto.name);
    });
  });

  describe('findByEmail', () => {
    it('should return a User when user exists', async () => {
      const email = 'test@example.com';
      const fakeUser = {
        id: '1',
        name: 'Test User',
        email,
        password: 'hashedPassword',
        role: 'MEMBER',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      prisma.user.findUnique.mockResolvedValue(fakeUser);

      const result = await repository.findByEmail(email);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
      expect(result).toBeInstanceOf(User);
      expect(result?.email).toBe(email);
    });

    it('should return null if user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const result = await repository.findByEmail('notfound@example.com');

      expect(result).toBeNull();
    });
  });
});
