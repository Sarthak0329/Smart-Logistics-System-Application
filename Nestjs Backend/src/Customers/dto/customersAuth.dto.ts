import { IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class customerSignUpDTO{

    @IsString()
    @IsNotEmpty()
    name : string;

    @IsString()
    @IsNotEmpty()
    email : string;

    @IsStrongPassword()
    @IsNotEmpty()
    password : string
 
}

export class customerSignInDTO{

    @IsString()
    @IsNotEmpty()
    email : string;

    @IsString()
    @IsNotEmpty()
    password : string

}

export class customerAddress{

    @IsString()
    address : string;

    @IsString()
    city : string;
    
    @IsString()
    state : string;

    @IsString()
    pincode : string;
}