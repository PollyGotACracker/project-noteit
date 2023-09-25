import { forwardRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchResult } from "@services/search.service";
import { URLS } from "@/router";

const SearchInput = forwardRef((props, ref) => {
  const navigate = useNavigate();
  const { sidebar, blocker } = ref;
  const [searchValue, setSearchValue] = useState("");

  const searchData = async ({ target: { value } }) => {
    setSearchValue(value);
    const { data, regexp } = await getSearchResult(value);
    navigate(`${URLS.SEARCH}?value=${value}`, {
      state: { data, regexp, value },
    });
  };

  const searchKeyword = (e) => {
    if (e.keyCode === 13) {
      const chk = searchValue.replaceAll(" ", "");
      if (chk === "") {
        e.preventDefault();
        return false;
      } else {
        searchData(searchValue);
        sidebar.current.className = "Sidebar";
        blocker.current.className = "blocker";
        e.preventDefault();
      }
    }
  };

  return (
    <form>
      <input
        className="search"
        placeholder="검색"
        onChange={setSearchValue}
        onKeyDown={searchKeyword}
      />
    </form>
  );
});

export default SearchInput;
