import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './admin/admin.entity';
import { Client } from './Client/client.entity';
import { Shipment } from './Shipments/shipment.entity';
import { ShipmentItem } from './ShipmentItem/shipmentItem.entity';
import { Customer } from './Customers/customer.entity';
import { Product } from './Products/product.entity';
import { Payment } from './Payments/payment.entity';
import { Tracking } from './Tracking_status/tracking.entity';
import { Warehouse } from './Warehouse/warehouse.entity';
import { Delivery_agent } from './Delivery_agent/delivery_agent.entity';
import { Order } from './order/order.entity';
import { OrderItem } from './orderItem/orderItem.entity';
import { Driver } from './Driver/driver.entity';
import { ClientModule } from './Client/client.module';
import { CustomersModule } from './Customers/customers.module';
import { DeliveryAgentModule } from './Delivery_agent/delivery_agent.module';
import { DriverModule } from './Driver/driver.module';
import { ShipmentsModule } from './Shipments/shipments.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './orderItem/orderItem.module';
import { PaymentsModule } from './Payments/payments.module';
import { ProductsModule } from './Products/products.module';
import { TrackingStatusModule } from './Tracking_status/tracking_status.module';
import { WarehouseModule } from './Warehouse/warehouse.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PaymentsService } from './Payments/payments.service';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      synchronize: false,
      migrationsRun: true,
      entities: [Admin, Client, Shipment, ShipmentItem, Customer, Product, Payment, Tracking, Warehouse, Delivery_agent, Order, OrderItem, Driver],
      migrations: ['dist/migrations/*.js'],
      logging: false,
    }),
    AdminModule,
    ClientModule,
    CustomersModule,
    DeliveryAgentModule,
    DriverModule,
    OrderModule,
    OrderItemModule,
    ShipmentsModule,
    PaymentsModule,
    ProductsModule,
    TrackingStatusModule,
    WarehouseModule,
    AuthModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
