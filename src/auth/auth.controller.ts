import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto)
  }

  @Get('profile-test')
  @UseGuards(AuthGuard('jwt'))
  getProfileTest(@Request() req: any) {
    return {
      message: 'Access granted! Your token passport is completely valid.',
      authenticatedUser: req.user, // Displays the payload details attached by our strategy
    };
  }
}
