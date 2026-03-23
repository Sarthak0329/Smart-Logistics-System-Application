import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Delivery_agent } from 'src/Delivery_agent/delivery_agent.entity';
import { Customer } from 'src/Customers/customer.entity';
import { Payment } from 'src/Payments/payment.entity';
import { OrderItem } from 'src/orderItem/orderItem.entity';

@Module({
    imports : [TypeOrmModule.forFeature([Order, Delivery_agent, Customer, Payment, OrderItem])],
})
export class OrderModule {}
