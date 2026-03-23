import { Injectable, InternalServerErrorException, NotFoundException, BadRequestException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Shipment } from './shipment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ShipmentDTO, updateShipmentDTO } from './shipments-dto/shipments-dto.dto';
import { Warehouse } from 'src/Warehouse/warehouse.entity';
import { Client } from 'src/Client/client.entity';
import { PaginationDTO } from 'src/paginationDTO/paginationDto.dto';
import { SchedulePickupDto } from 'src/scheduleDTO/scheduleDTO.dto';
import { status } from 'src/enum';

@Injectable()
export class ShipmentsService {
    constructor(
        @InjectRepository(Shipment)
        private shipmentRepo: Repository<Shipment>,
        @InjectRepository(Warehouse)
        private warehouseRepo: Repository<Warehouse>,
        @InjectRepository(Client)
        private clientRepo: Repository<Client>
    ) { }
    //the clientId would be extracted from the JWT in the controller logic 
    async createShipment(shipmentDto: ShipmentDTO, clientId: number) {
        // Validate client exists
        const client = await this.clientRepo.findOneBy({ Client_id: clientId });
        if (!client) throw new BadRequestException('Client not found');

        const sourceWarehouse = await this.warehouseRepo.findOneBy({ id: shipmentDto.source_warehouse_id });
        if (!sourceWarehouse) throw new NotFoundException('Source warehouse not found');

        const destinationWarehouse = await this.warehouseRepo.findOneBy({ id: shipmentDto.destination_warehouse_id });
        if (!destinationWarehouse) throw new NotFoundException('Destination warehouse not found');

        const shipmentdata = this.shipmentRepo.create({
            client_id: clientId,
            pickup_location: shipmentDto.pickup_location,
            delivery_location: shipmentDto.delivery_location,
            weight: shipmentDto.weight,
            package_type: shipmentDto.package_type,
            sourceWarehouse: sourceWarehouse,
            destinationWarehouse: destinationWarehouse,
            status: status.CREATED
        });

        try {
            return await this.shipmentRepo.save(shipmentdata);
        }
        catch (error) {
            console.error('Error creating shipment:', error);
            throw new InternalServerErrorException('Failed to create shipment. Please try again.');
        }
    }

    async editShipment(shipmentDto: updateShipmentDTO, shipmentId: number, clientId: number) {

        const required = await this.shipmentRepo.findOneBy({ id: shipmentId });
        if (!required)
            throw new NotFoundException('Required shipment does not exist');

        if (clientId !== required.client_id) throw new ForbiddenException('You cannot edit this shipment');

        if (required.status !== status.CREATED) throw new BadRequestException('Cannot update, Shipment is currently in transit');

        Object.assign(required, shipmentDto);
        return await this.shipmentRepo.save(required);
    }

    async cancelShipment(shipmentId: number, clientId: number) {
        const required = await this.shipmentRepo.findOneBy({ id: shipmentId });
        if (!required)
            throw new NotFoundException('Required shipment does not exist');

        if (clientId !== required.client_id) throw new ForbiddenException('You cannot edit this shipment');

        if (required.status !== status.CREATED) throw new BadRequestException('Cannot update, Shipment is currently in transit');

        required.status = status.CANCELLED;
        try {
            return await this.shipmentRepo.save(required);
        }
        catch (error) {
            console.error('Cancel shipment error:', error);
            throw new InternalServerErrorException(
                'Error cancelling the shipment'
            );
        }
    }

    async seeShipments(paginationdata : PaginationDTO,clientId : number){
       //if (clientId !== required.client_id) throw new ForbiddenException('You cannot edit this shipment');
      const {page,limit} = paginationdata;
      const offset = (page - 1) * limit;

      const [data, count] = await this.shipmentRepo.findAndCount({
        where : {client_id : clientId},
        order : {created_at : "DESC"},
        take : limit,
        skip : offset
      });

      return {
        data,
        metadata : {
            count,
            limit,
            page,
            lastpage : Math.ceil(count/limit),
        }
       };
    }

    async schedulePickup(pickup_schedule : SchedulePickupDto,shipmentId : number,clientId : number,){
       const shipment = await this.shipmentRepo.findOneBy({id : shipmentId});

       if (!shipment)
        throw new NotFoundException('Shipment not found');

       if(clientId !== shipment?.client_id)
        throw new NotFoundException('Client is Invalid');

       if (pickup_schedule.pickup_scheduled_at < new Date())
        throw new BadRequestException('Pickup time cannot be in the past');

       shipment.pickup_scheduled_at = pickup_schedule.pickup_scheduled_at;

       shipment.status = status.AT_WAREHOUSE;

       return this.shipmentRepo.save(shipment);
    }

    async reschedulePickup(shipmentId : number, clientId : number,updated_pickup : SchedulePickupDto){
       const shipment = await this.shipmentRepo.findOneBy({ id: shipmentId });

        if (!shipment)
            throw new NotFoundException('Shipment does not exist');

        if (shipment.client_id !== clientId)
            throw new ForbiddenException('You cannot reschedule this shipment');

        if (shipment.status === status.CANCELLED)
            throw new BadRequestException('Cannot reschedule a cancelled shipment');

        if (shipment.status === status.DELIVERED)
            throw new BadRequestException('Shipment already delivered');

        if (!shipment.pickup_scheduled_at)
            throw new BadRequestException('Pickup not scheduled yet');

        const newPickupTime = new Date(updated_pickup.pickup_scheduled_at);

        if (isNaN(newPickupTime.getTime()))
            throw new BadRequestException('Invalid pickup date format');

        if (newPickupTime <= new Date())
            throw new BadRequestException('Pickup time must be in the future');

        shipment.pickup_scheduled_at = newPickupTime;

        try {
            return await this.shipmentRepo.save(shipment);
        } catch (error) {
            console.error('Reschedule pickup error:', error);
            throw new InternalServerErrorException(
            'Error while rescheduling pickup',
            );
        }
    }

    async paymentMode(clientId : number,){

    }

}
