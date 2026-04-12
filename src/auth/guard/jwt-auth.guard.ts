import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// ARCHIVO QUE SE EJECUTA CADA VEZ QUE LLEGA A UNA PETICION PROTEGIDA //
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}