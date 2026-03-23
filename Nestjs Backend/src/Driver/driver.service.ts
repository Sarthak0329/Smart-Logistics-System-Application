import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverAssignmentStatus, status } from 'src/enum';
import { Shipment } from 'src/Shipments/shipment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriverService {
    constructor(
        @InjectRepository(Shipment)
        private shipmentRepo : Repository<Shipment>
    ){}
//driver can see deliveries
   async getDeliveries(limit : number,page : number,driverId : string){
     const [data,total] = await this.shipmentRepo.findAndCount({
            where : {driver_id : driverId,
                    driver_status : DriverAssignmentStatus.PENDING },
            skip : (page - 1)*limit,
            take : limit,
        })

    return {
        driver_id: driverId,
        total_shipments: total,
        current_page: page,
        per_page: limit,
        total_pages: Math.ceil(total / limit),
        shipments: data
      };
   }

   async acceptJob(shipmentId : number,driverId : string){
      const shipment = await this.shipmentRepo.findOne({
        where: { id: shipmentId }
    });

    if (!shipment)
        throw new NotFoundException('Shipment not found');

    if (shipment.driver_id !== driverId)
        throw new ForbiddenException('Not your shipment');

    if (shipment.driver_status !== DriverAssignmentStatus.PENDING)
        throw new BadRequestException('Shipment already processed');

    if (shipment.status === status.IN_TRANSIT)
        throw new BadRequestException('Shipment already in transit');

    shipment.driver_status = DriverAssignmentStatus.ACCEPTED;
    shipment.status = status.IN_TRANSIT;

    await this.shipmentRepo.save(shipment);

    return {
        message: 'Shipment accepted'
    };
   }

   async rejectJob(shipmentId: number, driverId: string) {

    const shipment = await this.shipmentRepo.findOne({
        where: { id: shipmentId }
    });

    if (!shipment)
        throw new NotFoundException('Shipment not found');

    if (shipment.driver_id !== driverId)
        throw new ForbiddenException('Not your shipment');

    if (shipment.driver_status !== DriverAssignmentStatus.PENDING)
        throw new BadRequestException('Shipment already processed');

    shipment.driver_status = DriverAssignmentStatus.REJECTED;
    shipment.driver_id = null; // release the shipment
    shipment.status = status.CREATED;

    await this.shipmentRepo.save(shipment);

    return {
        message: 'Shipment rejected'
    };
   }

   async updateShipmentStatus(shipmentId : number,driverId : string){
      const shipment = await this.shipmentRepo.findOne({
        where : {id : shipmentId}
      })

      if(!shipment)
        throw new NotFoundException('Shipment not found !');

      if(shipment.driver_id !== driverId)
        throw new ForbiddenException('Not your shipment');

      if (shipment.status !== status.IN_TRANSIT)
        throw new BadRequestException('Shipment not in transit');

      shipment.status = status.DELIVERED;

      await this.shipmentRepo.save(shipment);

      return {
        shipment_status : 'Shipment delivered successfully'
      };
   }
}
