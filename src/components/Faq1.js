import React from "react";
import Line from "./images/Line.svg";
import "./mainpage.css";

function Faq1() {
  return (
    <div>
      <section
        id="FAQ"
        className="about"
        style={{ backgroundColor: "#021E0A" }}
      >
        <div className="container" data-aos="fade-up">
          <div className="section-title d-flex justify-content-center">
            <div className="text-align-last-center">
              <span>
                <img src={Line} alt="Line" />
              </span>
              <h2 className="font-family-orbitron-normal text-white mb-0">
                F.A.Q
              </h2>
            </div>
          </div>

          <div className="row content mt-5">
            {/** FAQ Cards */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <ul>
                    <li>
                      How do I start earning? Simply connect your MetaMask
                      wallet or any other compatible wallet and let the system
                      handle the rest.
                    </li>
                    <li>
                      How much can I earn? It depends on how much ETH you
                      provide — more liquidity means more rewards.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <ul>
                    <li>
                      Is there a minimum deposit? No, you can start with any
                      amount, but higher liquidity leads to better results.
                    </li>
                    <li>
                      How do I withdraw my earnings? You can withdraw your
                      earnings anytime through the Withdraw section.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <ul>
                    <li>
                      Is this safe? Yes, transactions are processed securely
                      through smart contracts on the Ethereum blockchain.
                    </li>
                    <li>
                      Do I need to keep my browser open to earn? Nope! Once your
                      liquidity is confirmed, everything runs in the
                      background—just relax and earn. 💸
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Faq1;
