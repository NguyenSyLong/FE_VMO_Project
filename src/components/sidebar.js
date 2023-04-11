import styles from "../styleCss/stylesComponents/sidebar.module.css";

import { Link, useNavigate } from "react-router-dom";
import { BiBookHeart, BiDizzy, BiDonateHeart, BiNews } from "react-icons/bi";

// import { useFetchData, useFetchSession } from "../../hooks/useFetch";
// import useAuth from "../../hooks/useAuth";

const Sidebar = () => {
    const navigate = useNavigate();
    // const { auth } = useAuth();
    // console.log(auth);
    // // const [loading, data, error] = useFetchData('/session')
    // const { loading: loading2, data: data2, error } = useFetchData("/session");
    return (
        <>
            <div className={styles.container}>
                <img className={styles.avt} src="https://img.freepik.com/free-icon/user_318-875902.jpg" alt="img" />
                <p className={styles.txt2}>MANAGER</p>
                <p
                    className={styles.txt2}
                    onClick={() => {
                        navigate(`/profileAdmin/`);
                    }}
                >
                    {}
                </p>
                <br />
                <br />
                <BiBookHeart className={styles.icon} />
                <Link to="/listApartments" className={styles.txt}>
                    Manage Apartment
                </Link>
                <br />
                <br />
                <BiDizzy className={styles.icon} />
                <Link to="/listDwellers" className={styles.txt}>
                    Manage Dwellers
                </Link>
                <br />
                <br />
                <BiDonateHeart className={styles.icon} />
                <Link to="/listBills" className={styles.txt}>
                    Manage Bills
                </Link>
                <br />
                <br />
                <BiNews className={styles.icon} />
                <Link to="/ListServiceFee" className={styles.txt}>
                    Manage Fee
                </Link>{" "}   
                <br />
            </div>
        </>
    );
};

export default Sidebar;
