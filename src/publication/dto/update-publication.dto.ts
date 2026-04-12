import { OmitType, PartialType } from '@nestjs/mapped-types';
import { PublicationDto } from './publication.dto';

export class UpdatePublicationDto extends PartialType(
    // Se omite el user id para los updates, evita cambios de datos no permitidos //
	OmitType(PublicationDto, ['userid'] as const),
) {}