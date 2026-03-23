import { Shipment } from "../Shipments/shipment.entity";
import { Entity,PrimaryGeneratedColumn,Column, OneToMany } from "typeorm";

@Entity('warehouses')
export class Warehouse{
    @PrimaryGeneratedColumn()
    id:number  

    @Column()
    name:string

    @Column()
    city:string

    @Column()
    state:string

    @Column()
    pincode: number

    @Column()
    capacity: number

    @Column()
    current_load:number

    @Column()
    contact_number: number 

    @OneToMany(() => Shipment, (shipment) => shipment.sourceWarehouse)
    sourceShipments: Shipment[];

    @OneToMany(() => Shipment, (shipment) => shipment.destinationWarehouse)
    destinationShipments: Shipment[];


    @Column({type: 'timestamptz'})
    created_at: Date
}