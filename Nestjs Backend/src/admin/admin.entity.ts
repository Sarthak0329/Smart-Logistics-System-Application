import { Roles } from "src/enum";
import { Client } from "../Client/client.entity";
import { Entity,PrimaryGeneratedColumn,Column, OneToMany, CreateDateColumn, Index } from "typeorm";


@Entity('admins')
export class Admin{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    email:string    

    @Column()
    password:string

    @Column({nullable : false})
    phone_number: string

    @Column({default : Roles.ADMIN})
    role: Roles.ADMIN

    @CreateDateColumn({type: 'timestamptz'})
    created_at: Date

    @OneToMany(() => Client,(client) => client.admin)
    clients: Client[]//An array of clients associated with the admin
}