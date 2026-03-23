import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min, min } from "class-validator"


export class ShipmentDTO{
    @IsString()
    @IsNotEmpty()
    pickup_location:string
   
    @IsString()
    @IsNotEmpty()
    delivery_location:string
    
    @IsNumber()
    @IsNotEmpty()
    weight:number
    
    @IsString()
    @IsNotEmpty()
    package_type:string

    @IsNumber()
    @IsNotEmpty()
    source_warehouse_id:number

    @IsNumber()
    @IsNotEmpty()
    destination_warehouse_id:number
}

export class updateShipmentDTO{
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    pickup_location?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    delivery_location?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    weight?: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    package_type?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    source_warehouse_id?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    destination_warehouse_id?: number;
}

