import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
    async sendDeliveryOtp(customerId : number,otp : number){
        //I will be integrating the OneSignal API call logic here 
        console.log(`Dear Customer,this is your ${otp}`);
    }
}
