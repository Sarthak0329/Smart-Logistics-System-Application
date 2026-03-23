import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class SchedulePickupDto {

  @Type(() => Date)
  @IsDate()
  pickup_scheduled_at: Date;
  
}