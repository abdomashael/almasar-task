import React from 'react';
import PropTypes from 'prop-types';
import {Col, Row, Button} from "react-bootstrap";
import cx from "classnames";
import styles from "./CButton.module.scss";

const CButton = ({haveIcon, icon, children, onClick, size}) => {
    return (
        <Button variant="primary" onClick={onClick} className={cx("primary-background", styles.button)}
                style={{width: size==='s'?'%50 ':size==='m'?'70% ':size==='l'&&'100%'}}
                size='sm'
                active>
            <Row xs={12}>
                {haveIcon && <Col xs={2}>{icon}</Col>}
                <Col>{children}</Col>
            </Row>
        </Button>
    );
};

CButton.propTypes = {
    haveIcon: PropTypes.bool.isRequired,
    size: PropTypes.oneOf(['s', 'm', 'l']).isRequired,
    icon: function (props, propName, componentName) {
        if ((props['haveIcon'] === true && (props[propName] === undefined || typeof (props[propName]) != 'object'))) {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. Validation failed.'
            );
        }
    },
}
export default CButton;
