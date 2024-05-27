import axios, { AxiosInstance } from "axios";
import { getAuthorizationHeader } from "./getAuthorizationHeader";

export class AuthService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow all origins
      },
      
    });
  }

  login = async (email: string, password: string) => {

    const res = await this.instance
      .post("/auth/client/login", {
        email,
        password,
      });
    
    return res;
  };


  register = async (name:string, last_name:string, email:string, phone_number:string, password:string, photo_url:string, service_id: string, language_id:string, city_id:string, speciality_id:string, selectedOption: string) =>{
    if(selectedOption == 'Prof'){

      //console.log("este es el serviceId " + service_id + '\n este es el language_id ' + language_id + "\n este es el city_id" + city_id + "\n este es el speciality_id " + speciality_id);
      const res = await this.instance
      .post("/auth/professional/register",{
        name,
        last_name,
        email,
        phone_number,
        photo_url,
        password,
        service_id,
        language_id,
        city_id,
        speciality_id,
      });
      console.log(res)

    }else{
      const res = await this.instance
      .post("/auth/client/register",{
        name,
        last_name,
        email,
        phone_number,
        photo_url,
        password
      });

      console.log(res)


      return {
        username: "test",
        id: "test",
        accessToken: "test",
        expiredAt:  Date.now() + 60 * 60 * 24 * 7,
    }  
    }
      

  }

  getMe = async (userId: string) => {
    const res = await this.instance
      .get(`/users/${userId}`, {
        headers: getAuthorizationHeader(),
      });
    
      return res.data;
  };

  getProfessinals = async () => {
    //console.log(getAuthorizationHeader())
    const res = await this.instance
    .get('professionals/', {
      headers: getAuthorizationHeader(),
    })
    return res.data
  }

  getServicesOfProfessional = async (id: string) => {
    //console.log(getAuthorizationHeader())
    const res = await this.instance
    .get(`/professionals/services/${id}`, {
      headers: getAuthorizationHeader(),
    })
    return res.data
  }

  getCitiesOfProfessional = async (id: string) => {
    //console.log(getAuthorizationHeader())
    const res = await this.instance
    .get(`/professionals/cities/${id}`, {
      headers: getAuthorizationHeader(),
    })
    return res.data
  }

  getServices = async ()=>{
    const res = await this.instance
    .get('/services',{
      headers: getAuthorizationHeader(),
    })

    return res.data
  }

  getSpeciality = async () =>{
    const res = await this.instance
    .get('/specialities',{
      headers: getAuthorizationHeader(),
    })

    return res.data
  }

  getCity = async () =>{
    const res = await this.instance
    .get('/city',{
      headers:getAuthorizationHeader(),
    })

    return res.data
  }


  getLanguage = async () =>{
    const res = await this.instance
    .get('/language',{
      headers:getAuthorizationHeader(),
    })

    return res.data
  }

  /*uploadAvatar = (userId: string, newAvatar: File) => {
    const formData = new FormData();
    formData.append("file", newAvatar);
    return this.instance
      .post(`/users/${userId}/upload`, formData, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        return {
          newAvatar: res.data.data.url,
        };
      });
  };*/
}