import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/user-login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUser(userLoginDto: UserLoginDto) {
    const { password, email } = userLoginDto;
    let user;

    try {
      user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        email,
        sub: user.id,
        name: user.name,
      };
      const token = this.jwtService.sign(payload);

      return {
        access_token: token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      };
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      console.error('Unexpected Error during login:', error);
      throw new HttpException(
        'Internal server error during login',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async register(registerDto: RegisterDto) {
    try {
      // Check if user already exists
      const existingUser = await this.prismaService.user.findUnique({
        where: { email: registerDto.email },
      });

      if (existingUser) {
        throw new HttpException('Email already exists', HttpStatus.CONFLICT);
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(registerDto.password, 10);

      const createdUser = await this.prismaService.user.create({
        data: {
          name: registerDto.name,
          email: registerDto.email,
          password: hashedPassword,
        },
      });

      const payload = {
        email: createdUser.email,
        sub: createdUser.id,
        name: createdUser.name,
      };
      const token = this.jwtService.sign(payload);

      return {
        access_token: token,
        user: {
          id: createdUser.id,
          name: createdUser.name,
          email: createdUser.email,
        },
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Unexpected Error during registration:', error);
      throw new HttpException(
        'Internal server error during registration',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
