import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paymentMode } from 'src/enum';
import { Order } from 'src/order/order.entity';
import { Repository } from 'typeorm';
import { paymentModeDTO } from './dto/paymentdto.dto';
import { Payment } from './payment.entity';

@Injectable()
export class PaymentsService {
   
    constructor(
        @InjectRepository(Order)
        private orderRepo : Repository<Order>,
        @InjectRepository(Payment)
        private paymentRepo : Repository<Payment>
    ){}
    // this is the logic to get the all the available payment options for the customer to choose from
    async getPaymentOptions(orderId : string){
        const order = await this.orderRepo.findOne({
            where: {id : orderId}
        });

        
     if (!order) {
        throw new NotFoundException('Order not found');
  }

    const methods: paymentMode[] = [];

    const amount = Number(order.totalAmount);

    methods.push(paymentMode.UPI);//UPI is always available 

    methods.push(paymentMode.CARD);//CARD is also always available 

    if (amount <= 50000) {
        methods.push(paymentMode.COD);
    }

     return methods;
  }

  async selectPaymentOptions(paymentModes : paymentModeDTO, orderId : string){
    const paymentOption = await this.paymentRepo.findOne({
            where: {order_id : orderId}
        });

        if (!Object.values(paymentMode).includes(paymentModes.paymentMode)) {
             throw new BadRequestException('Invalid payment method');
            }
        if(!paymentOption)
            throw new NotFoundException('Target order not found');
        
        paymentOption.payment_method = paymentModes.paymentMode;

        return await this.paymentRepo.save(paymentOption);
  }
}
