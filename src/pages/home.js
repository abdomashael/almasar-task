import React from 'react';
import {Row, Col, Navbar} from "react-bootstrap";
import CButton from "../components/button/CButton";
import CTable from "../components/table/CTable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <Col>
            <Row xs={7}>
                <Link to={'/new'}>
                    <CButton haveIcon={true} icon={<FontAwesomeIcon size="lg" icon={faPlus}/>} onClick={() => {
                    }} size={'l'}>
                        Add Transportations
                    </CButton>
                </Link>
            </Row>
            <br/>
            <Row>
                <CTable/>
            </Row>
        </Col>
    );
};

export default Home;
