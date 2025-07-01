import React from "react";
import { Link } from "react-router-dom";

// Import image from components/images
import ethHand from "./images/eth_hand.png";

// Import CSS (ensure mainpage.css exists in src/components)

import "./mainpage.css";

function Hero() {
  return (
    <div>
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1"
              data-aos="fade-right"
            >
              <h1 className="font-family-orbitron-normal">
                Welcome to Ethereum Validator
              </h1>
              <h5 className="mt-4">
                Where you earn Ethereum by acting as a validator on the
                blockchain. Our system automates transaction processing,
                allowing you to confirm transactions and collect fees as
                rewards. The more liquidity you provide, the more transactions
                you validate, and the higher your earnings grow. Start earning
                effortlessly today ⛏connect your wallet and let the blockchain
                work for you.
              </h5>
              <div>
                <div>
                  <Link to="/Dashboard">
                    <button
                      className="btn-dark-blue"
                      style={{ width: "150px", marginTop: "15px" }}
                    >
                      Start Validating
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div
              className="col-lg-6 order-1 order-lg-2 hero-img for-desktok-frog-img"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <img
                src={ethHand}
                className="img img-fluid animated"
                alt="Ethereum Hand"
                width="600"
                loading="lazy"
              />
            </div>
          </div>
          <div
            className="col-lg-6 order-1 order-lg-2 for-mobile-frog-img"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <img
              src={ethHand}
              className="img img-fluid animated"
              alt="Ethereum Hand"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
