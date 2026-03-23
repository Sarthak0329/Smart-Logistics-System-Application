import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin-dto/admin-dto';
import { Roles } from 'src/enum';
import { Role } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { jwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('admin')
export class AdminController {
    constructor(private readonly adminSignUpService : AdminService){}
   
   
  
   @Post('signup')
   async SignUp(@Body() admindto : AdminDto){
       return this.adminSignUpService.AdminSignUp(admindto);
   }
   

   @Post('login')
   async Login(@Body() LoginInfo : AdminDto){
      return this.adminSignUpService.AdminLogin(LoginInfo);
   }


}
