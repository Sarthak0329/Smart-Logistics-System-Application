import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientSignupDto } from './dto/client-dto.dto/client-dto.dto';
import { jwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('client')
export class ClientController {
    constructor(private clientService : ClientService){}

    @Post('signin')
    async signin(@Body() signInInfo : ClientSignupDto){
        return this.clientService.ClientSignUp(signInInfo);
    }
    
    @UseGuards(jwtAuthGuard)
    @Post('login')
    async login(@Body() loginInfo : ClientSignupDto){
        return this.clientService.ClientLogin(loginInfo);
    }
}
