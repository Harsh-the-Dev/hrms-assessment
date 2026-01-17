import "../pages.css";

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-spinner">
          <div className="spinner-circle"></div>
          <div className="spinner-circle"></div>
          <div className="spinner-circle"></div>
          <div className="spinner-circle"></div>
        </div>
        <div className="loader-text">
          <span className="loading-text">Loading</span>
          <div className="loading-dots">
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </div>
        </div>
      </div>
    </div>
  );
}