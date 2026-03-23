import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from 'src/Shipments/shipment.entity';
import { Admin } from 'src/admin/admin.entity';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from './client.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports : [TypeOrmModule.forFeature([Client,Shipment,Admin]),AuthModule],
    providers: [ClientService],
    controllers: [ClientController]
})
export class ClientModule {}
