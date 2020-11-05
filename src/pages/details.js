import React, {useEffect, useState} from 'react';
import CForm from "../components/form/CForm";
import PropTypes from "prop-types";
import Loader from "../components/loader/Loader";
import { useParams } from 'react-router-dom';
import {GetCompanyById} from "../utils/api/TransportationCompany";

const getCompanyData=async (id,setLoading)=>{
    setLoading(true)
    let res = await GetCompanyById(id);
    setLoading(false)
    return res.data.Data
}
const Details = ({edit}) => {
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        if (edit){
            getCompanyData(id,setLoading).then(data=>setCompany(data))
        }
    }, [edit]);

    return (
        <div>
            {loading&&!edit?<Loader/>:<CForm company={company}/>}

        </div>
    );
};

Details.prototype={
    edit: PropTypes.bool.isRequired
}

export default Details;
