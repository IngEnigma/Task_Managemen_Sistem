import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class LoginDto {
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
}
