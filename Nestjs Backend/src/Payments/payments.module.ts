import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { Order } from 'src/order/order.entity';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports : [TypeOrmModule.forFeature([Order,Payment])],
  providers: [PaymentsService],
  controllers: [PaymentsController]
})
export class PaymentsModule {}
