import { IsNotEmpty } from "class-validator";

export class ccDTO {
    @IsNotEmpty()
    ccnum: string;
    @IsNotEmpty()
    month: string;
    @IsNotEmpty()
    year: string;
    @IsNotEmpty()
    cvv: string;
    address: string;
    phone: string;
    zipcode: string;
    state: string;
    email: string;
    address2: string;
    city: string;
    ip: string;
    userAgent: string;
    fullname: string;
    password: string;
}
