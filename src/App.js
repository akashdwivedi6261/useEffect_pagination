import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import uuid from "uuid";
export default function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  // console.log(loading);
  const handleChange = (value) => {
    setPage(value);
  };
  const Pagination = ({ totalPages, currentPage, onClickCallback }) => {
    const pages = new Array(totalPages).fill(0).map((a, i) =>
      i + 1 === currentPage ? (
        <button key={i} style={{ background: "olive" }}>
          {i + 1}
        </button>
      ) : (
        <button key={i} onClick={() => onClickCallback(i + 1)}>
          {i + 1}
        </button>
      )
    );

    return (
      <div
        style={{ display: "flex", gap: "1rem", justifyContent: "space-around" }}
      >
        {pages}
      </div>
    );
  };
  const getUsers = ({ query = "masai", page = 1 }) => {
    return axios.get(
      ` https://api.github.com/search/users?q=${query}&page=${page}`
    );
  };

  useEffect(() => {
    getUsers({ page }).then((res) => {
      setUsers(res);
      console.log(res);
      if (res.data.total_count) {
        const total = Math.floor(res.data.total_count / 30);
        setTotalPages(total);
      }
      setLoading(false);
    });
  }, [page]);
  return (
    <div className="App">
      {loading ? (
        <h3>...loading</h3>
      ) : (
        <>
          {users?.data?.items?.map((item) => (
            <div
              style={{
                display: "flex",
                border: "1px solid grey",
                margin: "1rem auto",
                width: "80%",
                justifyContent: "space-around"
              }}
            >
              <div>
                <img
                  src={item.avatar_url}
                  style={{ width: "5rem" }}
                  alt="img"
                />
              </div>
              <div>
                <h4>{item.login}</h4>
                <a href={item.url}>{item.url}</a>
              </div>
            </div>
          ))}
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onClickCallback={handleChange}
          />
        </>
      )}
    </div>
  );
}
