import { IsString, IsNumber, IsNotEmpty, IsOptional } from "class-validator";

export class PublicationDto {
    @IsNotEmpty()
    @IsString()
    content!: string

    @IsOptional()
    @IsString()
    imageurl?: string

    @IsOptional()
    @IsNumber()
    likes?: number

    @IsNotEmpty()
    @IsNumber()
    userid!: number
}
