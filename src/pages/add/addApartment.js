import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import styles from "../../styleCss/stylesPages/add/addApartment.module.css";
import { ToastContainer, toast } from "react-toastify";
import { axiosPrivate } from "../../api/axios";
import axios from "axios";

const AddApartment = () => {
  const [frontSideImage, setFrontSideImage] = useState(null);
  const [backSideImage, setBackSideImage] = useState(null);
  const [name, setName] = useState(null);
  const [area, setArea] = useState("");
  const [number, setNumber] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState(null);
  const [numOfRoom, setNumOfRoom] = useState("");
  const [numOfDweller, setNumOfDweller] = useState("");
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
        "http://localhost:8080/api/v1/apartment/insert",
        {
          name: name,
          number: number,
          area: area,
          price: price,
          description: description,
          numOfRoom: numOfRoom,
          status: false,
        },
        {
          headers: 
          { 
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json" 
          },
          withCredentials: false
        }
      )
      .then((response) => {
        console.log(response);
        navigate("/listApartments");
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
    if (id === "area") {
      if (value === "" || regexNumber.test(value)) setArea(value);
    }
    if (id === "number") {
      if (value === "" || regexNumber.test(value)) setNumber(value);
    }
    if (id === "price") {
      if (value === "" || regexNumber.test(value)) setPrice(value);
    }
    if (id === "description") {
      setDescription(value);
    }
    if (id === "numOfRoom") {
      if (value === "" || regexNumber.test(value)) setNumOfRoom(value);
    }
    if (id === "numOfDweller") {
      if (value === "" || regexNumber.test(value)) setNumOfDweller(value);
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

              {/* <div className={styles.fl}>
                            <div className={styles.l}>
                                <p className={styles.lable}>Citizen Identity Card</p>
                            </div>
                            <div className={styles.r}>
                                <input
                                    className={styles.inputImg}
                                    id="frontSideImage"
                                    onChange={(e) => handleInputChange(e)}
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    required
                                ></input>
                                <input
                                    className={styles.inputImg}
                                    id="backSideImage"
                                    onChange={(e) => handleInputChange(e)}
                                    accept=".png, .jpg, .jpeg"
                                    type="file"
                                    required
                                ></input>

                                <div className={styles.conImg}>
                                    {" "}
                                    {frontSideImage && (
                                        <img src={URL.createObjectURL(frontSideImage)} className={styles.image} alt="Thumb" />
                                    )}{" "}
                                    {backSideImage && <img src={URL.createObjectURL(backSideImage)} className={styles.image2} alt="Thumb" />}{" "}

                                </div>
                            </div>
                        </div> */}

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
                  <p className={styles.lable}> Number</p>
                </div>
                <div className={styles.r}>
                  <input
                    id="number"
                    type="text"
                    pattern="^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$"
                    placeholder="Enter Number"
                    className={styles.inputText}
                    value={number}
                    onChange={(e) => handleInputChange(e)}
                    required
                  ></input>
                </div>
              </div>
              <div className={styles.fl}>
                <div className={styles.l}>
                  <p className={styles.lable}> Area</p>
                </div>
                <div className={styles.r}>
                  <input
                    id="area"
                    type="text"
                    pattern="^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$"
                    placeholder="Enter Area"
                    className={styles.inputText}
                    value={area}
                    onChange={(e) => handleInputChange(e)}
                    required
                  ></input>
                </div>
              </div>
              <div className={styles.fl}>
                <div className={styles.l}>
                  <p className={styles.lable}> Price</p>
                </div>
                <div className={styles.r}>
                  <input
                    id="price"
                    type="text"
                    pattern="^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$"
                    placeholder="Enter Price"
                    className={styles.inputText}
                    value={price}
                    onChange={(e) => handleInputChange(e)}
                    required
                  ></input>
                </div>
              </div>
              <div className={styles.fl}>
                <div className={styles.l}>
                  <p className={styles.lable}>Number Of Room</p>
                </div>
                <div className={styles.r}>
                  <input
                    id="numOfRoom"
                    type="text"
                    pattern="^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$"
                    placeholder="Enter Number Of Room"
                    className={styles.inputText}
                    value={numOfRoom}
                    onChange={(e) => handleInputChange(e)}
                    required
                  ></input>
                </div>
              </div>

              {/* <div className={styles.fl}>
                            <div className={styles.l}>
                                <p className={styles.lable}>View Property Time</p>
                            </div>
                            <div className={styles.r}>
                                <DatePicker
                                    style={{ width: "746px" }}
                                    id="viewPropertyTime"
                                    // onChange={(e) => handleInputChange(e)}
                                    onChange={setViewPropertyTime}
                                    ClassName={styles.datePicker}
                                    value={viewPropertyTime}
                                    // onChange={setValue}
                                    range
                                    numberOfMonths={2}
                                    format="MM/DD/YYYY HH:mm:ss"
                                    plugins={[<TimePicker />]}
                                />
                            </div>
                        </div> */}
              <div className={styles.fl}>
                <div className={styles.l}>
                  <p className={styles.lable}> Description</p>
                </div>
                <div className={styles.r}>
                  <textarea
                    id="description"
                    pattern="^\s*([^\s]\s*){0,}$"
                    placeholder="Enter Description"
                    value={description}
                    className={styles.textarea}
                    onChange={(e) => handleInputChange(e)}
                    required
                  ></textarea>
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
export default AddApartment;
