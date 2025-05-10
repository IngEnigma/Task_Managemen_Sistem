import { UserRole } from "src/core/enums/user-role.enum";

export class User {
  constructor(
    public id: number,
    public name: string | null,
    public email: string,
    public password: string,
    public role: UserRole,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
