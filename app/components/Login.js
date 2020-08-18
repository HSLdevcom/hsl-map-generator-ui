/* eslint-disable jsx-a11y/no-static-element-interactions*/

import React from "react";
import styles from "./Login.css";

const LoginIcon = () => (
    <div className={styles.loginIcon}>
        <svg
            className="line-icon"
            version="1.1"
            id="Layer_1"
            x="0px"
            y="0px"
            viewBox="0 0 448 512"
            height="1em"
            preserveAspectRatio="xMidYMid meet">
            <g fill="#3e3e3e">
                <path
                    d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
                    id="Fill-1"
                />
            </g>
        </svg>
    </div>
);

const openLoginForm = () => {
    window.location.replace(
        `https://hslid-uat.cinfra.fi/openid/auth?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code&scope=email+https://oneportal.trivore.com/scope/groups.readonly`
    );
};
const LoginComponent = () => {
    return (
        <div>
            <div className={styles.root}>
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <div className={styles.logo} alt="HSL Logo" />
                        <div className={styles.title}>
                            HSL Karttageneraattori
                        </div>
                    </div>
                    <div className={styles.loginButton} onClick={openLoginForm}>
                        <LoginIcon />
                        <div className={styles.loginText}>
                            Kirjaudu (HSL ID)
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
