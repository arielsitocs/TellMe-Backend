import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class CommentaryDto {

    @IsString()
    @IsNotEmpty()
    content!: string

    @IsNumber()
    @IsNotEmpty()
    publicationid!: number
}
