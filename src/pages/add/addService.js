import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import styles from "../../styleCss/stylesPages/add/addService.module.css";
import { ToastContainer, toast } from "react-toastify";
import { axiosPrivate } from "../../api/axios";
import axios from "axios";

const AddService = () => {

  const [name, setName] = useState(null);
  const [unitPrice, setUnitPrice] = useState("");

  const [disable, setDisable] = useState(false);

  const navigate = useNavigate();
  const notify = (message) => {
    toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
};
  const handleSubmit = (event) => {
    const accessToken = localStorage.getItem("accessToken");
    event.preventDefault();
    setDisable(true);
    axios
      .post(
        "http://localhost:8080/api/v1/service_fee/insert",
        {
          name: name,
          unitPrice:unitPrice
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      )
      .then((response) => {
        console.log(response);
        navigate("/listServiceFee");
        notify("Add Successfully!!");
      })
      .catch((error) => {
        console.error(error);
        notify("Add Failed");

      });
  };
  const Cancel = () => {};
  const handleInputChange = (e) => {
    const regexNumber = /^[0-9]*\.?[0-9]*$/;
    const { id, value } = e.target;

    if (id === "name") {
      setName(value);
    }
    if (id === "unitPrice") {
      if (value === "" || regexNumber.test(value)) setUnitPrice(value);
    }


    // if(id==="frontSideImage"){

    // }
    // if(id==="backSideImage"){

    // }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={styles.root}>
          <Sidebar />
          <NavBar />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Same as */}
          <ToastContainer />
          <div className={styles.info}>
            <div>
              <p className={styles.title}>Basic Information</p>


              <div className={styles.fl}>
                <div className={styles.l}>
                  <p className={styles.lable}> Name</p>
                </div>
                <div className={styles.r}>
                  <input
                    id="name"
                    type="text"
                    // pattern="^\s*([^\s]\s*){0,100}$"
                    placeholder="Enter Name"
                    className={styles.inputText}
                    value={name}
                    onChange={(e) => handleInputChange(e)}
                    required
                  ></input>
                </div>
              </div>
              <div className={styles.fl}>
                <div className={styles.l}>
                  <p className={styles.lable}> Unit Price</p>
                </div>
                <div className={styles.r}>
                  <input
                    id="unitPrice"
                    type="text"
                    pattern="^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$"
                    placeholder="Enter Unit Price"
                    className={styles.inputText}
                    value={unitPrice}
                    onChange={(e) => handleInputChange(e)}
                    required
                  ></input>
                </div>
              </div>




            </div>
          </div>

          <div className={styles.btn}>
            <input
              className={styles.btnSave}
              type="submit"
              value="Save"
              style={disable ? { backgroundColor: "red" } : {}}
              disabled={disable}
            ></input>

            <input
              className={styles.btnCancel}
              type="button"
              disabled={disable}
              value="Cancel"
              onClick={Cancel}
            ></input>
          </div>
        </div>
      </form>
    </>
  );
};
export default AddService;
