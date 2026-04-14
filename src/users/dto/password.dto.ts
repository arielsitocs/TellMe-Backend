import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
    @IsNotEmpty()
    @IsString()
    currentpassword!: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password!: string;
}