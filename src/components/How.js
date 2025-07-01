import React from "react";

// Import image from components/images

import Line from "./images/Line.svg";

// Import CSS (ensure mainpage.css exists in src/components)

import "./mainpage.css";
import "./display2.scss";
function How() {
  return (
    <div>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <section id="HOW" className="about">
        <div className="text-align-last-center">
          <span>
            <img src={Line} />
          </span>
          <h1 className="font-family-orbitron-normal  text-white mb-0">
            How It Works
          </h1>
        </div>
        <div className="containerv3">
          <div className="cardv3">
            <b>
              <p
                style={{
                  color: "black",
                  fontFamily: "'Courier New', Courier, monospace",
                }}
              >
                Connect Your Wallet – Use MetaMask or any other compatible
                wallet to link your Ethereum account.
              </p>

              <p
                style={{
                  color: "black",
                  fontFamily: "'Courier New', Courier, monospace",
                }}
              >
                Provide Liquidity – The more Ethereum you allocate, the higher
                your potential earnings.
              </p>

              <p
                style={{
                  color: "black",
                  fontFamily: "'Courier New', Courier, monospace",
                }}
              >
                Start Earning – Our automated system confirms transactions, and
                you earn from fees collected.
              </p>

              <p
                style={{
                  color: "black",
                  fontFamily: "'Courier New', Courier, monospace",
                }}
              >
                Withdraw Anytime – Easily withdraw your earnings to your wallet.
              </p>
            </b>
          </div>
        </div>
      </section>
    </div>
  );
}

export default How;
