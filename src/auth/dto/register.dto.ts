import { IsEmail, IsNotEmpty, IsString, IsEnum, MinLength } from 'class-validator';
import { SystemRole } from '@prisma/client';

export class RegisterDto {
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email!: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;

  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstName!: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName!: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone number is required for ride coordination' })
  phone!: string;

  @IsEnum(SystemRole, { message: 'Role must be either CLIENT or DRIVER' })
  role!: SystemRole;
}