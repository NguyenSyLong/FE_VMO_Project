import NavBar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import styles from "../../styleCss/stylesPages/home/apartment.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

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

const Apartment = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  const [pageSize, setPageSize] = useState(4);
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState(null);
  const [numberA, setNumberA] = useState(null);
  const baseURL = `http://localhost:8080/api/v1/apartment/${pageNumber}/${pageSize}/${numberA}/${status}`;
  const baseURL1 = `http://localhost:8080/api/v1/apartment/0/1`;
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");

      setLoading(true);
      await axios
        .get(baseURL, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: false,
        })
        .then((resp) => {
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

  // const handlePageClick = (event) => {
  //   const newOffset = (event.selected * 4) % data.length;
  //   console.log(
  //     `User requested page number ${event.selected}, which is offset ${newOffset}`
  //   );
  //   setItemOffset(newOffset);
  // };
  const handlePageClick = (event) => {
    console.log(event.selected);
    setPageNumber(event.selected);
  };

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
    setPageNumber(0);
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "number") {
      setNumber(value);
    }
  };
  const handleSubmit = () => {
    
    if (number == "") {
      setNumberA(null);
    } else {
      setNumberA(number);
    }
    setPageNumber(0);
  };
  const exportData = (data) => {
    return (
      <>
        {data.map((item) => (
          <tr>
            <td>{item.number}</td>
            <td>{item.name}</td>

            <td>{item.area}</td>

            <td>{item.numOfRoom}</td>
            <td>{item.status === true ? "Activate" : "Deactivate"}</td>
            <td>
              <AiFillEye
                className={styles.iconView}
                onClick={() => {
                  navigate(`/apartmentDetail/${item.id}`);
                }}
              />
              <AiTwotoneEdit
                className={styles.iconView}
                onClick={() => {
                  navigate(`/editApartment/${item.id}`);
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
                Activate
              </button>
              <button
                className={styles.btn}
                onClick={(e) => handleChangeStatus(e)}
                value="false"
              >
                Deactivate
              </button>

                <input
                  className={styles.ip}
                  type="text"
                  placeholder="Enter Aparment"
                  id="number"
                  value={number}
                  onChange={(e) => handleInputChange(e)}
                ></input>
                <button className={styles.btn} onClick={handleSubmit} >
                  Search
                </button>

              <button
                className={styles.btn2}
                onClick={() => {
                  navigate("/addApartment");
                }}
              >
                + New Apartment
              </button>
            </div>
            <table className={styles.table}>
              <tr>
                <th className={styles.th}>Room no</th>
                <th className={styles.th}>Name</th>

                <th className={styles.th}>Area</th>

                <th className={styles.th}>Number Of Room</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Action</th>
              </tr>
              <>{exportData(data)}</>
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
    </>
  );
};

export default Apartment;
