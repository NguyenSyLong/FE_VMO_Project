import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import NavBar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { useFetch } from "../../hook/useFetch";
import styles from "../../styleCss/stylesPages/detail/apartmentdetail.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const ApartmentDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const baseURL = `http://localhost:8080/api/v1/apartment/` + id;
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

  return (
    <>
      <form>
        <div className={styles.container}>
          <Sidebar />
          <NavBar />
          <div className={styles.content}>
            <div className={styles.add}>
              <br />
              <br />
              <label className={styles.title}>Aparment Information</label>
              <br />
              <br />
              <p className={styles.if}>Basic Information:</p>
              <div className={styles.fl}>
                <div className={styles.l}>
                <p className={styles.txt1}>Name: </p>
                </div>
                <div className={styles.r}>
                <p className={styles.txt}>{data.name}</p>
                </div>
              </div>

              <div className={styles.fl}>
                <div className={styles.l}>
                <p className={styles.txt1}>Area: </p>
                </div>
                <div className={styles.r}>
                <p className={styles.txt}>{data.area}</p>
                </div>
              </div>

              <div className={styles.fl}>
                <div className={styles.l}>
                <p className={styles.txt1}>Price: </p>
                </div>
                <div className={styles.r}>
                <p className={styles.txt}>{data.price}</p>
                </div>
              </div>

              <div className={styles.fl}>
                <div className={styles.l}>
                <p className={styles.txt1}>Number of room: </p>
                </div>
                <div className={styles.r}>
                <p className={styles.txt}>{data.numOfRoom}</p>
                </div>
              </div>
             
              <div className={styles.fl}>
                <div className={styles.l}>
                <p className={styles.txt1}>Status: </p>
                </div>
                <div className={styles.r}>
                <p className={styles.txt}>{data.status == true ? "Active" : "DeActive"}</p>
                </div>
              </div>

              <div className={styles.fl}>
                <div className={styles.l}>
                <p className={styles.txt1}>Description: </p>
                </div>
                <div className={styles.r}>
                <p className={styles.txt}>{data.description}</p>
                </div>
              </div>




              <br />
              <p className={styles.if}>Dwellers of the apartment: </p>
              <br />
              <br />
              <table className={styles.table}>
                <tr>
                  <th className={styles.th}>Name</th>
                  <th className={styles.th}>Email</th>
                  <th className={styles.th}>Gender</th>
                  <th className={styles.th}>Action</th>
                </tr>
                <>
                  {data?.dwellers?.map((item) => (
                    <>
                    {item.status!=false &&
                      (
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.email}</td>

                        <td>{item.gender === true ? "MALE" : "FEMALE"}</td>
                        <td>
                          <AiFillEye
                            className={styles.iconView}
                            onClick={() => {
                              navigate(`/dwellerDetail/${item.id}`);
                            }}
                          />
                        </td>
                      </tr>
                    )
                    }
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

export default ApartmentDetail;
