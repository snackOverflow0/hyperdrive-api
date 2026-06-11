import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Please provide a valid email structure' })
  email!: string;

  @IsString()
  @IsNotEmpty({ message: 'Password field cannot be empty' })
  @MinLength(6, { message: 'Password must match your registered 6+ character credential' })
  password!: string;
}