import { IsEnum } from "class-validator";
import { paymentMode } from "src/enum";

export class paymentModeDTO{

    @IsEnum(paymentMode)
    paymentMode : paymentMode

}