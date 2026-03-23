import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './driver.entity';
import { ShipmentItem } from 'src/ShipmentItem/shipmentItem.entity';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { Shipment } from 'src/Shipments/shipment.entity';

@Module({
    imports : [TypeOrmModule.forFeature([Driver,Shipment,ShipmentItem])],
    controllers: [DriverController],
    providers: [DriverService],
})
export class DriverModule {}
