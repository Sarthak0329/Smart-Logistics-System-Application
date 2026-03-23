import { Roles } from "src/enum";
import { Admin } from "../admin/admin.entity";
import { Shipment } from "../Shipments/shipment.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from   "typeorm";

@Entity('clients')
export class Client {
    @PrimaryGeneratedColumn()
    Client_id: number

    @Column()  
    name: string

    @Column()
    email: string

    @Column()
    password: string    

    @Column()
    phone_number: string

    @Column({default: Roles.CLIENT})
    role : Roles
    
    @Column({nullable: true})
    business_name: string

    @Column({nullable: true})
    business_type: string

    @Column({nullable: true})
    default_pickup_location: string

    @Column({default: false})
    cod_enabled: boolean
    
    @Column({default : false})
    is_active: boolean

    @Column({default: false})
    is_approved: boolean

    @OneToMany(() => Shipment, (shipment) => shipment.client)
    shipments : Shipment[]//An array of shipments associated with the client

    @ManyToOne(() => Admin, (admin) => admin.clients,{nullable:false})
    @JoinColumn({name : 'admin_id'})//specifying the name of the foreign key column
    admin: Admin

    @CreateDateColumn({type: 'timestamptz'})
    created_at: Date

    @UpdateDateColumn({type: 'timestamptz'})
    updated_at: Date
}