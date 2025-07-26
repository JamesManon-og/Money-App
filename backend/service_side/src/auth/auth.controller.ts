import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthGuard } from './guards/jwt-auth.guard';
import { Public } from './decorators/public.decorator';
import { UserLoginDto } from './dto/user-login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signIn(@Body() loginDto: UserLoginDto, @Res() res) {
    const { access_token } = await this.authService.loginUser(loginDto);

    if (!access_token) {
      return res.status(HttpStatus.UNAUTHORIZED).send({
        message: 'Invalid credentials',
      });
    }

    res.cookie('token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    return res.send({ message: 'Login successful', auth_token: access_token });
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() registerDto: RegisterDto, @Res() res) {
    const { access_token } = await this.authService.register(registerDto);

    if (!access_token) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: 'Registration failed',
      });
    }

    res.cookie('token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      path: '/',
    });

    return res.send({
      message: 'Registration successful',
      auth_token: access_token,
    });
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async signOut(@Res() res) {
    res.clearCookie('token');
    return res.send({ message: 'Logout successful' });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
