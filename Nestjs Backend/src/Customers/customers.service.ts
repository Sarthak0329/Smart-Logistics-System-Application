import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './customer.entity';
import { customerSignInDTO, customerSignUpDTO } from './dto/customersAuth.dto';
import * as bcrypt from 'bcrypt';
import { Roles } from 'src/enum';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomersService {
   constructor(
     @InjectRepository(Customer)
     private customerRepo : Repository<Customer>,
     private jwtService : JwtService,
   ){}

    async signUp(customerInfo : customerSignUpDTO){
        const customer = await this.customerRepo.findOne({
            where : {email : customerInfo.email}
        })

        if(customer)
            throw new ConflictException('Email is already in use');
        
        const hashedPassword = await bcrypt.hash(customerInfo.password,10);

        const newCustomer = await this.customerRepo.save({...customerInfo,
            password : hashedPassword,
            phone_number: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
        });
        
        const payload = {
           sub : newCustomer.id,
           email :  customerInfo.email,
           role : Roles.CUSTOMER,
        }

        return {
            access_token : await this.jwtService.signAsync(payload),
        };
    }

    async login(customerInfo: customerSignInDTO) {

        const customer = await this.customerRepo.findOne({
            where: { email: customerInfo.email }
        });

        if (!customer)
        throw new NotFoundException('Invalid email or password');

        const isPasswordValid = await bcrypt.compare(
            customerInfo.password,
            customer.password,
        );

        if (!isPasswordValid)
            throw new BadRequestException('Invalid email or password');

        const payload = {
            sub: customer.id,
            email: customer.email,
            role: Roles.CUSTOMER
        };

        const token = await this.jwtService.signAsync(payload);

        return {
            access_token: token
        };
    }
}
