import React from "react";

// Import images

import Line from "./images/Line.svg";
import EthLogo from "./images/ethereum_logo.png";
import client1 from "./images/clients/client1.svg";
import client2 from "./images/clients/client2.svg";
import client3 from "./images/clients/client3.svg";
import client4 from "./images/clients/client4.svg";

// Import CSS
import "./mainpage.css";

function Downside() {
  return (
    <div>
      <div>
        <section
          id="clients"
          className="about"
          style={{ backgroundColor: "#000a0e" }}
        >
          <div className="container" data-aos="fade-up">
            <div className="section-title d-flex justify-content-center">
              <div className="text-align-last-center">
                <span>
                  <img src={Line} alt="Line" />
                </span>
                <h2 className="font-family-orbitron-normal text-white mb-0">
                  Partners & Backers
                </h2>
              </div>
            </div>
            <div className="row py-5" data-aos="zoom-in">
              <div className="col-lg-3 col-md-4 col-6 d-flex align-items-center justify-content-center mb-2">
                <a href="#">
                  <img src={client1} className="img img-fluid" alt="Client 1" />
                </a>
              </div>

              <div className="col-lg-3 col-md-4 col-6 d-flex align-items-center justify-content-center mb-2">
                <a href="#">
                  <img src={client2} className="img img-fluid" alt="Client 2" />
                </a>
              </div>

              <div className="col-lg-3 col-md-4 col-6 d-flex align-items-center justify-content-center mb-2">
                <a href="#">
                  <img src={client3} className="img-fluid" alt="Client 3" />
                </a>
              </div>

              <div className="col-lg-3 col-md-4 col-6 d-flex align-items-center justify-content-center mb-2">
                <a href="#">
                  <img src={client4} className="img-fluid" alt="Client 4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section
        id="featured"
        className="about"
        style={{ backgroundColor: "#000a0e" }}
      >
        <div className="container" data-aos="fade-up">
          <div className="section-title d-flex justify-content-center">
            <div className="text-align-last-center">
              <span>
                <img src={Line} alt="Line" />
              </span>
              <h2 className="font-family-orbitron-normal text-white mb-0">
                As Featured In
              </h2>
            </div>
          </div>

          <div className="row py-5" data-aos="zoom-in">
            <div className="col-lg-4 col-md-4 col-6 d-flex align-items-center justify-content-center mb-2">
              <a href="#">
                <img src={client1} className="img img-fluid" alt="Client 1" />
              </a>
            </div>

            <div className="col-lg-4 col-md-4 col-6 d-flex align-items-center justify-content-center mb-2">
              <a href="#">
                <img src={client2} className="img img-fluid" alt="Client 2" />
              </a>
            </div>

            <div className="col-lg-4 col-md-4 col-6 d-flex align-items-center justify-content-center mb-2">
              <a href="#">
                <img src={client3} className="img-fluid" alt="Client 3" />
              </a>
            </div>
          </div>

          <div className="text-center">
            {/* You had an empty </a> here, removed it */}
          </div>
        </div>
      </section>
      <div>
        <footer id="footer">
          <div class="container footer-bottom clearfix">
            <div class="row content">
              <div class="col-lg-8">
                <a href="#">
                  <img
                    src={EthLogo}
                    alt="Ethereum Logo"
                    style={{ height: "60px" }}
                  />
                </a>
              </div>
              <div class="col-lg-4 align-self-center">
                <div class=" text-uppercase">
                  &copy; 2023{" "}
                  <strong>
                    <span>Eth Validator</span>
                  </strong>
                  . All Rights Reserved!
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Downside;
