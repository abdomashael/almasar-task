import {Card, Row} from "react-bootstrap";
import cx from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons/faImage";
import styles from "./BusCard.module.scss";
import {faCloud} from "@fortawesome/free-solid-svg-icons";
import DropZone from "react-dropzone";
import React from "react";
import CButton from "../button/CButton";

const ImagePreview = ({imageFile}) =>
    imageFile.map(({name, preview, size}) => (
        <Row className={'m-auto'} key={name}>
            <Row>
                <img height={'85px'} width={'200px'} src={preview} alt={name}/>
            </Row>
            <Row className="details">
                {name} - {(size / 1024000).toFixed(2)}MB
            </Row>
        </Row>
    ));


const Placeholder = ({getInputProps, getRootProps, error, touched}) => (
    <div
        {...getRootProps()}
        className={`placeholder-preview ${error && touched ? "has-error" : ""}`}
    >
        <input {...getInputProps()} />
        <Card className={cx('shadow-sm', 'm-auto')}>
            <Card.Body className='m-auto'>
                <Row className={'m-auto'}>
                    <label>Vehicle Layout</label>
                </Row>
                <Row className={'m-auto'}>
                    <FontAwesomeIcon className={'m-auto'} size="4x" icon={faImage}/>
                </Row>
                <Row className={'m-auto'}>
                    <label className={styles.uploadLabel} htmlFor='upload'><FontAwesomeIcon size="lg" icon={faCloud}
                                                                                            inverse/> upload</label>
                </Row>
            </Card.Body>
        </Card>
    </div>
);

const ShowError = ({error, touched}) =>
    touched && error ? (
        <div className={styles.error}>
            {error}
        </div>
    ) : null;


const DropZoneField = ({
                           handleOnDrop,
                           resetField,
                           input: {onChange},
                           imagefile,
                           meta: {error, touched}
                       }) => (
    <div className="preview-container">
        <DropZone
            accept="image/jpeg, image/png, image/gif, image/bmp"
            className="upload-container"
            onDrop={file => handleOnDrop(file, onChange)}
            multiple={false}
        >
            {props =>
                imagefile && imagefile.length > 0 ? (
                    <div>
                        <ImagePreview imageFile={imagefile}/>
                        <CButton
                            onClick={()=>{
                                resetField()
                            }}
                         haveIcon={false} size={'m'}>
                            Clear
                        </CButton>
                    </div>
                ) : (
                    <Placeholder {...props} error={error} touched={touched}/>
                )
            }
        </DropZone>
        <ShowError error={error} touched={touched}/>
    </div>
);

export default DropZoneField
