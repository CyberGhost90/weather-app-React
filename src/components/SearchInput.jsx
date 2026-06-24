import { AsyncPaginate } from "react-select-async-paginate";
import { loadCityOptions } from "../services/weatherService";

//logic for the search input component, which uses AsyncPaginate to fetch city options asynchronously
function SearchInput({ value, onChange }) {
  return (
    <AsyncPaginate
      value={value}
      loadOptions={loadCityOptions}
      onChange={onChange}
      placeholder="Search for city(min 3 chars)..."
      additional={{ page: 1 }}
      debounceTimeout={600}
    />
  );
} //SearchInput

export default SearchInput;
