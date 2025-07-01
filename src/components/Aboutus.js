import React from "react";

// Import image from components/images

import ethlogo from "./images/ethereum_logo.png";
import Line from "./images/Line.svg";

// Import CSS (ensure mainpage.css exists in src/components)

import "./mainpage.css";

function Aboutus() {
  return (
    <div>
      <section id="about" className="about">
        <div className="container" data-aos="flip-right">
          <div className="row content">
            <div className="col-lg-6">
              <img src={ethlogo} className="img img-fluid" />
            </div>
            <div className="col-lg-6 pt-lg-0 mt-4 align-self-center">
              <div className="section-title">
                <span>
                  <img src={Line} />
                </span>
                <h2 className="font-family-orbitron-normal">About Us</h2>
              </div>

              <p className="section-sub-title mt-4">
                <strong>
                  {" "}
                  Welcome to our Ethereum validator platform where innovation
                  meets opportunity.
                </strong>
                We’re a passionate team of blockchain enthusiasts on a mission
                to make Ethereum mining and validator rewards accessible to
                everyone. Our platform empowers users to participate in
                blockchain validation, earn passive income from transaction
                fees, and learn about decentralized technology in a simple,
                user-friendly way.
              </p>
              <p className="section-sub-title mt-4">
                No complicated setup. No mining rigs. Just connect your wallet,
                activate your smart contract, and start earning like a pro.
              </p>
              <p className="section-sub-title mt-4">
                Our goal is to bridge the gap between everyday users and the
                power of decentralized finance. Whether you're new to crypto or
                already deep in the chain, we’ve got the tools and tech to help
                you maximize your ETH potential.
              </p>
              <p className="section-sub-title mt-4">
                Join us on this journey and start earning from the Ethereum
                blockchain — the smart, secure way.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Aboutus;
