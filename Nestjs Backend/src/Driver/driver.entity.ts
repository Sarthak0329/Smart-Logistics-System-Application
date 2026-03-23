import { ShipmentItem } from "../ShipmentItem/shipmentItem.entity";
import { Shipment } from "../Shipments/shipment.entity";
import { Entity,PrimaryGeneratedColumn,Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Warehouse } from "../Warehouse/warehouse.entity";
import { Roles } from "src/enum";

@Entity('drivers')
export class Driver{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    warehouse_id: number

    @Column()
    name: string

    @Column()
    phone_number: string

    @Column({default : Roles.DRIVER})
    role : Roles.DRIVER

    @Column({default : false})
    isActive : Boolean

    @ManyToOne(() => Warehouse)
    @JoinColumn({ name: 'warehouse_id' })
    warehouse: Warehouse

    @OneToMany(() => Shipment, (shipment) => shipment.driver)
    shipments: Shipment[]

    @Column({type: 'timestamptz'})
    created_at: Date
}