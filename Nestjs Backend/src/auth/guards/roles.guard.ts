import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLE_KEY } from "src/auth/decorators/roles.decorator";
import { Roles } from "src/enum";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector : Reflector){}
    canActivate(context: ExecutionContext): boolean {
        
        const requireRoles = this.reflector.getAllAndOverride<Roles[]>(
            ROLE_KEY,
            [
                context.getClass(),
                context.getHandler(),
            ]
        );
        
        if(!requireRoles)
            return true;

        const request = context.switchToHttp().getRequest();

        const user = request.user;

        return requireRoles.includes(user.role); 
    }
}