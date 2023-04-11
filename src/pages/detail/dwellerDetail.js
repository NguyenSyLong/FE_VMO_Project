import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { axiosPrivate } from "../../api/axios";
import NavBar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { useFetch } from "../../hook/useFetch";
import styles from "../../styleCss/stylesPages/detail/apartmentdetail.module.css";
import { useNavigate } from "react-router-dom";
const DwellerDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const baseURL = `http://localhost:8080/api/v1/dweller/` + id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      setLoading(true);
      await axiosPrivate.get(baseURL,{
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
              <label className={styles.title}>Dweller Information</label>
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
                  <p className={styles.txt1}>Email: </p>
                </div>
                <div className={styles.r}>
                  <p className={styles.txt}>{data.email}</p>
                </div>
              </div>

              <div className={styles.fl}>
                <div className={styles.l}>
                  <p className={styles.txt1}>Gender: </p>
                </div>
                <div className={styles.r}>
                  <p className={styles.txt}>
                    {data.gender == true ? "MALE" : "FEMALE"}
                  </p>
                </div>
              </div>

              <div className={styles.fl}>
                <div className={styles.l}>
                  <p className={styles.txt1}>Date Of Birth: </p>
                </div>
                <div className={styles.r}>
                  <p className={styles.txt}>{new Date(data.dateOfBirth).toDateString()}</p>
                </div>
              </div>

              <div className={styles.fl}>
                <div className={styles.l}>
                  <p className={styles.txt1}>Apartment: </p>
                </div>
                <div className={styles.r}>
                  <p className={styles.txt}>{data?.apartment?.name}</p>
                </div>
              </div>

              <div className={styles.fl}>
                <div className={styles.l}>
                  <p className={styles.txt1}>Status: </p>
                </div>
                <div className={styles.r}>
                  <p className={styles.txt}>
                    {data.status == true ? "Staying" : "Leaving"}
                  </p>
                </div>
              </div>

              <div className={styles.fl}>
                <div className={styles.l}>
                  <p className={styles.txt1}>Is Representator: </p>
                </div>
                <div className={styles.r}>
                  <p className={styles.txt}>
                    {data.isRepresent == true ? "Yes" : "No"}
                  </p>
                </div>
              </div>

              <br/>
              <p className={styles.txt1}>Citizen Identification Card: </p>
              <div className={styles.fl}>
                <div className={styles.l}>
                  <img
                    src={data?.frontSideImage}
                    className={styles.img}
                    alt="img"
                  ></img>
                </div>
                <div className={styles.r}>
                  <img
                    src={data?.backSideImage}
                    className={styles.img}
                    alt="img"
                  ></img>
                </div>
              </div>

              <br />

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

export default DwellerDetail;
