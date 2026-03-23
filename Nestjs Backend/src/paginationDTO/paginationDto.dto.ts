import { IsNotEmpty, IsNumber, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDTO{
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    page : number
   
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    @Max(50)
    limit : number
}