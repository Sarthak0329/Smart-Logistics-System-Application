import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './shipment.entity';
import { Warehouse } from 'src/Warehouse/warehouse.entity';
import { Client } from 'src/Client/client.entity';
import { Tracking } from 'src/Tracking_status/tracking.entity';
import { ShipmentItem } from 'src/ShipmentItem/shipmentItem.entity';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports : [TypeOrmModule.forFeature([
        Shipment,
        Warehouse,
        Client,
        Tracking,
        ShipmentItem,
    ]),AuthModule],
    providers: [ShipmentsService],
    controllers: [ShipmentsController],
})
export class ShipmentsModule {}
