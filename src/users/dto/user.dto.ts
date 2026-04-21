import { IsEmail, IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

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
    @IsString()
    imageurl!: string

    @IsOptional()
    @IsString()
    color!: string

    @IsOptional()
    @IsNumber()
    posts!: number

    @IsOptional()
    @IsNumber()
    following!: number

    @IsOptional()
    @IsNumber()
    followers!: number

    @IsString()
    @IsOptional()
    password!: string
}
