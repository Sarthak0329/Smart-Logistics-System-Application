import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  Index,
} from 'typeorm';

import { Customer } from '../Customers/customer.entity';
import { OrderItem } from '../orderItem/orderItem.entity';
import { Payment } from '../Payments/payment.entity';
import { Delivery_agent } from '../Delivery_agent/delivery_agent.entity';
import { truncate } from 'fs';


export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PACKED = 'PACKED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

@Entity('orders')
@Index('idx_orders_customerId', ['customer'])
export class Order {

  @PrimaryGeneratedColumn('uuid')
  id: string;

 
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({ type: 'varchar', nullable : true })
  delivery_otp : string;
  
  @Column({ type : 'timestamptz',nullable : true })
  otp_expires_at : Date

 
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalAmount: number;

 
  @Column({ nullable: true })
  paymentId: string;

  @ManyToOne(() => Delivery_agent, (agent) => agent.orders, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'delivery_agent_id' })
  delivery_agent: Delivery_agent;
  
  @Column()
  delivery_agent_id : number;

  @ManyToOne(() => Customer, (customer) => customer.orders, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({name : 'customer_id'})
  customer: Customer;

  @Column()
  customer_id : number

  @OneToOne(() => Payment, (payments) => payments.orders)
  payment: Payment;//customer should pay for the order only 
  
  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true,
  })
  items: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

