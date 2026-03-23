import { Order } from "../order/order.entity";
import { Entity,PrimaryGeneratedColumn,Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Warehouse } from "../Warehouse/warehouse.entity";
import { Roles } from "src/enum";

@Entity('delivery_agents')
export class Delivery_agent{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()   
    email:string    

    @Column()
    password:string

    @Column()
    phone_number: string

    @Column()
    warehouse_id: number

    @Column({default : Roles.DELIVERY_AGENT})
    role: Roles.DELIVERY_AGENT
    
    @ManyToOne(() => Warehouse)
    @JoinColumn({ name: 'warehouse_id' })
    warehouse: Warehouse

    @Column()
    vehicle_type: string

    @OneToMany(() => Order,(order) => order.delivery_agent)
    orders : Order[]//An array of orders associated with the delivery agent

    @Column()
    availability_status: boolean
}