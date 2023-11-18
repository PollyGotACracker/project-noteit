import "@styles/components/searchForm.css";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { userState } from "@recoils/user";
import useSearchFetcher from "@services/useSearchFetcher";
import { URLS } from "@/router";

const SearchForm = () => {
  const getSearchResult = useSearchFetcher();
  const userData = useRecoilValue(userState);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(false);
  const inputRef = useRef(null);
  useQuery(
    getSearchResult({
      userId: userData.u_userid,
      variables: searchValue,
      queries: {
        enabled: searchEnabled,
        onSuccess: (data) => {
          inputRef.current.value = "";
          inputRef.current.blur();
          const { result, regexp } = data;
          navigate(`${URLS.SEARCH}?value=${searchValue}`, {
            state: { data: result, regexp, value: searchValue },
          });
        },
        onSettled: () => {
          setSearchEnabled(false);
        },
      },
    })
  );

  useEffect(() => {
    if (searchValue) setSearchEnabled(true);
  }, [searchValue]);

  const searchKeyword = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    const isValid = value.replaceAll(" ", "") !== "";
    if (isValid) setSearchValue(value);
  };

  return (
    <section className="search-box">
      <form onSubmit={searchKeyword}>
        <input
          ref={inputRef}
          className="search"
          autoComplete="off"
          name="search"
        />
      </form>
    </section>
  );
};

export default SearchForm;
