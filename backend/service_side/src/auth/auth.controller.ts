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
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signIn(@Body() loginDto: LoginDto, @Res() res) {
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
