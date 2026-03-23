import { Shipment } from "../Shipments/shipment.entity";
import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from "typeorm";

@Entity('tracking')
@Index('idx_tracking_shipment_id', ['shipment'])
export class Tracking{
    @PrimaryGeneratedColumn()
    id: number

    @Column()   
    status: string

    @Column()
    location: string  

    @UpdateDateColumn()
    UpdatedBy: Date

    @Column()
    remarks: string

    @ManyToOne(() => Shipment, (shipment) => shipment.trackings)
    @JoinColumn({name : 'shipment_id'})//specifying the name of the foreign key column
    shipment: Shipment

    @CreateDateColumn()
    createdAt : Date
}