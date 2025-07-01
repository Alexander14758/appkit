import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import { GiMining } from "react-icons/gi";
import { IoIosHome } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { MdHelpCenter } from "react-icons/md";
import { MdQuestionAnswer } from "react-icons/md";
import Ethlogo1 from "./ethereum_logo1.png";

import "../pages/Dashnav.css";

function Header() {
  const menuIconRef = useRef(null);
  const navbarRef = useRef(null);
  const navbgRef = useRef(null);

  useEffect(() => {
    const menuIcon = menuIconRef.current;
    const navbar = navbarRef.current;
    const navbg = navbgRef.current;

    const handleToggle = () => {
      menuIcon.classList.toggle("bx-x");
      navbar.classList.toggle("active");
      navbg.classList.toggle("active");
    };

    if (menuIcon) {
      menuIcon.addEventListener("click", handleToggle);
    }

    return () => {
      if (menuIcon) {
        menuIcon.removeEventListener("click", handleToggle);
      }
    };
  }, []);

  return (
    <>
      <header className="header">
        <a href="#" className="logo">
          <img src={Ethlogo1} alt="Ethereum Logo" style={{ height: "65px" }} />
        </a>

        <i className="bx bx-menu" id="menu-icon" ref={menuIconRef}></i>

        <nav className="navbar" ref={navbarRef}>
          <a href="#">
            Home
            <IoIosHome />
          </a>
          <a href="#HOW">
            How It Works
            <MdHelpCenter />
          </a>
          <a href="#FAQ">
            F.A.Q
            <MdQuestionAnswer />
          </a>
          <a href="#about">
            ABOUT
            <FcAbout />
          </a>
          <a href="/Dashboard">
            <GiMining />
            Start Validating <GiMining />
          </a>
        </nav>
      </header>

      <div className="nav-bg" ref={navbgRef}></div>
    </>
  );
}

export default Header;
