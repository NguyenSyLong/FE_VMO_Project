import NavBar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import styles from "../../styleCss/stylesPages/home/bill.module.css";
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
import Loading from "../loading/loading";
import Pagination from "../../pagination/Pagination";
import ReactPaginate from "react-paginate";
import "../../styleCss/stylesPages/pagination/pagination.css";

const Bill = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const navigate = useNavigate();
  const baseURL = `http://localhost:8080/api/v1/bill`;
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const fetchData = async () => {
      setLoading(true);
      await axios.get(baseURL, {
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

  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + 4;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / 4);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 4) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const handleChangeStatus = (even) => {};
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id == "fromDate") {
      setFromDate(value);
    }
    if (id == "toDate") {
      setToDate(value);
    }
  };

  const exportData = (data) => {
    return (
      <>
        {data.map((item) => (
          <tr>
            <td>{item.apartment.number}</td>
            <td>{formatDate(item.fromDate)}</td>

            <td>{formatDate(item.toDate)}</td>

            {item.dateOfPayment == null && <td> N/A</td>}
            {item.dateOfPayment != null && (
              <td>{formatDate(item.dateOfPayment)}</td>
            )}
            <td>{item.totalPrice}</td>
            <td>
              <AiFillEye
                className={styles.iconView}
                onClick={() => {
                  navigate(`/billDetail/${item.id}`);
                }}
              />
              <AiTwotoneEdit
                className={styles.iconView}
                onClick={() => {
                  navigate(`/editBill/${item.id}`);
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
    <>
      <div className={styles.container}>
        <Sidebar />
        <NavBar />
        <div className={styles.r}>
          <div className={styles.con}>
            <div className={styles.btns}>
              <p className={styles.p}> From Date:</p>
              <input
                type="date"
                className={styles.ip}
                value={fromDate}
                onChange={(e) => handleInputChange(e)}
                id="fromDate"
                required
              ></input>
              <p className={styles.p}>To Date:</p>
              <input
                type="date"
                className={styles.ip}
                value={toDate}
                onChange={(e) => handleInputChange(e)}
                id="toDate"
                required
              ></input>

              <button className={styles.btn} type="submit">
                Search
              </button>

              <button
                className={styles.btn2}
                onClick={() => {
                  navigate("/addBill");
                }}
              >
                + New Bill
              </button>
            </div>
            <table className={styles.table}>
              <tr>
                <th className={styles.th}>Room no</th>
                <th className={styles.th}>From Date</th>

                <th className={styles.th}>To Date</th>

                <th className={styles.th}>Date Of Payment</th>

                <th className={styles.th}>Total Price</th>
                <th className={styles.th}>Action</th>
              </tr>
              <>{exportData(currentItems)}</>
            </table>
            <hr />
            <div>
              <ReactPaginate
                breakLabel="..."
                nextLabel={<AiFillFastForward />}
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
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
    </>
  );
};

export default Bill;
