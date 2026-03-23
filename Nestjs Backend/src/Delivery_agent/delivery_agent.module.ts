import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Delivery_agent } from './delivery_agent.entity';
import { Order } from 'src/order/order.entity';
import { DeliveryAgentController } from './delivery_agent.controller';
import { DeliveryAgentService } from './delivery_agent.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@Module({
    imports : [TypeOrmModule.forFeature([Delivery_agent, Order])],
    controllers: [DeliveryAgentController],
    providers: [DeliveryAgentService,NotificationsService],
})
export class DeliveryAgentModule {}
