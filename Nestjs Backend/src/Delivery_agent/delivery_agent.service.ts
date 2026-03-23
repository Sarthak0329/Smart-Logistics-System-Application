import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsService } from 'src/notifications/notifications.service';
import { Order } from 'src/order/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DeliveryAgentService {
       /* > view the assigned deliveries 
       > accept/reject the job
       > mark as pickedup
    */
 constructor(
        @InjectRepository(Order)
        private orderRepo : Repository<Order>,
        private notificationService : NotificationsService
    ){}

 async generateOTP(orderId : string){
          const order = await this.orderRepo.findOne({
        where: { id: orderId }
    });

    if (!order)
        throw new NotFoundException('Order not found');

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10);

    order.delivery_otp = otp;//order is updated with the otp
    order.otp_expires_at = expiry;

    await this.orderRepo.save(order);

    this.notificationService.sendDeliveryOtp(order.customer_id,Number(otp));//send the notification to the user !!

    return {
        message: 'Delivery OTP generated',
        otp: otp   // for testing
    };
  }

 async validateOTP(orderId : string,otp:string){
    const order = await this.orderRepo.findOne({
    where: { id: orderId }
    });

  if (!order)
    throw new NotFoundException('Order not found');

  if (!order.delivery_otp)
    throw new BadRequestException('OTP not generated');

  if (order.otp_expires_at < new Date())
    throw new BadRequestException('OTP expired');

  if (order.delivery_otp !== otp)
    throw new BadRequestException('Invalid OTP');

  order.delivery_otp = 'null';

  await this.orderRepo.save(order);

  return {
    message: 'Order delivered successfully'
  };
 } 
 
}
