import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { Order } from 'src/order/order.entity';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports : [TypeOrmModule.forFeature([Customer,Order]), AuthModule],
    providers: [CustomersService],
    controllers: [CustomersController],
})
export class CustomersModule {}
