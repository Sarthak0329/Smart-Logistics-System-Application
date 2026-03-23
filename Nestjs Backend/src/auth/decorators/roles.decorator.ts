import { SetMetadata } from "@nestjs/common";
import { Roles } from "src/enum";

export const ROLE_KEY = 'roles';

export const Role = (...roles : Roles[]/*This is the enum*/) => SetMetadata(ROLE_KEY,roles);//this is our decorator