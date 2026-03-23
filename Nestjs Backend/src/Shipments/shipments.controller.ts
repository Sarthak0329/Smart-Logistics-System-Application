import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentDTO, updateShipmentDTO } from './shipments-dto/shipments-dto.dto';
import { jwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { Role } from 'src/auth/decorators/roles.decorator';
import { Roles } from 'src/enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PaginationDTO } from 'src/paginationDTO/paginationDto.dto';
import { SchedulePickupDto } from 'src/scheduleDTO/scheduleDTO.dto';

interface AuthenticatedRequest extends Request {
  user: {
    sub: number;
    role: Roles;
    email: string;
  };
}

@Controller('client/shipments')
export class ShipmentsController {
  constructor(private shipmentService: ShipmentsService) { }

  @UseGuards(jwtAuthGuard, RolesGuard)
  @Role(Roles.CLIENT)
  @Post()
  async createShipments(@Req() req: AuthenticatedRequest, @Body() shipments: ShipmentDTO) {
    const clientId = req.user.sub;//extracting the clientId from the req object
    return this.shipmentService.createShipment(shipments, clientId);
  }

  @UseGuards(jwtAuthGuard, RolesGuard)
  @Role(Roles.CLIENT)
  @Patch(':id')
  async editshipments(@Param('id', ParseIntPipe) shipmentId: number, @Body() shipments: updateShipmentDTO, @Req() req: AuthenticatedRequest,) {
    const clientId = req.user.sub;
    return this.shipmentService.editShipment(shipments, shipmentId, clientId);
  }

  @UseGuards(jwtAuthGuard, RolesGuard)
  @Role(Roles.CLIENT)
  @Patch(':id/cancel')
  async cancelShipment(
    @Param('id', ParseIntPipe) shipmentId: number,
    @Req() req: AuthenticatedRequest,
  ) {
    const clientId = req.user.sub;
    return this.shipmentService.cancelShipment(shipmentId, clientId);
  }

  @UseGuards(jwtAuthGuard, RolesGuard)
  @Role(Roles.CLIENT)
  @Get()
  async viewShipments(
    @Query() pagination: PaginationDTO,
    @Req() req: AuthenticatedRequest,
    ) {
    const clientId = req.user.sub;

    return this.shipmentService.seeShipments(pagination, clientId);
  }

  //we will write the controller logic for the pickup related things 
   
  @UseGuards(jwtAuthGuard, RolesGuard)
  @Role(Roles.CLIENT)
  @Patch(':id/schedule-pickup')
  async schedulePickup(
  @Param('id', ParseIntPipe) shipmentId: number,
  @Body() dto: SchedulePickupDto,
  @Req() req: AuthenticatedRequest,
  ) {
  const clientId = req.user.sub;

    return this.shipmentService.schedulePickup(
      dto,
      shipmentId,
      clientId,
    );
  }
}
