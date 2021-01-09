//libraries
import React, {Fragment} from "react";
//styles
import styles from "./Loading.scss";

const Loading = ({className}) => {

    return (
        <Fragment>
            <svg className={`${styles.spinner} ${className}`} viewBox="0 0 44 44">
                <circle className={styles.path} cx="22" cy="22" r="20" fill="none" strokeWidth="4" />
            </svg>
        </Fragment>
    )
};

export default Loading;
