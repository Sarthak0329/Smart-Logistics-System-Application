import { Controller, Get, Param, Patch, Put, Query, Req } from '@nestjs/common';
import { DriverService } from './driver.service';
import { PaginationDTO } from 'src/paginationDTO/paginationDto.dto';

@Controller('driver')
export class DriverController {
    constructor(private driverService : DriverService){}
   

    @Get(':driverId/deliveries')
    async getDeliveries(@Query() query : PaginationDTO,@Param('driverId') driverId : string){
        return this.driverService.getDeliveries(query.limit,query.page,driverId);
    }

    @Patch(':driverId/shipments/:shipmentId/accept_delivery')
    async acceptDelivery(@Param('shipmentId') shipmentId : string,@Param('driverId') driverId : string){
       return this.driverService.acceptJob(Number(shipmentId),driverId);
    }

    @Patch(':driverId/shipments/:shipmentId/accept_delivery')
    async rejecttDelivery(@Param('shipmentId') shipmentId : string,@Param('driverId') driverId : string){
       return this.driverService.rejectJob(Number(shipmentId),driverId);
    }
    
    @Patch(':driverId/shipments/:shipmentId/updateShipmentStatus')
    async statusUpdate(@Param('shipmentId') shipmentId : string, @Param('clientId') clientId : string){
        return this.driverService.updateShipmentStatus(Number(shipmentId),clientId);
    }

}
