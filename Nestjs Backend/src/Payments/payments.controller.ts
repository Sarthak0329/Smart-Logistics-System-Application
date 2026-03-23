import { Controller, Get, Param, ParseIntPipe, Patch, Put } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { paymentModeDTO } from './dto/paymentdto.dto';

@Controller('client')
export class PaymentsController {
    constructor(
        private paymentService : PaymentsService
    ){}
    //here i wiil write the logic for the client to be able to choose the payment method 
    @Get('orders/:orderId/payment-modes')
    async getPaymentModes(@Param('orderId') orderId : string ){
       return this.paymentService.getPaymentOptions(orderId);
    }

    @Patch('orders/:orderId/paymment-mode-selection')
    async choosePaymentMode(@Param('orderId') orderId : string,paymentDto: paymentModeDTO){
         return this.paymentService.selectPaymentOptions(paymentDto,orderId);
    }
}
