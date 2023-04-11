import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


import styles from "../styleCss/stylesComponents/time.module.css";

export const LogoutButton = () => {
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/login")
    };

    return (
        <label
            className={styles.label2}
            onClick={() => {
                handleLogout();
            }}
        >
            Log out
        </label>
    );
};
