/* eslint-disable jsx-a11y/no-static-element-interactions*/

import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import styles from "./Login.css";
import InfoIcon from "./icons/InfoIcon";
import LoginIcon from "./icons/LoginIcon";

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "#ffffffe6",
        color: "#3e3e3e",
        boxShadow: theme.shadows[1],
        "font-family":
            "Gotham Rounded SSm A, Gotham Rounded SSm B, Arial, Georgia, Serif",
        "font-weight": 400,
        fontSize: 11
    }
}))(Tooltip);

const openLoginForm = () => {
    window.location.replace(
        `https://hslid-uat.cinfra.fi/openid/auth?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=email+https://oneportal.trivore.com/scope/groups.readonly`
    );
};

const LoginComponent = () => {
    return (
        <div className={styles.root}>
            <div className={styles.wrapper}>
                <LightTooltip
                    title={
                        <React.Fragment>
                            Käytä nimiavaruuteen kirjattua tunnusta. <br />
                            {`Nimiavaruus: ${process.env.NAMESPACE}`}
                        </React.Fragment>
                    }
                    placement="right-end">
                    <div className={styles.infoWrapper}>
                        <InfoIcon />
                    </div>
                </LightTooltip>
                <div className={styles.header}>
                    <div className={styles.logo} alt="HSL Logo" />
                    <div className={styles.title}>HSL Karttageneraattori</div>
                </div>
                <div className={styles.loginButton} onClick={openLoginForm}>
                    <LoginIcon />
                    <div className={styles.loginText}>Kirjaudu (HSL ID)</div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
