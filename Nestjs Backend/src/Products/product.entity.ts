import { OrderItem } from "../orderItem/orderItem.entity";
import { Entity,PrimaryGeneratedColumn,Column,CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity('products')
export class Product{
    @PrimaryGeneratedColumn()
    id:number
    
    @Column()
    name: string

    @Column()
    description: string 

    @Column()  
    weight: number

    @Column({nullable:false,default : 0})
    stock : number

    @ManyToOne(() => OrderItem, (orderitem) => orderitem.products)
    @JoinColumn({name : 'order_item_id'})
    orderItem : OrderItem

    @CreateDateColumn({type: 'timestamptz'})
    created_at: Date

}