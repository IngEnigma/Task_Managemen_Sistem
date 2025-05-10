import { TaskStatus as PrismaTaskStatus } from 'generated/prisma'; 
import { TaskStatus } from 'src/core/enums/tesk-status.enum';

const fromPrismaTaskStatusMap: Record<PrismaTaskStatus, TaskStatus> = {
  COMPLETED: TaskStatus.COMPLETED,
  PENDING: TaskStatus.PENDING,
  IN_PROGRESS: TaskStatus.IN_PROGRESS,
  BLOCKED: TaskStatus.BLOCKED,
};

const toPrismaTaskStatusMap: Record<TaskStatus, PrismaTaskStatus> = {
  [TaskStatus.COMPLETED]: 'COMPLETED',
  [TaskStatus.PENDING]: 'PENDING',
  [TaskStatus.IN_PROGRESS]: 'IN_PROGRESS',
  [TaskStatus.BLOCKED]: 'BLOCKED',
};

export const fromPrismaTaskStatus = (status: PrismaTaskStatus): TaskStatus =>
  fromPrismaTaskStatusMap[status];

export const toPrismaTaskStatus = (status: TaskStatus): PrismaTaskStatus =>
  toPrismaTaskStatusMap[status];
