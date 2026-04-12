import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt';
import { PrismaService } from 'src/prisma.service';

const jwtSecret = process.env.JWT_SECRET ?? 'dev-only-jwt-secret';

@Module({
  imports: [
    // Habilita que el modulo de JWT se pueda usar en el auth.service para el login //
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '1d' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy],
})
export class AuthModule {}
