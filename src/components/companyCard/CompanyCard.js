import React, {useEffect, useState} from 'react';
import {Row, Card, Col} from "react-bootstrap";
import styles from "./CompanyCard.module.scss";
import {Field} from "redux-form";
import {Form as BForm} from "react-bootstrap";
import {emailIsValid} from "../../utils/emailIsValid";
import cx from "classnames";
import {connect} from "react-redux";
import {GetCities, GetCountries} from "../../utils/api/Lookup";
import {ADD_COUNTRIES, ADD_VEHICLE_TYPES} from "../../redux/actions";


export const companyValidate = values=>{
    const errors={}

    if (!values.companyID) errors.companyID='Required'
    if (!values.companyAddress) errors.companyAddress='Required'
    if (!values.country) errors.country='Required'
    if (!values.city) errors.city='Required'
    if (!values.companyPhone) errors.companyPhone='Required'
    if (!values.personName) errors.personName='Required'
    if (!values.personPhone) errors.personPhone='Required'
    if (!values.personEmail) errors.personEmail='Required'
    else if (!emailIsValid(values.personEmail)) errors.personEmail='Invalid Email'

    return errors
}

const renderInput = ({input, meta, label}, selector, list) =>
    <BForm.Group controlId="formBasicEmail">
        <BForm.Label>{label}</BForm.Label>
        {selector ?
            <BForm.Control as={'select'} {...input} >
                {selector &&list.length>0&& list.map(item => <option value={item.ID} selected={item.ID==input.value}>{item.Value}</option>)}
            </BForm.Control> : <BForm.Control {...input}/>
        }
        <BForm.Text className={styles.error} >
            { meta.touched&&meta.error}
        </BForm.Text>

    </BForm.Group>
const CompanyCard = ({countries,id,setCountries}) => {
    const [cities,setCurrentCities]=useState([])

    const setCities =async (countryId)=>{
       const res = await GetCities(countryId)
        setCurrentCities(res.data.Data)
    }

    useEffect(()=>{
        if (countries.length>0) {
            setCities(id ? countries.filter(c => c.ID === id)[0].ID : countries[0].ID)
        }else {
            GetCountries().then(res=>setCountries(res.data.Data))
        }
        },[countries,id])

    return (
        <Card className={cx(styles.card,'shadow')}>
            <Card.Body>
                <Card.Title className={styles.title}>Company Data</Card.Title>
                <Card.Text>
                    <Row>
                        <Col xs={2}>
                            <Field name={'companyID'} label={'Company ID #'}
                                   component={({input, meta, label}) => renderInput({
                                       input,
                                       meta,
                                       label
                                   }, false)}/>
                        </Col>
                        <Col xs={2}>
                            <Field name={'companyName'} label={'Company Name'}
                                   component={({input, meta, label}) => renderInput({
                                       input,
                                       meta,
                                       label
                                   }, false)}/>
                        </Col>
                        <Col xs={2}>
                            <Field name={'companyAddress'} label={'Company Address'}
                                   component={({input, meta, label}) => renderInput({
                                       input,
                                       meta,
                                       label
                                   }, false)}/>
                        </Col>

                        <Col xs={2}>
                            <Field name={'country'} label={'Country'} onChange={(e,newValue)=>setCities(newValue)} component={({input, meta, label}) => renderInput({
                                input,
                                meta,
                                label
                            }, true, countries&&countries)}/>
                        </Col>

                        <Col xs={2}>
                            <Field name={'city'} label={'City'} component={({input, meta, label}) => renderInput({
                                input,
                                meta,
                                label
                            }, true, cities)}/>
                        </Col>
                        <Col xs={2}>
                            <Field name={'companyPhone'} label={'Company Telephone Num.'}
                                   component={({input, meta, label}) => renderInput({
                                       input,
                                       meta,
                                       label
                                   }, false)}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <Field name={'personName'} label={'Contact Person Name'}
                                   component={({input, meta, label}) => renderInput({
                                       input,
                                       meta,
                                       label
                                   }, false)}/>
                        </Col>
                        <Col xs={2}>
                            <Field name={'personPhone'} label={'Contact Person Tele. Num.'}
                                   component={({input, meta, label}) => renderInput({
                                       input,
                                       meta,
                                       label
                                   }, false)}/>
                        </Col>

                        <Col xs={2}>
                            <Field name={'personEmail'} label={'Contact Person Email'}
                                   component={({input, meta, label}) => renderInput({
                                       input,
                                       meta,
                                       label
                                   }, false, [])}/>
                        </Col>

                    </Row>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

const mapStateToProps = (state) => {
    return {
        countries: state.general.countries,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCountries: (countries) =>
            dispatch({type: ADD_COUNTRIES, payload: {countries: countries}}),
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(CompanyCard);
