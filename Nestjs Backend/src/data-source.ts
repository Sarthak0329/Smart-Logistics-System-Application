// src/data-source.ts
import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';

// import all entities
import { Customer } from './Customers/customer.entity';
import { Order } from './order/order.entity';
import { Product } from './Products/product.entity';
import { Shipment } from './Shipments/shipment.entity';
import { Payment } from './Payments/payment.entity';
import { Tracking } from './Tracking_status/tracking.entity';
import { Client } from './Client/client.entity';
import { Delivery_agent } from './Delivery_agent/delivery_agent.entity';
import { Driver } from './Driver/driver.entity';
import { OrderItem } from './orderItem/orderItem.entity';
import { ShipmentItem } from './ShipmentItem/shipmentItem.entity';
import { Warehouse } from './Warehouse/warehouse.entity';
import { Admin } from './admin/admin.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',

  // 🔥 Use Supabase DATABASE_URL directly
  url: process.env.DATABASE_URL,

  // Supabase requires SSL
  ssl: {
    rejectUnauthorized: false,
  },

  entities: [
    Admin,
    Client,
    Shipment,
    ShipmentItem,
    Customer,
    Product,
    Payment,
    Tracking,
    Warehouse,
    Delivery_agent,
    Order,
    OrderItem,
    Driver,
  ],

  migrations: ['src/migrations/*.ts'],

  synchronize: false,
  logging: true,
});