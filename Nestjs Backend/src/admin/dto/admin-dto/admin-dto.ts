import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class AdminDto {
    @IsString()
    @IsNotEmpty()
    name : string;
    
    @IsEmail()
    @IsNotEmpty()
    email : string;
    
    @IsString()
    @MinLength(8)
    password : string;
    

    @IsString()
    phone_number : string;
}
