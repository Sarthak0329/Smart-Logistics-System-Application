import { OrderItem } from "../orderItem/orderItem.entity";
import { Shipment } from "../Shipments/shipment.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('shipment_items')
export class ShipmentItem {
   @PrimaryGeneratedColumn()
   id: number;

   @ManyToOne(() => Shipment, (shipment) => shipment.items)
   @JoinColumn({name : 'shipment_id'})
   shipment: Shipment;

   @ManyToOne(() => OrderItem, (orderItem) => orderItem.shipmentItem)
   @JoinColumn({name : 'orderItem_id'})
   orderItem: OrderItem
}

