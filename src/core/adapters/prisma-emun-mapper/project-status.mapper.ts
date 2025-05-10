import { ProjectStatus as PrismaProjectStatus } from 'generated/prisma'; 
import { ProjectStatus } from '../../enums/project-status.enum';

const fromPrismaProjectStatusMap: Record<PrismaProjectStatus, ProjectStatus> = {
  ACTIVE: ProjectStatus.ACTIVE,
  PAUSED: ProjectStatus.PAUSED,
  COMPLETED: ProjectStatus.COMPLETED,
};

const toPrismaProjectStatusMap: Record<ProjectStatus, PrismaProjectStatus> = {
  [ProjectStatus.ACTIVE]: 'ACTIVE',
  [ProjectStatus.PAUSED]: 'PAUSED',
  [ProjectStatus.COMPLETED]: 'COMPLETED',
};

export const fromPrismaProjectStatus = (status: PrismaProjectStatus): ProjectStatus =>
  fromPrismaProjectStatusMap[status];

export const toPrismaProjectStatus = (status: ProjectStatus): PrismaProjectStatus =>
  toPrismaProjectStatusMap[status];
