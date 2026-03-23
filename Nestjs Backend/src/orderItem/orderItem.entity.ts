import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Order } from '../order/order.entity';
import { Product } from '../Products/product.entity';
import { ShipmentItem } from '../ShipmentItem/shipmentItem.entity';

@Entity('order_items')
export class OrderItem {

  @PrimaryGeneratedColumn('uuid')
  id: string;

 
  @Column({ type: 'int' })
  quantity: number;


  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

 
  @ManyToOne(() => Order, (order) => order.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @OneToMany(() => Product, (product) => product.orderItem)
  products : Product[]//An array of products associated with the order item

  @OneToMany(() => ShipmentItem, (shipmentItem) => shipmentItem.orderItem)
  shipmentItem: ShipmentItem
}
