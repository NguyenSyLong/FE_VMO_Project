import React, { useEffect, useRef, useState } from "react";
import styles from "../../styleCss/stylesPages/login/login.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const eye = <FontAwesomeIcon icon={faEye} />;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const errorRef = useRef();

  const togglePasswordVisibility = () => {
    setShowPassword(showPassword ? false : true);
  };
  useEffect(() => {
    setErrorMessage("  ");
  }, [username, password]);

  const handleSubmit = (event) => {
    localStorage.removeItem("accessToken");
    event.preventDefault();
    axios
      .post(
        "http://localhost:8080/api/v1/auth/authenticate",
        {
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.setItem("accessToken", response.data.token);
        navigate("/listApartments");
        
        alert("Login Successfully!!");
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Login Failed");
        errorRef.current.focus();
      });
  };

  return (
    <div className="cover">
      <div className={styles.col}>
        <form onSubmit={handleSubmit}>
          <div className={styles.col1}>
            <p className={styles.wel}>MANAGE APARTMENT </p>

            <p className={styles.use}>Username</p>
            <input
              className={styles.ip}
              type="text"
              id="username"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              required
            ></input>
            <p className={styles.use}>Password</p>
            <input
              className={styles.ip}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
            <i className={styles.eye} onClick={togglePasswordVisibility}>
              {eye}
            </i>
            <br />
            <br />

            <p
              ref={errorRef}
              className={errorMessage ? styles.errorMessage : styles.offscreen}
              aria-live="assertive"
            >
              {errorMessage}
            </p>
            <input className={styles.btn} type="submit" value="Sign in" />
            <p>
              <Link className={styles.forget} to="/forgotPassword">
                Forget password?
              </Link>
            </p>
          </div>
          <div className={styles.col2}>
            <div className={styles.conLink}>
              <Link to="/" className={styles.L}>
                Help
              </Link>
              <Link to="/aboutUs" className={styles.L}>
                About us
              </Link>
              <Link to="/register" className={styles.L}>
                Sign Up
              </Link>
              <Link to="/" className={styles.L}>
                <AiFillHome className={styles.i} />
              </Link>
            </div>
            <img
              className={styles.img}
              src="https://s3-alpha-sig.figma.com/img/0e53/a3c3/1ec31eaf8dbb9b3eb424c5760613c4c9?Expires=1681084800&Signature=ZTkyGbU1DA0-YLiYmgya3d26t6KzL4w9HvBcaCl~x-VjzZhZGjuFWnwlf2~g~MZrapB8BHgbf7WPSpeJN80xLcpkD~FAAZ9u7xvU9BkG6T7pVXPqD2hVId-YraEgMdMoFAOHeCD6k6g7H2Dc8GTLv6ZpiXkV6foY4LpDTu6w~sifjeDNNgghNKedoh90sOhZXUhHHJr7aT~mTHUlxCseocxRW1z9D-2kdd6MrKKDBtZ6XS0cvUQEHPlTWp72l94viGOHLKVQL8Y4k6aDa1-J5qU0HGNVcs5ddUybFe0R1blw9xyzud1~nxAy4OYCf6uG4dU0kBYhIbxOsnOXdZMDkg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt="img"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
