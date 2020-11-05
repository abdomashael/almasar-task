import React from 'react';
import styles from './Loader.module.css';
import {Spinner} from "react-bootstrap";

const Loader = () => {
    return (
        <div className={styles.loaderPage}>

            <div>
                <Spinner animation="grow" className={'primary-background'}/>
            </div>
            <label> loading Data ...</label>
        </div>
    );
};

export default Loader;
