import React, {useEffect, useState} from 'react';
import {FormCheck, Navbar, Table} from "react-bootstrap";
import styles from "./CTable.module.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog} from "@fortawesome/free-solid-svg-icons";
import CButton from "../button/CButton";
import {Link} from "react-router-dom";
import {GetAllCompanies} from "../../utils/api/TransportationCompany";


const CRow = (id, name, fleetsNo) => {
    return (
        <tr key={id} style={{textAlign: 'center'}}>
            <td><FormCheck/></td>
            <td>{id}</td>
            <td>{name}</td>
            <td>{fleetsNo}</td>
            <td className={'m-auto'}>
                <Link to={`/edit/${id}`}>

                    <CButton size={'s'} haveIcon={false}>Edit</CButton>
                </Link>
            </td>
        </tr>

    )
}

const getAllCompanies = async () => {
    let res = await GetAllCompanies()
    return res.data.Data
}

const CTable = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        getAllCompanies().then(data => {
            setCompanies(data)
        })
    }, []);

    return (
        <Table striped bordered hover size={'sm'}>
            <thead className={styles.tableHeader}>
            <tr>
                <th><FormCheck/></th>
                <th>CompanyID#</th>
                <th>Company Name</th>
                <th>Total Fleet</th>
                <th><FontAwesomeIcon size="lg" icon={faCog}/></th>
            </tr>
            </thead>
            <tbody>
            {companies.map(({ID, Name, TotalFleet}) => CRow(ID, Name, TotalFleet))}
            </tbody>
        </Table>
    );
};

export default CTable;
