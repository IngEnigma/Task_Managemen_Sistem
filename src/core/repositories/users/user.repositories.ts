import { User } from 'src/core/domain/entities/user.entiti';
import { RegisterDto } from 'src/modules/auth/dtos/register.dto';

export interface IUserRepository {
  create(user: RegisterDto): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
}
