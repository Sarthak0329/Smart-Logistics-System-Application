import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './warehouse.entity';
import { Shipment } from 'src/Shipments/shipment.entity';
import { WarehouseController } from './warehouse.controller';
import { WarehouseService } from './warehouse.service';
import { Delivery_agent } from 'src/Delivery_agent/delivery_agent.entity';
import { Order } from 'src/order/order.entity';
import { Product } from 'src/Products/product.entity';

@Module({
    imports : [TypeOrmModule.forFeature([
        Warehouse,
        Product,
        Shipment,
        Delivery_agent,
        Order
    ])],
    controllers: [WarehouseController],
    providers: [WarehouseService],
})
export class WarehouseModule {}
