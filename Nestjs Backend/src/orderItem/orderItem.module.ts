import { Module } from '@nestjs/common';
import { OrderItem } from './orderItem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order/order.entity';
import { ShipmentItem } from 'src/ShipmentItem/shipmentItem.entity';
import { Product } from 'src/Products/product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([OrderItem, Order, ShipmentItem, Product])],
})
export class OrderItemModule {}