import { Body, Controller, Post } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { customerSignInDTO, customerSignUpDTO } from './dto/customersAuth.dto';

@Controller('customers')
export class CustomersController {
    constructor(
        private customerService : CustomersService
    ){}

    @Post('signup')
    async customerSignUp(@Body() customerInfo : customerSignUpDTO){
        return this.customerService.signUp(customerInfo);
    }
    
    @Post('signin')
    async customerSignIn(@Body() customerInfo : customerSignInDTO){
        return this.customerService.login(customerInfo);
    }
}
