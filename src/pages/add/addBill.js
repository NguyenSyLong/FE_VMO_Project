import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import styles from "../../styleCss/stylesPages/add/addBill.module.css";
import { ToastContainer, toast } from "react-toastify";
import { axiosPrivate } from "../../api/axios";
import Loading from "../loading/loading";
import { AiFillEye, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import axios from "axios";

const AddBill = () => {
  const [toDate, setToDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [apartment, setApartment] = useState(null);
  const [disable, setDisable] = useState(false);
  const baseURLApartment = `http://localhost:8080/api/v1/apartment`;
  const baseURLService = `http://localhost:8080/api/v1/service_fee`;
  const [service, setService] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [listService, setListService] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [electric, setElectric] = useState(false);
  const [water, setWater] = useState(false);
  const [electricC, setElectricC] = useState("");
  const [waterC, setWaterC] = useState("");
  const [electricP, setElectricP] = useState(0);
  const [waterP, setWaterP] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      setLoading(true);
      await axios.get(baseURLApartment,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }).then((resp) => {
        console.log(resp);
        setData(resp.data.data);
      });
      await axios.get(baseURLService,{
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }).then((resp) => {
        console.log(resp);
        setService(resp.data.data);
      });

      setLoading(false);
    };
    fetchData();
  }, [baseURLApartment]);

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
    if(electricC==""){
        setElectricC("0");
        
    }
    if(waterC==""){
        setWaterC("0");
    }
    const accessToken = localStorage.getItem("accessToken");
    axios
      .post("http://localhost:8080/api/v1/bill/insert", {
        toDate:toDate,
        fromDate:fromDate,
        serviceId:listService,
        apartmentId:apartment,
        dateOfPayment:null,
        waterConsumption:waterC,
        electricConsumption:electricC

      }, {
        headers: 
          { 
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json" 
          },
          withCredentials: false
      })
      .then((response) => {
        console.log(response);
        navigate("/listBills");
        notify("Add Successfully!!");
      })
      .catch((error) => {
        console.error(error);
        notify("Add Failed");
      });
  };
  const Cancel = () => {};
  let listServiceIter = [];
  const AddService = (id, unitPrice) => {
    if (listService.length == 0) {
      listServiceIter.push(id);
      if (id != 1 && id != 2) {
        let toTalIter = totalPrice + unitPrice;
        setTotalPrice(toTalIter);
      } else if (id == 1) {
        setWaterP(unitPrice);
      } else if (id == 2) {
        setElectricP(unitPrice);
      }

      setListService(listServiceIter);
    } else {
      listServiceIter.push(id);
      listServiceIter.push(...listService);
      if (id != 1 && id != 2) {
        let toTalIter = totalPrice + unitPrice;
        setTotalPrice(toTalIter);
      } else if (id == 1) {
        setWaterP(unitPrice);
      } else if (id == 2) {
        setElectricP(unitPrice);
      }
      setListService(listServiceIter);
    }
    if (id == 2) {
      setElectric(true);
    }
    if (id == 1) {
      setWater(true);
    }
  };
  const removeService = (id, unitPrice) => {
    listServiceIter.push(...listService);
    listServiceIter = listServiceIter.filter((item) => item !== id);
    if (id != 1 && id != 2) {
      let toTalIter = totalPrice - unitPrice;
      setTotalPrice(toTalIter);
    }
    setListService(listServiceIter);
    if (id == 2) {
      if (electricC != "") {
        setTotalPrice(totalPrice - electricC * electricP);
        setElectricC("");
      }
      setElectric(false);
    }
    if (id == 1) {
      if (waterC != "") {
        setTotalPrice(totalPrice - waterC * waterP);
        setWaterC("");
      }
      setWater(false);
    }
  };
  const electricExpense = () => {
    if (electric == true) {
      return (
        <div className={styles.fl}>
          <div className={styles.l}>
            <p className={styles.lable}> Electric Consumption</p>
          </div>
          <div className={styles.r}>
            <input
              id="electricC"
              type="text"
              pattern="^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$"
              placeholder="Enter Number"
              className={styles.drop}
              value={electricC}
              onChange={(e) => handleInputChange(e)}
              required
            ></input>
          </div>
        </div>
      );
    }
    return;
  };
  const waterExpense = () => {
    if (water == true) {
      return (
        <div className={styles.fl}>
          <div className={styles.l}>
            <p className={styles.lable}> Water Consumption</p>
          </div>
          <div className={styles.r}>
            <input
              id="waterC"
              type="text"
              pattern="^(0*[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*)$"
              placeholder="Enter Number"
              className={styles.drop}
              value={waterC}
              onChange={(e) => handleInputChange(e)}
              required
            ></input>
          </div>
        </div>
      );
    }
    return;
  };
  const handleInputChange = (e) => {
    const regexNumber = /^[0-9]*\.?[0-9]*$/;
    const { id, value } = e.target;

    if (id === "apartment") {
      setApartment(value);
    }
    if (id === "toDate") {
      setToDate(value);
    }
    if (id == "fromDate") {
      setFromDate(value);
    }
    if (id === "waterC") {
      if (value === "" || regexNumber.test(value)) {
        if (value === "") {
          let totalIter = totalPrice - waterC * waterP;
          setWaterC(value);
          setTotalPrice(totalIter);
        } else {
          let totalIter = totalPrice - waterC * waterP;
          setWaterC(value);
          let totalIter1 = parseInt(value) * waterP + totalIter;
          setTotalPrice(totalIter1);
        }
      }
    }
    if (id === "electricC") {
      if (value === "" || regexNumber.test(value)) {
        if (value === "") {
          let totalIter = totalPrice - electricC * electricP;
          setElectricC(value);
          setTotalPrice(totalIter);
        } else {
          let totalIter = totalPrice - electricC * electricP;
          setElectricC(value);
          let totalIter1 = parseInt(value) * electricP + totalIter;
          setTotalPrice(totalIter1);
        }
      }
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

              <div className={styles.fl}>
                <div className={styles.l}>
                  <p className={styles.lable}> From Date</p>
                </div>
                <div className={styles.r}>
                  <input
                    type="date"
                    className={styles.drop}
                    value={fromDate}
                    onChange={(e) => handleInputChange(e)}
                    id="fromDate"
                    required
                  ></input>
                </div>
              </div>

              <div className={styles.fl}>
                <div className={styles.l}>
                  <p className={styles.lable}> To Date</p>
                </div>
                <div className={styles.r}>
                  <input
                    type="Date"
                    className={styles.drop}
                    value={toDate}
                    onChange={(e) => handleInputChange(e)}
                    id="toDate"
                    required
                  ></input>
                </div>
              </div>
            </div>
            <div className={styles.fl}>
              <div className={styles.l}>
                <p className={styles.lable}> Total Fee</p>
              </div>
              <div className={styles.r}>
                <h1 className={styles.drop}> {totalPrice}</h1>
              </div>
            </div>

            <p className={styles.if}>Service: </p>
            {electricExpense()}
            {waterExpense()}
            <br />
            <br />
            <table className={styles.table}>
              <tr>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Unit Price</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Action</th>
              </tr>
              <>
                {service?.map((item) => (
                  <tr>
                    <td>{item.name}</td>
                    <td>{item.unitPrice}</td>
                    <td>
                      {listService.includes(item.id) ? (
                        <label
                          style={{ color: "blue" }}
                          className={styles.linkBlue}
                        >
                          Activate
                        </label>
                      ) : (
                        <label
                          style={{ color: "red" }}
                          className={styles.linkBlue}
                        >
                          Deactivate
                        </label>
                      )}
                    </td>
                    <td>
                      {listService.includes(item.id) ? (
                        <AiOutlineClose
                          className={styles.iconView}
                          onClick={() => {
                            removeService(item.id, item.unitPrice);
                          }}
                        />
                      ) : (
                        <AiOutlineCheck
                          className={styles.iconView}
                          onClick={() => {
                            AddService(item.id, item.unitPrice);
                          }}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </>
            </table>
          </div>
          <br />

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
export default AddBill;
