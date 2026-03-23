import { ConflictException, Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ClientSignupDto } from './dto/client-dto.dto/client-dto.dto';
import { JwtService } from '@nestjs/jwt';
import { Admin } from 'src/admin/admin.entity';

@Injectable()
export class ClientService {
    constructor(
        @InjectRepository(Client)
        private clientRepo : Repository<Client>,
        @InjectRepository(Admin)
        private adminRepo: Repository<Admin>,
        private jwtservice : JwtService

    ){}

        //right now i will just implement the same signup and login logic like i did for admin

        async ClientSignUp(clientDto : ClientSignupDto){
            const client = await this.clientRepo.findOneBy({email: clientDto.email});
            if(client){
                throw new ConflictException("Email already in use");
            }

            // Validate that admin with id 1 exists
            const admin = await this.adminRepo.findOneBy({ id: 1 });
            if (!admin) {
                throw new BadRequestException('Admin not found. Please contact support.');
            }

           const hashedPassword = await bcrypt.hash(clientDto.password, 10);
            
           const newClient = this.clientRepo.create({
            name : clientDto.name,
            email: clientDto.email,
            password:hashedPassword,
            phone_number:clientDto.phone_number,
            admin: admin
           });
         

           await this.clientRepo.save(newClient);
             
           const payload = {
            sub : newClient.Client_id,
            role : newClient.role,
            email : newClient.email,
           };
 
           return {
                access_token : this.jwtservice.sign(payload)
           };       
    }

    async ClientLogin(clientDto : ClientSignupDto){
        const client = await this.clientRepo.findOneBy({email : clientDto.email}); 
        if(!client)
            throw new UnauthorizedException('Invalid Email or Password');

        const isPasswordMatch = await bcrypt.compare(clientDto.password, client.password);

        if(!isPasswordMatch)
            throw new UnauthorizedException('Invalid Password');

        const payload = {
            sub: client.Client_id,
            email: client.email,
            role: client.role,
        };

        return {
            access_token: this.jwtservice.sign(payload),
        };
    }
}
