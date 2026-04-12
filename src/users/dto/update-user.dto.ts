import { OmitType, PartialType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class UpdateUserDto extends PartialType(
  // Se omite password para evitar cambios de clave desde este endpoint //
  OmitType(UserDto, ['password'] as const),
) {}