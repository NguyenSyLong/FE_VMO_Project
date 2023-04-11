import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import NavBar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { useFetch } from "../../hook/useFetch";
import styles from "../../styleCss/stylesPages/detail/apartmentdetail.module.css";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/loading";
import axios from "axios";
const BillDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const baseURL = `http://localhost:8080/api/v1/bill/` + id;
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const fetchData = async () => {
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

  const cancel = () => {};
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }
  return loading ? (<Loading/>): (
    <>
      <form>
        <div className={styles.container}>
          <Sidebar />
          <NavBar />
          <div className={styles.content}>
            <div className={styles.add}>
        
              <p className={styles.if}>Basic Information:</p>
              <div className={styles.fl}>
                <div className={styles.l}>
                <p className={styles.txt1}>Room no: </p>
                </div>
                <div className={styles.r}>
                <p className={styles.txt}>{data.apartment.number}</p>
                </div>
              </div>

              <div className={styles.fl}>
                <div className={styles.l}>
                <p className={styles.txt1}>From Date: </p>
                </div>
                <div className={styles.r}>
                <p className={styles.txt}>{formatDate(data.fromDate)}</p>
                </div>
              </div>

              <div className={styles.fl}>
                <div className={styles.l}>
                <p className={styles.txt1}>To Date: </p>
                </div>
                <div className={styles.r}>
                <p className={styles.txt}>{formatDate(data.toDate)}</p>
                </div>
              </div>

              <div className={styles.fl}>
                <div className={styles.l}>
                <p className={styles.txt1}>Date of payment: </p>
                </div>
                <div className={styles.r}>
                <p className={styles.txt}>{data.dateOfPayment == null ? 'N/A' :formatDate(data.dateOfPayment)}</p>
                </div>
              </div>

              <div className={styles.fl}>
                <div className={styles.l}>
                <p className={styles.txt1}>Electric Consumption: </p>
                </div>
                <div className={styles.r}>
                <p className={styles.txt}>{data.electricConsumption == null ? 'N/A' :data.electricConsumption}</p>
                </div>
              </div>
              <div className={styles.fl}>
                <div className={styles.l}>
                <p className={styles.txt1}>Water Consumption: </p>
                </div>
                <div className={styles.r}>
                <p className={styles.txt}>{data.waterConsumption == null ? 'N/A' : data.waterConsumption}</p>
                </div>
              </div>


              <div className={styles.fl}>
                <div className={styles.l}>
                <p className={styles.txt1}>Total Price: </p>
                </div>
                <div className={styles.r}>
                <p className={styles.txt}>{data.totalPrice}</p>
                </div>
              </div>




              <br />
              <p className={styles.if}>Dwellers of the apartment: </p>
              <br />
              <br />
              <table className={styles.table}>
                <tr>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Unit Price</th>

                </tr>
                <>
                  {data?.bill_details?.map((item) => (
                    <>
                
                      
                      <tr>
                        <td>{item?.service_fee.name}</td>
                        <td>{item?.service_fee.unitPrice}</td>

                       
                      
                      </tr>
                    
                    
                   </>
                  ))}
                </>
              </table>

              <br />
              <br />
              <br />
              <br />

              <br />
              <br />

              <input
                type="button"
                value="Back"
                className={styles.btnCancel}
                onClick={cancel}
              ></input>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default BillDetail;
