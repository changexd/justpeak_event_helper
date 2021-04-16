import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

export function AxiosHandler(action:Method,url:string,data:any,withCredentials:boolean): Promise<AxiosResponse<any>>|any
export function AxiosHandler(action:Method,url:string,withCredentials:boolean): Promise<AxiosResponse<any>>|any

export async function AxiosHandler(action:Method,url:string,data?:any,withCredentials=true){
  try{
    if(data==null){    
    const response = await axios({method:action,url:url,withCredentials:withCredentials});
    return response 
  }else{
    const response = await axios({method:action,url:url,data:data,withCredentials:withCredentials});
  }

  }catch(err){
    console.log(err);
    return err.statusCode;
  }
}
