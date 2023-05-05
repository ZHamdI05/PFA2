export interface ILoginResponse{
    access_token:string,
    token_type:string,
    expires_in:string,
    user:{
      id:number,
      firstName:string,
      lastName:string,
      email:string,
      password:string,
      profilePicture:string
    }
}