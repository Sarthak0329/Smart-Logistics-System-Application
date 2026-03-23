import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from 'src/Shipments/shipment.entity';
import { Tracking } from './tracking.entity';

@Module({
    imports : [TypeOrmModule.forFeature([
        Tracking,
        Shipment
    ])],
})
export class TrackingStatusModule {}
