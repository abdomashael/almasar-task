import React, {Fragment, useEffect, useState} from 'react';
import {Form, reduxForm, reset} from "redux-form";
import CompanyCard, {companyValidate} from "../companyCard/CompanyCard";
import BusCard from "../busCard/BusCard";
import {Button, Col, Row} from "react-bootstrap";
import {TransportationCompanyBusesDTO, TransportationCompanyDetailsDTO} from "../../utils/api/ObjectCreator";
import {AddCompany, UpdateCompanyDetails} from "../../utils/api/TransportationCompany";
import Loader from "../loader/Loader";
import CModal from "../CModal";

export const BusesContext = React.createContext([]);

const OPERATION_TYPE = {
    post: 1, put: 2
}
let idx = 0;
const pushResult = (values, operation, buses, setLoading, setModalShow, setModalMsg) => {
    buses = buses.map(bus => TransportationCompanyBusesDTO(bus.key,
        values[`bus${bus.key}Type`],
        values[`bus${bus.key}Brand`],
        values[`bus${bus.key}TNoSeats`],
        values[`bus${bus.key}NoSeatsRow`],
        values[`bus${bus.key}TNoBuses`],
        values[`bus${bus.key}Image`].file ? values[`bus${bus.key}Image`].file.name : values[`bus${bus.key}Image`],
        values[`bus${bus.key}Notes`],
        values[`bus${bus.key}YearModel`],
        values[`bus${bus.key}Description`]));

    const company = TransportationCompanyDetailsDTO(values['companyID'],
        values['companyName'],
        values['companyAddress'],
        values['country'],
        values['city'],
        values['companyPhone'],
        values['personName'],
        values['personPhone'],
        values['personEmail'],
        buses)

    setLoading(true)
    if (operation===OPERATION_TYPE.post){
        AddCompany(company).then(res => {
            setLoading(false)
            setModalShow(true)
            setModalMsg('Bus Data Add Successfully.')
        }).catch(err => {
            setLoading(false)
            setModalShow(true)
            setModalMsg('Error happened while add Bus Data !!!')
        })
    }else if (OPERATION_TYPE.put){
        UpdateCompanyDetails(company).then(res => {
            setLoading(false)
            setModalShow(true)
            setModalMsg('Bus Data Add Successfully.')
        }).catch(err => {
            setLoading(false)
            setModalShow(true)
            setModalMsg('Error happened while add Bus Data !!!')
        })
    }
}


const initializeBusesData = (buses) => {
    return buses.map(bus => {
        let obj = {}
        obj[`bus${bus.ID}Type`] = bus.BusTypeID
        obj[`bus${bus.ID}Brand`] = bus.Brand
        obj[`bus${bus.ID}TNoSeats`] = bus.Number_Of_Seats
        obj[`bus${bus.ID}NoSeatsRow`] = bus.Number_Of_Seats_Per_Raw
        obj[`bus${bus.ID}TNoBuses`] = bus.Total_Number_Of_Buses
        obj[`bus${bus.ID}Image`] = bus.Bus_Layout
        obj[`bus${bus.ID}Notes`] = bus.Notes
        obj[`bus${bus.ID}YearModel`] = bus.YearModel
        obj[`bus${bus.ID}Description`] = bus.Description
        return obj
    })
}

const createBusesFromCompanyData = (company, addBus) => {
    return (company['TransportationCompanyBuses'].map(bus => {
        idx = bus.ID

        return {
            key: bus.ID,
            item: <div key={bus.ID}><br/> <BusCard hideADDBtn={idx < company['TransportationCompanyBuses'].length}
                                                   addBusHandler={() => addBus()}
                                                   hideRemoveBtn={idx === 1}
                                                   busNo={bus.ID}
                                                   busData={bus}
            /></div>
        }
    }))
}
let CForm = (props) => {
    const [busElements, setBusElements] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [modalMsg, setModalMsg] = useState("");

    useEffect(() => {
        if (props.company) {
            setBusElements(createBusesFromCompanyData(props.company, addBus))
            let obj = {}
            initializeBusesData(props.company.TransportationCompanyBuses).forEach(item => obj = {...obj, ...item})
            props.initialize({
                'companyID': props.company.ID,
                "companyName": props.company.Name,
                'companyAddress': props.company.Address,
                'country': props.company.Country,
                'city': props.company.City,
                'companyPhone': props.company.TelephoneNumber,
                'personName': props.company.ContactPerson_Name,
                'personPhone': props.company.ContactPerson_TelephoneNumber,
                'personEmail': props.company.ContactPerson_Email,
                ...obj
            })
        } else {
            addBus()
        }

    }, [props.company]);


    const addBus = () => {
        idx++
        setBusElements(prev => {
                return [...prev, {
                    key: idx,
                    item: <div key={idx}><br/> <BusCard hideADDBtn={idx < busElements.length}
                                                        addBusHandler={() => addBus()}
                                                        hideRemoveBtn={idx === 1}
                                                        busNo={idx}/></div>
                }]
            }
        )
    }


    return (

        loading ?
            <Loader/>
            :
            <Fragment>
                <CModal message={modalMsg} show={modalShow}/>:
                <Form onSubmit={props.handleSubmit(values => {
                    pushResult(values, props.company ? OPERATION_TYPE.put : OPERATION_TYPE.post, busElements, setLoading, setModalShow, setModalMsg,)
                })}>
                    <CompanyCard id={props.company && props.company.Country}/>


                    <BusesContext.Provider value={{buses: busElements, setBuses: setBusElements}}>

                        {busElements.map(item => item.item)}
                    </BusesContext.Provider>
                    <br/>
                    <Row>

                        <Col xs={1}>
                            <Button className={"primary-background"} style={{width: '100%'}} onClick={() => {
                                reset('company')
                            }}>
                                Clear
                            </Button>
                        </Col>

                        <Col xs={1}>
                            <Button className={"primary-background"} style={{width: '100%'}} type="submit">
                                Save
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Fragment>
    );
};

CForm = reduxForm({
    form: 'company',
    validate: values => {
        return {...companyValidate(values)}
    }
})(CForm)
export default CForm;
