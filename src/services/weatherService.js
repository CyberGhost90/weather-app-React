import axios from "axios";

//contains only logic
export const loadCityOptions = async (
  //searchInputValue is the value typed in the search input
  //async allows us to use await inside the function
  searchInputValue,
  prevOptions,
  { page },
) => {
  if (!searchInputValue || searchInputValue.length < 3) {
    return { options: [], hasMore: false, additional: { page: 1 } };
  }

  const currentPage = page || 1;
  const resultsPerPage = 10;

  try {
    //we use axios to make a GET request to the Open-Meteo Geocoding API
    const respnse = await axios.get(
      "https://geocoding-api.open-meteo.com/v1/search",
      {
        params: {
          name: searchInputValue,
          count: resultsPerPage,
          format: "json",
          language: "en",
        },
      },
    );

    const { results } = respnse.data;

    if (!results || results.length === 0) {
      //if there are no results, we return an empty array of options and indicate that there are no more results to fetch
      return { options: [], hasMore: false, additional: { page: currentPage } };
    } //if

    const options = results.map((city) => ({
      value: {
        latitude: city.latitude,
        longitude: city.longitude,
        timezone: city.timezone,
        name: city.name,
      },
      label: `${city.name}${city.admin1 ? `, ${city.admin1}` : ""} (${city.country_code.toUpperCase()})`,
    }));

    return {
      options: options,
      hasMore: results.length === resultsPerPage,
      additional: { page: currentPage + 1 },
    };
  } catch (error) {
    console.error("GeoCoding fetch exception: ", error);
    return { options: [], hasMore: false, additional: { page: currentPage } };
  }
}; //loadCityOptions
