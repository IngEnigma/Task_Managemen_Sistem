import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from 'src/core/enums/user-role.enum';

export class RegisterDto {
  @ApiProperty({ 
    description: 'El nombre del usuario', 
    example: 'John Doe' 
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    description: 'El correo electrónico del usuario', 
    example: 'john.doe@example.com' 
  })
  @IsEmail()
  email: string;

  @ApiProperty({ 
    description: 'La contraseña del usuario (mínimo 6 caracteres)', 
    example: 'password123' 
  })
  @MinLength(6)
  password: string;

  @ApiProperty({ 
    description: 'El rol del usuario (por defecto MEMBER si no se especifica)', 
    enum: UserRole, 
    example: UserRole.MEMBER 
  })
  @IsEnum(UserRole)
  role: UserRole;
}
