export interface ILoginReq{
    userid:string;
    password:string;
}

export interface ILoginRes{
    name:string;
    email:string;
    phoneNo:string;
    id:string;
    accessToken:string;
    refreshId:string;
}