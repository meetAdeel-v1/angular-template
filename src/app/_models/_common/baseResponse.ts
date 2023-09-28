export class baseResponse{
    Response:response =new response();
}

export class response{
    Code:string="";
    Messages:string="";
    Errors:respnseError[]=[];
}

export class respnseError{
    Code:string="";
    Message:string="";

}
