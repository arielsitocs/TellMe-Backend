import { IsEmail, IsNotEmpty, IsString, IsNumber, IsUrl, IsOptional } from "class-validator";

export class UserDto {
    @IsEmail()
    @IsNotEmpty()
    email!: string

    @IsString()
    @IsNotEmpty()
    firstname!: string

    @IsString()
    @IsNotEmpty()
    lastname!: string

    @IsString()
    @IsNotEmpty()
    username!: string

    @IsString()
    @IsNotEmpty()
    description!: string

    @IsOptional()
    @IsUrl()
    imageurl!: string

    @IsOptional()
    @IsString()
    color!: string

    @IsString()
    @IsNotEmpty()
    password!: string
}
