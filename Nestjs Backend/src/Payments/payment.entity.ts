import { paymentMode, paymentStatus } from "src/enum";
import { Order } from "../order/order.entity"
import { Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('payments')
export class Payment{
    @PrimaryGeneratedColumn()
    id:number
  
    @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  amount: string;

    @Column({
    type: 'enum',
    enum: paymentMode,
  })
  payment_method: paymentMode;

    @Column({
    type: 'enum',
    enum: paymentStatus,
    default: paymentStatus.PENDING,
  })
    payment_status: paymentStatus;
    
    @Column()
    order_id: string;

    @OneToOne(() => Order, (orders) => orders.payment, {
    onDelete: 'CASCADE', 
    })
    @JoinColumn({ name: 'order_id' })
    @Index({ unique: true }) 
    orders: Order;

    @Column({ type: 'timestamptz', nullable: true })
    paid_at: Date;

    @CreateDateColumn({ type: 'timestamptz' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updated_at: Date;
}
