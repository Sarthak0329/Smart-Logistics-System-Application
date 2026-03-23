import { Client } from "../Client/client.entity";
import { Driver } from "../Driver/driver.entity";
import { ShipmentItem } from "../ShipmentItem/shipmentItem.entity";
import { Tracking } from "../Tracking_status/tracking.entity";
import { Warehouse } from "../Warehouse/warehouse.entity";
import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DriverAssignmentStatus, status } from 'src/enum';
import { DriverController } from "src/Driver/driver.controller";


@Entity('shipments')
@Index('idx_shipments_client_id', ['client_id'])
export class Shipment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    client_id: number

    @Column({
    type: 'timestamptz',   
    nullable: true})
    pickup_scheduled_at: Date;

    @Column()
    pickup_location: string

    @Column()
    delivery_location: string

    @Column()
    weight: number

    @Column()
    package_type: string

    @Column({
        type: 'enum',
        enum: DriverAssignmentStatus,
        default: DriverAssignmentStatus.PENDING
    })
    driver_status : DriverAssignmentStatus

    @ManyToOne(() => Client, (client) => client.shipments)
    @JoinColumn({ name: 'client_id' })
    client: Client;

    @ManyToOne(() => Warehouse, (warehouse) => warehouse.sourceShipments)
    @JoinColumn({ name: 'source_warehouse_id' })
    sourceWarehouse: Warehouse;

    @ManyToOne(() => Warehouse, (warehouse) => warehouse.destinationShipments)
    @JoinColumn({ name: 'destination_warehouse_id' })
    destinationWarehouse: Warehouse;

    @Column({nullable : true})
    driver_id : string | null;
    
    @ManyToOne(() => Driver, (driver) => driver.shipments)
    @JoinColumn({ name: 'driver_id' })
    driver: Driver;

    @OneToMany(() => Tracking, (tracking) => tracking.shipment)
    trackings: Tracking[]//An array of tracking records associated with the shipment

    @OneToMany(() => ShipmentItem, (shipmentItem) => shipmentItem.shipment)
    items: ShipmentItem[]//An array of shipment items associated with the shipment
   
    @CreateDateColumn({type:'timestamptz'})
    created_at: Date

    @Column({type: 'timestamptz', nullable: true})
    delivered_at: Date

    @Column({default:status.CREATED,nullable:false})
    status: status

}