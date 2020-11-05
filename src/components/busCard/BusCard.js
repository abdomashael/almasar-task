import React, {useContext, useEffect, useState} from 'react';
import {Row, Card, Col} from "react-bootstrap";
import styles from "./BusCard.module.scss";
import {Field} from "redux-form";
import {Form as BForm} from "react-bootstrap";
import cx from "classnames";
import CButton from "../button/CButton";
import DropZoneField from "./DropZoneField";
import PropTypes from "prop-types";
import {BusesContext} from "../form/CForm";
import {connect} from "react-redux";
import {ADD_COUNTRIES, ADD_VEHICLE_TYPES} from "../../redux/actions";
import {GetVehicleType} from "../../utils/api/Lookup";


const renderInput = ({input, meta, label}, selector, list) => {

    return (
        <BForm.Group>
            <BForm.Label>{label}</BForm.Label>
            {selector ?
                <BForm.Control as={'select'} {...input}>
                    {selector && list.map(item => <option value={item.ID}
                                                          selected={item.ID == input.value}>{item.Value}</option>)}
                </BForm.Control> : <BForm.Control  {...input}/>
            }
            <BForm.Text className={styles.error}>
                {meta.touched && meta.error}
            </BForm.Text>

        </BForm.Group>)
}

const imageIsRequired = value => (!value ? "Required" : undefined);

const validateField = (value, allValues, props) => {

    if (!value) return "Required"
}


const BusCard = ({
                     busNo,
                     hideADDBtn,
                     busData,
                     addBusHandler,
                     hideRemoveBtn,
                     vehicleTypes,
                     setVehicleTypes
                 }) => {
    const [imageFile, setImageFile] = useState([]);

    const {buses, setBuses} = useContext(BusesContext);

    useEffect(() => {
        if(!vehicleTypes){
            GetVehicleType().then(res=>setVehicleTypes(res.data.Data))
        }
    }, []);

    const handleOnDrop = (newImageFile, onChange) => {
        const imageFile = {
            file: newImageFile[0],
            name: newImageFile[0].name,
            preview: URL.createObjectURL(newImageFile[0]),
            size: newImageFile[0].size
        };
        setImageFile([imageFile])
        onChange(imageFile)
    };

    const resetField = () => {
        setImageFile([])
    }

    return (
        <Card className={cx(styles.card, 'shadow')}>
            <Card.Body>
                <Card.Title className={styles.title}>Bus {busNo} Data</Card.Title>
                <Card.Text>
                    <Row>
                        <Col xs={2}>
                            <Field name={`bus${busNo}Type`} label={'Vehicle type 1'}
                                   validate={validateField}
                                   component={({input, meta, label}) => {
                                       return renderInput({
                                           input,
                                           meta,
                                           label
                                       }, true, vehicleTypes)
                                   }}/>
                        </Col>
                        <Col xs={2}>
                            <Field name={`bus${busNo}Brand`} label={'Brand'}
                                   validate={validateField}
                                   value={busData && busData.Brand}
                                   component={({input, meta, label}) => renderInput({
                                       input,
                                       meta,
                                       label,
                                   }, false)}/>
                        </Col>

                        <Col xs={2}>
                            <Field name={`bus${busNo}YearModel`} label={'Year Model'}
                                   validate={validateField}
                                   component={({input, meta, label}) => {

                                       return renderInput({
                                           input,
                                           meta,
                                           label
                                       }, false)
                                   }}/>
                        </Col>

                        <Col xs={4}>
                            <Field name={`bus${busNo}Description`} label={'Description'}
                                   validate={validateField}
                                   component={({input, meta, label}) => renderInput({
                                       input,
                                       meta,
                                       label
                                   }, false)}/>
                        </Col>
                    </Row>

                    <Row>
                        <Col xs={6}>
                            <Row>

                                <Col xs={4}>
                                    <Field name={`bus${busNo}TNoSeats`} label={'Total Number of Seats'}
                                           validate={validateField}
                                           component={({input, meta, label}) => renderInput({
                                               input,
                                               meta,
                                               label
                                           }, false)}/>
                                </Col>

                                <Col xs={4}>
                                    <Field name={`bus${busNo}NoSeatsRow`} label={'Number of Seats per Row'}
                                           validate={validateField}
                                           component={({input, meta, label}) => renderInput({
                                               input,
                                               meta,
                                               label
                                           }, false,)}/>
                                </Col>


                                <Col xs={4}>
                                    <Field name={`bus${busNo}TNoBuses`} label={'Total Num. of Buses'}
                                           validate={validateField}
                                           component={({input, meta, label}) => renderInput({
                                               input,
                                               meta,
                                               label
                                           }, false)}/>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={12}>
                                    <Field name={`bus${busNo}Notes`} label={'Notes'}
                                           validate={validateField}
                                           component={({input, meta, label}) => renderInput({
                                               input,
                                               meta,
                                               label
                                           }, false)}/>
                                </Col>

                            </Row>

                        </Col>

                        <Col xs={2}>
                            <Field
                                name={`bus${busNo}Image`}
                                component={DropZoneField}
                                type="file"
                                imagefile={imageFile}
                                handleOnDrop={handleOnDrop}
                                resetField={resetField}
                                validate={[imageIsRequired]}
                            />


                        </Col>
                    </Row>
                    <Row>

                        {!hideADDBtn && <Col xs={1}>
                            <CButton size={'l'} onClick={addBusHandler} haveIcon={false}>
                                Add
                            </CButton>

                        </Col>}
                        {!hideRemoveBtn && <Col xs={1}>
                            <CButton size={'l'} onClick={() => {
                                let temp = buses.filter(bus => bus.key !== busNo)
                                console.log(buses, temp)
                                setBuses(temp)
                            }} haveIcon={false}>
                                Remove
                            </CButton>

                        </Col>}
                    </Row>

                </Card.Text>
            </Card.Body>
        </Card>
    );
};

function checkType(props, propName, componentName, dependProp) {
    if ((props[dependProp] === false && (props[propName] === undefined || typeof (props[propName]) != 'function'))) {
        return new Error(
            'Invalid prop `' + propName + '` supplied to' +
            ' `' + componentName + '`. Validation failed.'
        );
    }
}

BusCard.prototype = {
    busNo: PropTypes.number.isRequired,
    hideADDBtn: PropTypes.bool,
    addBusHandler: (props, propName, componentName) => {
        checkType(props, propName, componentName, 'hideADDBtn')
    },
    hideRemoveBtn: PropTypes.bool,
    busData: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        vehicleTypes: state.general.vehicleTypes,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        setVehicleTypes: (vehicleTypes) =>
            dispatch({type: ADD_VEHICLE_TYPES, payload: {vehicleTypes: vehicleTypes}}),

    };
};
export default connect(mapStateToProps,mapDispatchToProps())(BusCard);
