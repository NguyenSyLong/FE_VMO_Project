import NavBar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import styles from "../../styleCss/stylesPages/home/service.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import {
  AiFillDelete,
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

const Service = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  const [pageNumber, setPageNumber] = useState(0);
  const [total, setTotal] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const [name, setName] = useState("");
  const [nameS, setNameS] = useState(null);
  const baseURL = `http://localhost:8080/api/v1/service_fee/${pageNumber}/${pageSize}/${nameS}`;
  useEffect(() => {
    const fetchData = async () => {
      const accessToken = localStorage.getItem("accessToken");
      setLoading(true);
      await axiosPrivate.get(baseURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }).then((resp) => {
        console.log(resp);
        setData(resp.data.data.content);
        setTotal(resp.data.data.totalElements);
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

  const handlePageClick = (event) => {
    //   const newOffset = (event.selected * 4) % data.length;
    //   console.log(
    //     `User requested page number ${event.selected}, which is offset ${newOffset}`
    //   );
    //   setItemOffset(newOffset);
    console.log(event.selected);
    setPageNumber(event.selected);
  };
  const handleSubmit = () => {
    if (name == "") {
      setNameS(null);
    } else {
      setNameS(name);
    }
    setPageNumber(0);
  };
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") {
      setName(value);
    }
  };
  const handleChangeStatus = (even) => {};
  const exportData = () => {
    return (
      <>
        {data.map((item) => (
          <tr>
            <td>{item.name}</td>
            <td>{item.unitPrice}</td>
            <td>
              <AiTwotoneEdit
                className={styles.iconView}
                onClick={() => {
                  navigate(`/editServiceFee/${item.id}`);
                }}
              />
              <AiFillDelete
                className={styles.iconView}
                onClick={() => {
                  navigate(`/dwellerDetail/${item.id}`);
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
                  navigate("/addServiceFee");
                }}
              >
                + New Service
              </button>
            </div>
            <table className={styles.table}>
              <tr>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Unit Price</th>
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
    </>
  );
};

export default Service;
