import style from "./search.module.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { userState } from "@recoils/user";
import useSearchFetcher from "@services/useSearchFetcher";
import { URLS } from "@/router";

export default function Search() {
  const getSearchResult = useSearchFetcher();
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef(null);
  useQuery(
    getSearchResult({
      userId: userData.u_userid,
      variables: searchValue,
      queries: {
        enabled: !!searchValue,
        onSuccess: (data) => {
          setSearchValue("");
          inputRef.current.value = "";
          inputRef.current.blur();
          const { result, regexp } = data;
          navigate(`${URLS.SEARCH}?value=${searchValue}`, {
            state: { data: result, regexp, value: searchValue },
          });
        },
      },
    })
  );

  const searchKeyword = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    const isValid = value.trim() !== "";
    if (isValid) setSearchValue(value);
  };

  return (
    <section className={style.search}>
      <form className={style.form} onSubmit={searchKeyword}>
        <input
          className={style.input}
          ref={inputRef}
          autoComplete="off"
          name="search"
        />
      </form>
    </section>
  );
}
