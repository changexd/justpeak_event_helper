import axios, { AxiosResponse, Method } from 'axios';

export async function AxiosHandler<T = any>(action:Method, url:string, data:any, withCredentials:boolean): Promise<AxiosResponse<T>>
export async function AxiosHandler<T = any>(action:Method, url:string, withCredentials:boolean): Promise<AxiosResponse<T>>

export async function AxiosHandler<T = any>(action:Method, url:string, data:any, withCredentials = true) {
  try {
    if (data === undefined) {
      const response : AxiosResponse<T> = await axios({ method: action, url: url, withCredentials: withCredentials });
      return response;
    } else {
      const response : AxiosResponse<T> = await axios({
        method: action, url: url, data: data, withCredentials: withCredentials
      });
      return response;
    }
  } catch (err) {
    return err;
  }
}
