import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    // Aqui se valida el token con el secreto JWT y decuelve el payload si es valido //
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'ultrasecretjsonwebtokenifotherisnotavaliable',
    });
  }
  
  async validate(payload: any) {
    return payload;
  }
}