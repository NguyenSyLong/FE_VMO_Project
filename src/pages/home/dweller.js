import NavBar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import styles from "../../styleCss/stylesPages/home/apartment.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import {
  AiFillEye,
  AiFillFastBackward,
  AiFillFastForward,
  AiTwotoneEdit,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import "../../styleCss/stylesPages/pagination/pagination.css";
import Loading from "../loading/loading";
const Dweller = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const [name, setName] = useState("");
  const [nameD, setNameD] = useState(null);
  const [status, setStatus] = useState(null);
  const baseURL = `http://localhost:8080/api/v1/dweller/${pageNumber}/${pageSize}/${nameD}/${status}`;
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      setLoading(true);
      await axios.get(baseURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }).then((resp) => {
        console.log(resp);
        setTotal(resp.data.data.totalElements);
        setData(resp.data.data.content);
      });

      setLoading(false);
    };
    fetchData();
  }, [baseURL]);

  // const [itemOffset, setItemOffset] = useState(0);

  // const endOffset = itemOffset + 4;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  // const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(total / 4);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") {
      setName(value);
    }
  };
  const handleSubmit = () => {
    if (name == "") {
      setNameD(null);
    } else {
      setNameD(name);
    }
    setPageNumber(0);
  };
  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
    setPageNumber(0);
  };

  const handlePageClick = (event) => {
    // const newOffset = (event.selected * 4) % data.length;
    // console.log(
    //   `User requested page number ${event.selected}, which is offset ${newOffset}`
    // );
    // setItemOffset(newOffset);
    console.log(event.selected);
    setPageNumber(event.selected);
  };
  const exportData = () => {
    return (
      <>
        {data.map((item) => (
          <tr>
            <td>{item.name}</td>
            <td>{item.email}</td>
            <td>{item.apartment.number}</td>
            <td>{item.status === true ? "Renting" : "Leaving"}</td>
            <td>
              <AiFillEye
                className={styles.iconView}
                onClick={() => {
                  navigate(`/dwellerDetail/${item.id}`);
                }}
              />
              <AiTwotoneEdit
                className={styles.iconView}
                onClick={() => {
                  navigate(`/editDweller/${item.id}`);
                }}
              />
            </td>
          </tr>
        ))}
      </>
    );
  };

  return loading ? (
    <Loading />
  ) : (
    <div className={styles.container}>
      <Sidebar />
      <NavBar />
      <div className={styles.r}>
        <div className={styles.con}>
          <div className={styles.btns}>
            <button
              className={styles.btn}
              onClick={(e) => handleChangeStatus(e)}
              value="null"
            >
              All
            </button>
            <button
              className={styles.btn}
              onClick={(e) => handleChangeStatus(e)}
              value="true"
            >
              Renting
            </button>
            <button
              className={styles.btn}
              onClick={(e) => handleChangeStatus(e)}
              value="false"
            >
              Leaving
            </button>
            <input
              className={styles.ip}
              type="text"
              placeholder="Enter Name"
              id="name"
              value={name}
              onChange={(e) => handleInputChange(e)}
            ></input>
            <button className={styles.btn} onClick={handleSubmit}>
              Search
            </button>
            <button
              className={styles.btn2}
              onClick={() => {
                navigate("/addDweller");
              }}
            >
              + New Dweller
            </button>
          </div>
          <table className={styles.table}>
            <tr>
              <th className={styles.th}>Name</th>
              <th className={styles.th}>Email</th>
              <th className={styles.th}>RoomNo</th>
              <th className={styles.th}>Status</th>
              <th className={styles.th}>Action</th>
            </tr>
            <>{exportData()}</>
          </table>
          <hr />
          <div>
            <ReactPaginate
              breakLabel="..."
              nextLabel={<AiFillFastForward />}
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              initialPage={pageNumber}
              previousLabel={<AiFillFastBackward />}
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              previousLinkClassName="page-num"
              nextLinkClassName="page-num"
              activeLinkClassName="active"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dweller;
