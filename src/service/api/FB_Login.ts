import axios, {AxiosResponse} from 'axios';

interface IFBInfo {
  MemberId: string;
}
interface IFBMember extends IFBInfo {
  FbLink: string;
  NameFb:string;
  NameEng: string;
  NameZht: string;
}
const host =
  process.env.REACT_APP_MODE == 'DEV'
    ? process.env.REACT_APP_DEVHOST
    : process.env.REACT_APP_PRODHOST;

export const FB_Login = {
  //check if member is registered
  CheckMember: async (info: IFBInfo): Promise<AxiosResponse<any>> => {
    try {
      const result = await axios.get(
        `${host}/member/checkmember?MemberId=${info.MemberId}`
      );
      return result;
    } catch (error) {
      return error;
    }
  },
  //Create member to Database by using FB api
  CreateMember: async (Member: IFBMember) => {
    try {
      const result = axios.post(`${host}/member/createMember`, Member,{withCredentials:true});
      return result;
    } catch (error) {
      return error;
    }
  },
};
