import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import styles from "../../styleCss/stylesPages/add/addApartment.module.css";
import { ToastContainer, toast } from "react-toastify";
import { axiosPrivate } from "../../api/axios";
import axios from "axios";

const AddDweller = () => {
  const [frontSideImage, setFrontSideImage] = useState(null);
  const [backSideImage, setBackSideImage] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState(null);
  const [apartment, setApartment] = useState(null);
  const [gender, setGender] = useState("Male");
  const [represent, setRepresent] = useState("No");
  const [disable, setDisable] = useState(false);
  const baseURL = `http://localhost:8080/api/v1/apartment`;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      setLoading(true);
      await axios.get(baseURL,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }).then((resp) => {
        console.log(resp);
        setData(resp.data.data);
      });

      setLoading(false);
    };
    fetchData();
  }, [baseURL]);

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
    setDisable(true);
    const formData = new FormData();
    formData.append("name",name);
    formData.append("email",email);
    formData.append("frontSideImage",frontSideImage);
    formData.append("backSideImage",backSideImage);
    formData.append("dateOfBirth",dateOfBirth);
    if(gender=="Male"){
      formData.append("gender",true);
    }else{
      formData.append("gender",false);
    }
    if(represent=="Yes"){
      formData.append("isRepresent",true);
    }else{
      formData.append("isRepresent",false);
    }
   
    formData.append("apartmentId",apartment);
    formData.append("status",true);
    const accessToken = localStorage.getItem("accessToken");
    axios
      .post(
        "http://localhost:8080/api/v1/dweller/insert",
        formData,
        {
          headers: 
          { 
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data" 
          },
          withCredentials: false,
        }
      )
      .then((response) => {
        console.log(response);
        navigate("/listDwellers");
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
    if (id === "gender") {
        if(value == "Male"){
            setGender("Male");
        }else{
            setGender("Female");
        }
      
    }
    if (id === "represent") {
      if(value == "Yes"){
          setRepresent("Yes");
      }else{
          setRepresent("No");
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
    if (id === "dateOfBirth") {
      setdateOfBirth(value);
    }
    if (id === "apartment") {
      setApartment(value);
    }
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
                      <img
                        src={URL.createObjectURL(frontSideImage)}
                        className={styles.image}
                        alt="Thumb"
                      />
                    )}{" "}
                    {backSideImage && (
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
                    required
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
                    value={gender}
                    defaultValue="Male"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>

                  </select>
                </div>
              </div>
              <div className={styles.fl}>
                <div className={styles.l}>
                  <p className={styles.lable}> Is representator?</p>
                </div>
                <div className={styles.r}>
                  <select
                    id="represent"
                    className={styles.drop}
                    onChange={(e) => handleInputChange(e)}
                    placeholder="Represent"
                    value={represent}
                    defaultValue="No"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>

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
                  >
                    <option value="null">Select Apartment</option>
                    {data?.map((item) => (
                      <option value={item.id}>{item.number}</option>
                    ))}
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
export default AddDweller;
