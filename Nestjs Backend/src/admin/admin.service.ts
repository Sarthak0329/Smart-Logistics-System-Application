import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Repository } from 'typeorm';
import { AdminDto } from './dto/admin-dto/admin-dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/enum';


@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(Admin)
        private adminRepository : Repository<Admin>,
        private jwtService : JwtService
    ){}

    async AdminSignUp(createAdminDto : AdminDto){
            const admin = await this.adminRepository.findOne({where: {email: createAdminDto.email}});
            if(admin){
                throw new ConflictException("Email already in use");
            }
            
           const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);//hash the password as storing the password as a plain string is not secure
            
           const newadmin = this.adminRepository.create({...createAdminDto,
             password: hashedPassword,
             role : Roles.ADMIN,
            });

           await this.adminRepository.save(newadmin);
           
           const payload = {
              sub : newadmin.id,
              email: newadmin.email,
              role: newadmin.role,
           }
   
           return {
            access_token : this.jwtService.sign(payload),
           }
    }

    async AdminLogin(createAdminDto : AdminDto){
        //we have to check first if user's email is already present in the database or not 
        const admin = await this.adminRepository.findOneBy({email : createAdminDto.email});

        if(!admin)
            throw new UnauthorizedException('Invalid Email or password');


        const isPasswordMatch = await bcrypt.compare(createAdminDto.password, admin.password);

        if(!isPasswordMatch)
            throw new UnauthorizedException('Invalid Password !');

        const payload = {
            sub: admin.id,
            email: admin.email,
            role: admin.role,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    
}
