import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import styles from "../../styleCss/stylesPages/add/addApartment.module.css";
import { ToastContainer, toast } from "react-toastify";
import { axiosPrivate } from "../../api/axios";
import Loading from "../loading/loading";
import axios from "axios";

const EditDweller = () => {
  const { id } = useParams();
  const [frontSideImage, setFrontSideImage] = useState(null);
  const [backSideImage, setBackSideImage] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState(null);
  const [apartment, setApartment] = useState(null);
  const [gender, setGender] = useState(true);
  const [isRepresent, setRepresent] = useState(true);
  const [disable, setDisable] = useState(false);
  const baseURLApartment = `http://localhost:8080/api/v1/apartment`;
  const baseURLDweller = `http://localhost:8080/api/v1/dweller/` + id;
  const [data, setData] = useState([]);
  const [dweller, setDweller] = useState(null);
  const [status, setStatus] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get(baseURLApartment, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: false,
        })
        .then((resp) => {
          console.log(resp);
          setData(resp.data.data);
        });
      await axios
        .get(baseURLDweller, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: false,
        })
        .then((resp) => {
          console.log(resp.data.data);
          setDweller(resp.data.data);
          // setFrontSideImage(resp.data.data.frontSideImage);
          // setBackSideImage(resp.data.data.backSideImage);
          setApartment(resp.data.data.apartment.id);
          setEmail(resp.data.data.email);
          setGender(resp.data.data.gender);
          setName(resp.data.data.name);
          setStatus(resp.data.data.status);
          setdateOfBirth(formatDate(resp.data.data.dateOfBirth));
        });

      setLoading(false);
    };
    fetchData();
  }, [baseURLDweller]);
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  console.log(formatDate("Sun May 11,2014"));
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
    event.preventDefault();

    var dateOld = new Date(formatDate(dweller.dateOfBirth)).getTime();
    var dateNew = new Date(dateOfBirth).getTime();

    if (
      name == dweller.name &&
      email == dweller.email &&
      frontSideImage == null &&
      backSideImage == null &&
      dateOld - dateNew == 0 &&
      gender == dweller.gender &&
      apartment == dweller.apartment.id &&
      status == dweller.status
    ) {
      alert("you don't change anything");
    } else {
      setDisable(true);
      const accessToken = localStorage.getItem("accessToken");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("frontSideImage", frontSideImage);
      formData.append("backSideImage", backSideImage);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("gender", gender);
      formData.append("isRepresent", isRepresent);
      formData.append("apartmentId", apartment);
      formData.append("status", status);
      axios
        .put("http://localhost:8080/api/v1/dweller/" + id, formData, {
          headers: { Authorization: `Bearer ${accessToken}`,"Content-Type": "multipart/form-data" },
          withCredentials: false,
        })
        .then((response) => {
          console.log(response);
          navigate("/listDwellers");
          notify("Add Successfully!!");
        })
        .catch((error) => {
          console.error(error);
          notify("Add Failed");
        });
    }
  };
  const Cancel = () => {};
  const handleInputChange = (e) => {
    const regexNumber = /^[0-9]*\.?[0-9]*$/;
    const { id, value } = e.target;

    if (id === "name") {
      setName(value);
    }
    if (id === "gender") {
      if (value == "Male") {
        setGender(true);
      } else {
        setGender(false);
      }
    }
    if (id === "isRepresent") {
      if (value == "Yes") {
        setRepresent(true);
      } else {
        setRepresent(false);
      }
    }

    if (id === "email") {
      setEmail(value);
    }
    if (id === "frontSideImage") {
      setFrontSideImage(e.target.files[0]);
    }
    if (id === "backSideImage") {
      setBackSideImage(e.target.files[0]);
    }
    if (id === "dateOfBirth") {
      setdateOfBirth(value);
    }
    if (id === "status") {
      if (value == "Staying") {
        setStatus(true);
      } else {
        setStatus(false);
      }
    }
    if (id === "apartment") {
      setApartment(value);
    }
  };
  return loading ? (
    <Loading />
  ) : (
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
                  <p className={styles.lable}>Citizen Identity Card</p>
                </div>
                <div className={styles.r}>
                  <input
                    className={styles.inputImg}
                    id="frontSideImage"
                    onChange={(e) => handleInputChange(e)}
                    type="file"
                    accept=".png, .jpg, .jpeg"
                  ></input>
                  <input
                    className={styles.inputImg}
                    id="backSideImage"
                    onChange={(e) => handleInputChange(e)}
                    accept=".png, .jpg, .jpeg"
                    type="file"
                  ></input>

                  <div className={styles.conImg}>
                    {" "}
                    {frontSideImage == null ? (
                      <img
                        src={dweller.frontSideImage}
                        className={styles.image}
                        alt="Thumb"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(frontSideImage)}
                        className={styles.image}
                        alt="Thumb"
                      />
                    )}{" "}
                    {backSideImage == null ? (
                      <img
                        src={dweller.backSideImage}
                        className={styles.image2}
                        alt="Thumb"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(backSideImage)}
                        className={styles.image2}
                        alt="Thumb"
                      />
                    )}{" "}
                  </div>
                </div>
              </div>
              <br />
              <br />
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
                  <p className={styles.lable}> Email</p>
                </div>
                <div className={styles.r}>
                  <input
                    type="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    placeholder="Email address"
                    value={email}
                    className={styles.inputText}
                    onChange={(e) => handleInputChange(e)}
                    id="email"
                    required
                  ></input>
                </div>
              </div>
              <div className={styles.fl}>
                <div className={styles.l}>
                  <p className={styles.lable}> Date Of Birth</p>
                </div>
                <div className={styles.r}>
                  <input
                    type="date"
                    className={styles.drop}
                    value={dateOfBirth}
                    onChange={(e) => handleInputChange(e)}
                    id="dateOfBirth"
                  ></input>
                </div>
              </div>
              <div className={styles.fl}>
                <div className={styles.l}>
                  <p className={styles.lable}> Gender</p>
                </div>
                <div className={styles.r}>
                  <select
                    id="gender"
                    className={styles.drop}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Gender"
                  >
                    <option
                      value="Male"
                      selected={gender === true ? true : false}
                    >
                      Male
                    </option>
                    <option
                      value="Female"
                      selected={gender === false ? true : false}
                    >
                      Female
                    </option>
                  </select>
                </div>
              </div>
              <div className={styles.fl}>
                <div className={styles.l}>
                  <p className={styles.lable}> Is representator?</p>
                </div>
                <div className={styles.r}>
                  <select
                    id="isRepresent"
                    className={styles.drop}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="isRepresent"
                  >
                    <option
                      value="Yes"
                      selected={isRepresent === true ? true : false}
                    >
                      Yes
                    </option>
                    <option
                      value="No"
                      selected={isRepresent === false ? true : false}
                    >
                      No
                    </option>
                  </select>
                </div>
              </div>
              <div className={styles.fl}>
                <div className={styles.l}>
                  <p className={styles.lable}> Aparment</p>
                </div>
                <div className={styles.r}>
                  <select
                    className={styles.drop}
                    onChange={(e) => handleInputChange(e)}
                    id="apartment"
                    placeholder="apartment"
                    defaultValue={apartment}
                  >
                    <option value="null">Select Apartment</option>
                    {data?.map((item) => (
                      <option value={item.id}>{item.number}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className={styles.fl}>
                <div className={styles.l}>
                  <p className={styles.lable}> Status</p>
                </div>
                <div className={styles.r}>
                  <select
                    id="status"
                    className={styles.drop}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Status"
                  >
                    <option
                      value="Staying"
                      selected={status === true ? true : false}
                    >
                      Staying
                    </option>
                    <option
                      value="Leaving"
                      selected={status === false ? true : false}
                    >
                      Leaving
                    </option>
                  </select>
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
export default EditDweller;
