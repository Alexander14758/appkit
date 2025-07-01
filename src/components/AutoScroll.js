import "./AutoScroll.css";
import { Link } from "react-scroll";

function AutoScroll() {
  return (
    <div className="App">
      <header>
        <nav className="panel card p-4 mb-4">
          <h2>LoGo</h2>

          <ul>
            <li>
              <Link to="home" smooth={true} offset={-430} duration={500}>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="how-it-works"
                smooth={true}
                offset={-430}
                duration={500}
              >
                How It Works
              </Link>
            </li>
            <li>
              <Link to="faq" smooth={true} offset={-430} duration={500}>
                FAQ
              </Link>
            </li>
            <li>
              <Link to="about" smooth={true} offset={-430} duration={500}>
                About
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        {/* All sections inside the same container */}
        <div className="content">
          <h1 className="content-header" id="home">
            Home
          </h1>
        </div>

        <div className="content">
          <h1 className="content-header" id="how-it-works">
            How It Works
          </h1>
          <p>
            1. Connect Your Wallet – Use MetaMask to link your Ethereum wallet.
            <br></br>
            2. Provide Liquidity – The more Ethereum you allocate, the higher
            your potential earnings.
            <br></br>
            3. Start Earning – Our automated system confirms transactions, and
            you earn from fees collected.
            <br></br>
            4. Withdraw Anytime – Easily withdraw your earnings to your wallet.
          </p>
        </div>

        <div className="content">
          <h1 className="content-header" id="faq">
            FAQ
          </h1>
          <p>
            1. How do I start earning? Simply connect your MetaMask wallet,
            provide liquidity, and let the system handle the rest.
            <br></br>
            2. <b>How much can I earn?</b>
            Earnings depend on the amount of Ethereum you provide. The more
            liquidity you add, the more you earn.
            <br></br>
            3. <b>Is there a minimum deposit?</b> No, you can start with any
            amount, but higher liquidity leads to better results.
            <br></br>
            4. <b>How do I withdraw my earnings?</b> You can withdraw your
            earnings anytime through the Withdraw section. 5. Is this safe? Yes,
            transactions are processed securely through smart contracts on the
            Ethereum blockchain. Let me know if you want to tweak anything!
          </p>
        </div>

        <div className="content">
          <h1 className="content-header" id="about">
            About
          </h1>
          <p>Learn more about us here...</p>
        </div>
      </main>
    </div>
  );
}

export default AutoScroll;
