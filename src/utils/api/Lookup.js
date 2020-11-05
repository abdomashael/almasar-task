import Axios from "axios";

const API_URL =  process.env.REACT_APP_API_URL+"/Lookup"

const GetCities = async (countryID)=>{
    return await Axios.get(API_URL+'/GetCities/', {
        params: {
            countryId: countryID
        }
    })
}

const GetCountries =async ()=>{
    return await Axios.get(API_URL+'/GetCountries/')

}

const GetVehicleType =async ()=>{
    return await Axios.get(API_URL+'/GetVehicleType/')

}

export {GetCities,GetCountries,GetVehicleType}
