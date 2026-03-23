import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { OrderItem } from 'src/orderItem/orderItem.entity';

@Module({
    imports : [TypeOrmModule.forFeature([
        Product,
        OrderItem,
    ])],
})
export class ProductsModule {}
