import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      // Encuentra un usuuario donde el email coincida con el email recibido //
      where: { email: loginDto.email },
    });

    // Si no encuentra, lanza una excepcion //
    if (!user) {
      throw new UnauthorizedException('Credenciales invalidas.');
    }

    // Compara las contrasenas hasheadas recibidas //
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);

    // Si no son iguales, lanza una excepcion //
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales invalidas.');
    }

    // Se crea el payload el cual se usara para firmar el token //
    const payload = {
      sub: user.userid,
      email: user.email,
      username: user.username,
    };

    // Se crea el token //
    const token = await this.jwtService.signAsync(payload);

    // Se devuelven el token junto con los datos del usuario necesarios //
    return {
      token,
      user: {
        userid: user.userid,
        email: user.email,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        description: user.description,
        color: user.color,
        posts: user.posts,
        followers: user.followers,
        following: user.following,
      },
    };
  }
}