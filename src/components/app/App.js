import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect} from "react";
import CNavbar from "../navbar/Navbar";
import Home from "../../pages/home";
import cx from "classnames";
import Details from "../../pages/details";
import {connect} from "react-redux";

import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {ADD_COUNTRIES, ADD_VEHICLE_TYPES} from "../../redux/actions";
import {GetCountries, GetVehicleType} from "../../utils/api/Lookup";
import CModal from "../CModal";

function App(props) {

    const getData =async ()=>{

       let res = await GetCountries()
        props.setCountries(res.data.Data)

        res = await GetVehicleType()
        props.setVehicleTypes(res.data.Data)
    }
    useEffect(() => {
        getData();
    }, []);


    return (
        <div>
            <Router>
                <CNavbar/>
                <div className={cx("App", 'm-4 ml-5 pt-5')}>
                    <Switch>
                        <Route path="/new">
                            <Details edit={false}/>
                        </Route>
                        <Route path="/edit/:id">
                            <Details edit={true}/>
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>

    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        setCountries: (countries) =>
            dispatch({type: ADD_COUNTRIES, payload: {countries: countries}}),
        setVehicleTypes: (vehicleTypes) =>
            dispatch({type: ADD_VEHICLE_TYPES, payload: {vehicleTypes: vehicleTypes}}),

    };
};

export default connect(null, mapDispatchToProps)(App);
