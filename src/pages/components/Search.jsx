import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchStations } from "../../api";

const Search = () => {
  const [cities, setCities] = useState([]); // State to store cities data

  useEffect(() => {
    const getStations = async () => {
      const res = await fetchStations();
      setCities(res.data);
    };

    getStations();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  console.log(cities);

  const [fromCity, setFromCity] = useState("");

  const [toCity, setToCity] = useState("");

  const [Departure, setDeparture] = useState("");

  const [Return, setReturn] = useState("");

  const [fromSuggestions, setFromSuggestions] = useState([]);

  const [toSuggestions, setToSuggestions] = useState([]);

  const [showFromSuggestions, setShowFromSuggestions] = useState(false);

  const [showToSuggestions, setShowToSuggestions] = useState(false);

  const [loading, setLoading] = useState(false); // State to handle loading

  const navigate = useNavigate();

  useEffect(() => {
    const filterCities = (query, setSuggestions) => {
      const filteredCities = cities
        .filter((city) =>
          city.station_name.toLowerCase().includes(query.toLowerCase())
        )
        .map((city) => `${city.station_name},${city.station_id}`);

      setSuggestions(filteredCities);
    };

    if (fromCity || showFromSuggestions)
      filterCities(fromCity, setFromSuggestions);
    if (toCity || showToSuggestions) filterCities(toCity, setToSuggestions);
  }, [fromCity, toCity, showFromSuggestions, showToSuggestions]);

  const handleSuggestionClick = (suggestion, setCity, setShowSuggestions) => {
    // setCity(suggestion.split(",")[1].trim());
    setCity(suggestion.trim());
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      
      const token = localStorage.getItem("token");
      await fetch("http://127.0.0.1:8000/api/trains/route/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${token.replace(`"`, ``)}`,
        },
        body: JSON.stringify({
          starting_station: fromCity.split(",")[1].trim(),
          destination_station: toCity.split(",")[1].trim(),
        }),
      }).then(async (res) => {
        return res.json().then(async (response) => {
          console.log(response.data, "==================line number 82");

          if (response.data) {
            localStorage.setItem('trains',JSON.stringify(response.data));
            
            setTimeout(() => {
              setLoading(false);
              navigate("/trains"); // Simulate navigation after delay
            }, 2000); // Delay to show the animation
          } else {
            setLoading(false);
            console.log("Form Submission Failed");
          }
        });
      });
    } catch (error) {
      setLoading(false);
      console.log("An unknown error has occurred", error);
    }
  };

  const handleKeyPress = (e, setCity, setShowSuggestions, suggestions) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      setCity(suggestions[0].split(",")[0].trim()); // Fill input with first suggestion
      setShowSuggestions(false);
    }
  };

  return (
    <section className="p-4 min-h-screen flex flex-col items-center justify-center">
      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
          <p className="text-2xl font-bold text-gray-700 mt-4 text-center"></p>
        </div>
      )}
      {!loading && (
        <>
          <div className="text-center mb-4">
            <h1 className="text-4xl mb-2 font-bold text-white">
              Search for Trains
            </h1>
            <h2 className="text-2xl text-white">Indian Railways</h2>
          </div>
          <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
            <div className="bg-gray-100 p-6 rounded-lg">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="relative">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      From
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      value={fromCity}
                      onChange={(e) => setFromCity(e.target.value)}
                      onFocus={() => setShowFromSuggestions(true)}
                      onBlur={() =>
                        setTimeout(() => setShowFromSuggestions(false), 200)
                      }
                      onKeyPress={(e) =>
                        handleKeyPress(
                          e,
                          setFromCity,
                          setShowFromSuggestions,
                          fromSuggestions
                        )
                      }
                      placeholder="Enter departure city"
                    />
                    {showFromSuggestions && fromSuggestions.length > 0 && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
                        {fromSuggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            onMouseDown={() =>
                              handleSuggestionClick(
                                suggestion,
                                setFromCity,
                                setShowFromSuggestions
                              )
                            }
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      To
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      value={toCity}
                      onChange={(e) => setToCity(e.target.value)}
                      onFocus={() => setShowToSuggestions(true)}
                      onBlur={() =>
                        setTimeout(() => setShowToSuggestions(false), 200)
                      }
                      onKeyPress={(e) =>
                        handleKeyPress(
                          e,
                          setToCity,
                          setShowToSuggestions,
                          toSuggestions
                        )
                      }
                      placeholder="Enter destination city"
                    />
                    {showToSuggestions && toSuggestions.length > 0 && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
                        {toSuggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            onMouseDown={() =>
                              handleSuggestionClick(
                                suggestion,
                                setToCity,
                                setShowToSuggestions
                              )
                            }
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Depart
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      value={Departure}
                      placeholder="Select departure date"
                      onChange={(e) => setDeparture(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Return
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                      value={Return}
                      placeholder="Select return date"
                      onChange={(e) => setReturn(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6"></div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gray-900 text-white font-bold rounded-lg"
                  >
                    Search Trains
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Search;
