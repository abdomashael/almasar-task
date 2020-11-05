import Axios from "axios";

const API_URL =  process.env.REACT_APP_API_URL+'/TransportationCompany'


const AddCompany = async (company)=>{
    return await Axios.post(API_URL+'/Add/',company,{
        headers: {
            // 'application/json' is the modern content-type for JSON, but some
            // older servers may use 'text/json'.
            // See: http://bit.ly/text-json
            'content-type': 'application/json'
        }
    })
}

const GetAllCompanies =async ()=>{
    return await Axios.get(API_URL+'/All/')

}

const GetCompanyById =async (id)=>{
    return await Axios.get(API_URL+'/GetById/', {
        params: {
            id: id
        }
    })
}

const UpdateCompanyDetails =async (company)=>{
    return await Axios.put(API_URL+'/Update/',company,{
        headers: {
            // 'application/json' is the modern content-type for JSON, but some
            // older servers may use 'text/json'.
            // See: http://bit.ly/text-json
            'content-type': 'application/json'
        }
    })
}

export {AddCompany,GetAllCompanies,GetCompanyById,UpdateCompanyDetails}
