import { Roles } from "src/enum";
import { Order } from "../order/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    name: string

    @Column()
    email: string   

    @Column()
    password : string  

    @Column()
    phone_number: string 
    
    @Column()
    address: string

    @Column()
    city: string

    @Column()
    state: string

    @Column()
    pincode: string

    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[];

    @CreateDateColumn({type: 'timestamptz'})
    created_at: Date

}