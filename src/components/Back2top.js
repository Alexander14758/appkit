import React from "react";

// Import image from components/images

// Import CSS (ensure mainpage.css exists in src/components)

import "./mainpage.css";

function Back2top() {
  return (
    <div>
      <div id=" preloader"></div>
      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short"></i>
      </a>
    </div>
  );
}

export default Back2top;
