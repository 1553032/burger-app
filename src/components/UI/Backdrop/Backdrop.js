import React from 'react';
import classes from './Backdrop.module.css';

const backdrop = (props) => {
    return (
        <React.Fragment>
            {props.show ? <div
                className={classes.Backdrop}
                onClick={props.cancel}
            ></div> : null}
        </React.Fragment>
    )
}

export default backdrop;