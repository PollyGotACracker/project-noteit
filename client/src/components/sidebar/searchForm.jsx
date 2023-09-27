import "@styles/components/searchForm.css";
import { useNavigate } from "react-router-dom";
import { getSearchResult } from "@services/search.service";
import { URLS } from "@/router";

const SearchForm = () => {
  const navigate = useNavigate();

  const searchData = async (value) => {
    const { data, regexp } = await getSearchResult(value);
    navigate(`${URLS.SEARCH}?value=${value}`, {
      state: { data, regexp, value },
    });
  };

  const searchKeyword = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    const isValid = value.replaceAll(" ", "") !== "";
    if (isValid) {
      searchData(value);
      e.target.search.value = "";
    }
  };

  return (
    <section className="search-box">
      <form onSubmit={searchKeyword}>
        <input className="search" autoComplete="off" name="search" />
      </form>
    </section>
  );
};

export default SearchForm;
