import { UserRole as PrismaUserRole } from 'generated/prisma'; 
import { UserRole } from '../../enums/user-role.enum';

const fromPrismaUserRoleMap: Record<PrismaUserRole, UserRole> = {
  ADMIN: UserRole.ADMIN,
  MEMBER: UserRole.MEMBER,
};

const toPrismaUserRoleMap: Record<UserRole, PrismaUserRole> = {
  [UserRole.ADMIN]: 'ADMIN',
  [UserRole.MEMBER]: 'MEMBER',
};

export const fromPrismaUserRole = (role: PrismaUserRole): UserRole =>
  fromPrismaUserRoleMap[role];

export const toPrismaUserRole = (role: UserRole): PrismaUserRole =>
  toPrismaUserRoleMap[role];
