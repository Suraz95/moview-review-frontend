import ReactDOM from "react-dom";

const Loader = () => {
   return ReactDOM.createPortal(
      <div className="overlay">
         <div className="loader">
            <span className="loading loading-bars loading-lg"></span>
         </div>
      </div>,
      document.getElementById("loader")
   );
};

export default Loader;
