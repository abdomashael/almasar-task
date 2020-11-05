import React from 'react';
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const CNavbar = () => {
    return (
        <div>
            <Navbar fixed={'top'} className="primary-background" variant="dark">
                <Link to={'/'}>
                    <Navbar.Brand>Transportation</Navbar.Brand>
                </Link>
            </Navbar>
        </div>
    );
};

export default CNavbar;
