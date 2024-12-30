import { forwardRef, useEffect, useRef, useState } from "react";

const LiveSearch = ({
  results = [],
  renderItem = null,
  value = "",
  onChange = null,
  placeholder = "",
  onSelect = null,
  name = "",
}) => {
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1); // using -1 , to not focus on any search result
  const [defaultValue, setDefaultValue] = useState("");

  const handleFocus = () => {
    if (results.length) setShowSearchResults(true);
  };

  const closeSearch = () => {
    setShowSearchResults(false);
    setFocusedItemIndex(-1);
  };

  const handleBlur = () => {
    setTimeout(() => {
      closeSearch();
    }, 500);
  };

  const handleKeyDown = ({ key }) => {
    let next;
    const keys = ["ArrowDown", "ArrowUp", "Enter", "Escape"];
    if (!keys.includes(key)) return; // if any other key is pressed then return nothing
    // Move selection Up and Down
    if (key === "ArrowDown") {
      next = (focusedItemIndex + 1) % results.length;
    }
    if (key === "ArrowUp") {
      next = (focusedItemIndex + results.length - 1) % results.length;
    }
    if (key === "Enter") return handleSelection(results[focusedItemIndex]);
    if (key === "Escape") {
    }
    setFocusedItemIndex(next);
  };

  const handleSelection = (selectedItem) => {
    if (selectedItem) {
      onSelect(selectedItem);
      closeSearch();
    }
    // onSelect(selectedItem);
  };

  const handleChange = (e) => {
    setDefaultValue(e.target.value);
    onChange && onChange(e); // whenever something is typed here, an API call is being sent to fetch all Actors
  };

  useEffect(() => {
    if (value) setDefaultValue(value);
  }, [value]);

  //Checking the results length to toggle the fetched result Container visibility
  useEffect(() => {
    if (results.length) return setShowSearchResults(true);
    else return setShowSearchResults(false);
  }, [results.length]);

  return (
    <div className="relative">
      <input
        name={name}
        value={defaultValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        type="text"
        className="input input-bordered w-full"
      />
      <SearchResults
        visible={showSearchResults}
        results={results}
        focusedItemIndex={focusedItemIndex}
        onSelect={handleSelection}
        renderItem={renderItem}
      />
    </div>
  );
};

const SearchResults = ({
  visible,
  results = [],
  focusedItemIndex,
  onSelect,
  renderItem,
  resultContainerStyle,
}) => {
  const resultContainer = useRef();
  useEffect(() => {
    resultContainer.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [focusedItemIndex]);

  if (!visible) return null;

  return (
    <div className="absolute z-50 max-w-md right-0 left-0 top-14 bg-base-200 shadow-md rounded-md p-2 max-h-48 overflow-auto">
      {results?.map((result, idx) => {
        return (
          <SingleResultCard
            key={idx.toString()}
            ref={idx === focusedItemIndex ? resultContainer : null}
            item={result}
            renderItem={renderItem}
            resultContainerStyle={resultContainerStyle}
            onMouseDown={() => onSelect(result)}
          />
        );
      })}
    </div>
  );
};

const SingleResultCard = forwardRef((props, ref) => {
  const { item, renderItem, resultContainerStyle, onMouseDown } = props;
  const getClasses = () => {
    if (resultContainerStyle) {
      return resultContainerStyle;
    }
    return "cursor-pointer rounded overflow-hidden hover:bg-base-100 transition p-2";
  };
  return (
    <div ref={ref} onMouseDown={onMouseDown} className={getClasses()}>
      {/* <img src={actor.avatar} alt={actor.name} className="w-12 h-12 rounded-full" />
    <p className="font-semibold">{actor.name}</p> */}
      {renderItem(item)}
    </div>
  );
});

export default LiveSearch;
