//libraries
import React, {Fragment} from "react";
//styles
import styles from "./App.scss";

const App = () => {
    console.log(styles);
    return (
        <Fragment>
            <div className={styles.berkBerk}>A local test2 environment.</div>
        </Fragment>
    )
};

export default App;