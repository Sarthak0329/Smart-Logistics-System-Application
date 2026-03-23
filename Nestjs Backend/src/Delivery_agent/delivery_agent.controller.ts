import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DeliveryAgentService } from './delivery_agent.service';
import { jwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Roles } from 'src/enum';
import { Role } from 'src/auth/decorators/roles.decorator';

@Controller('delivery-agent')
export class DeliveryAgentController {
    constructor(
       private deliveryAgentService : DeliveryAgentService
    ){}
    
    @UseGuards(jwtAuthGuard)//when the delivery agent reaches the destination,he triggers an event and the otp will be generated
    @Role(Roles.DELIVERY_AGENT)
    @Get(':orderId/generateOTP')
    async generateOTP(@Param('orderId') orderId : string){
        //trigger a function that the sends the otp to the customer as a push notification(will be using onesignal for that)
        return this.deliveryAgentService.generateOTP(orderId);
        
    }
    
    @UseGuards(jwtAuthGuard)
    @Role(Roles.DELIVERY_AGENT)
    @Get(':orderId/validateOTP')
    async validateOTP(@Param('orderId') orderId : string,@Body('otp') otp : string){
        return this.deliveryAgentService.validateOTP(orderId,otp);
    }
    

}
