import React, { useState, useContext } from "react";
import Logo from "../../assets/landing-page/logo.png";
import Search from "../../assets/landing-page/search.png";
import Cart from "../../assets/landing-page/cart.png";
import Profile from "../../assets/landing-page/profile.png";
import "../../styles/landing/navbar.scss";
import { Link } from "react-router-dom";
import NavbarContext from "../../context/navbar_context";
import { useCartContext } from "../../context/cart_context";

const Navbar = () => {
  // const searchItem = e.target.value;
  const { keyWord, changeKeyWord } = useContext(NavbarContext);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { cart } = useCartContext();
  const [showLinks, setShowLinks] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [status, setStatus] = useState("close");
  const [profileMenu, setProfileMenu] = useState({
    opacity: "0",
  });
  const [marketPlaceMenu, setMarketPlaceMenu] = useState({
    opacity: "0",
    zIndex: "-100",
  });
  const showDropDown = () => {
    setMarketPlaceMenu({
      opacity: "1",
      zIndex: "2",
    });
  };
  const hideDropDown = () => {
    setMarketPlaceMenu({
      opacity: "0",
      zIndex: "-100",
    });
  };

  return (
    <section className="navbar">
      {/* start logo */}
      <Link to="/">
        <img className="logo" src={Logo} alt="kika logo" />
      </Link>

      <section className="nav__rightSection">
        {/* start navlinks */}
        <ul className="nav__linksContainer">
          <li>
            <Link to="/home">Home</Link>
          </li>

          <li onMouseEnter={showDropDown} onMouseLeave={hideDropDown}>
            <Link to="/products">MarketPlace</Link>
          </li>
          <Link to="/aboutus">
            <li>About Us</li>
          </Link>
          <Link to="/vendor/signup">
            <li>Sell on KIKA</li>
          </Link>
        </ul>
        {/*end navlinks */}

        {/* start drop downs */}
        <div
          className="marketPlace__dropDown"
          style={marketPlaceMenu}
          onMouseEnter={showDropDown}
          onMouseLeave={hideDropDown}
        >
          <Link to="/products/men">
            <div onClick={hideDropDown}>
              <p>Shop Men</p>
            </div>
          </Link>
          <Link to="/products/women">
            <div onClick={hideDropDown}>
              <p>Shop Women</p>
            </div>
          </Link>
        </div>

        <div
          className="profile__dropDown"
          style={profileMenu}
          onMouseEnter={() => {
            setProfileMenu({
              opacity: "1",
              zIndex: "2",
            });
          }}
          onMouseLeave={() => {
            setProfileMenu({
              opacity: "0",
              zIndex: "-100",
            });
          }}
        >
          <Link to="/buyer/signin">
            <div
              onClick={() =>
                setProfileMenu({
                  opacity: "0",
                })
              }
            >
              <p>Sign in</p>
            </div>
          </Link>
          <Link to="/buyer/signup">
            <div
              onClick={() =>
                setProfileMenu({
                  opacity: "0",
                  zIndex: "-100",
                })
              }
            >
              <p>Sign up</p>
            </div>
          </Link>

          <Link to="/user/account">
            <div
              onClick={() =>
                setProfileMenu({
                  opacity: "0",
                  zIndex: "-100",
                })
              }
            >
              <p>Account</p>
            </div>
          </Link>
        </div>
        {/* end drop downs */}

        {/* start search form */}
        <form className="nav__searchForm" onSubmit={handleSubmit}>
          <input
            className="nav__searchBar show-modal"
            type="text"
            placeholder="Search"
            onChange={changeKeyWord}
          />
          <Link to="/search">
            <button
              className="span"
              type="submit"
              onClick={() => {
                setShowSearch(!showSearch);
              }}
            >
              <img className="nav__searchIcon" src={Search} alt="Search Icon" />
            </button>
          </Link>
        </form>
        {/* end search form */}

        {/** start sign in cart and toggle */}
        <section className="nav__profile">
          <div
            className="profile__imgContainer"
            onMouseEnter={() => {
              setProfileMenu({
                opacity: "1",
              });
            }}
            onMouseLeave={() => {
              setProfileMenu({
                opacity: "0",
                zIndex: "-100",
              });
            }}
          >
            <i class="fa fa-user fa-2x"></i>
          </div>
          <Link to="/mycart">
            <div className="cart">
              <i class="fas fa-shopping-cart" style={{ fontSize: "25px" }}></i>
              <span
                style={{
                  display: "inline-flex",
                  height: "20px",
                  width: "20px",
                  justifyContent: "center",
                  background: "#f15a24",
                  alignItems: "center",
                  color: "white",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "-0.85rem",
                  right: "-0.85rem",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {cart.length}
              </span>
            </div>
          </Link>

          <div
            className="nav__sidebarToggle"
            onClick={() => {
              setShowLinks(!showLinks);
              setStatus(status === "open" ? "close" : "open");
            }}
          >
            <div className={`${status} line line1`}></div>
            <div className={`${status} line line2`}></div>
            <div className={`${status} line line3`}></div>
          </div>
        </section>
        {/* end signIn cart and toggle */}

        {/* ========= start mobile sidebar =========== */}
        <ul
          onClick={() => {
            setShowLinks(!showLinks);
            setStatus("close");
          }}
          className={`${
            showLinks ? "mobile__sideBar show__sideBar" : "mobile__sideBar"
          }`}
        >
          <Link to="/home">
            <li>Home</li>
          </Link>
          <Link to="/marketplace">
            <li>Market Place</li>
          </Link>
          <Link to="/aboutus">
            <li>About Us</li>
          </Link>
          <Link to="/vendor/signup">
            <li>Sell on KIKA</li>
          </Link>
          <li>
            <button className="btn">Sign up</button>
          </li>
          <li>
            <button className="btn">Sign in</button>
          </li>
        </ul>
        {/* end mobile sidebar */}

        <div
          className={`${
            showSearch ? "mobile__search show__mobileSearch" : "mobile__search"
          }`}
        >
          <input
            type="text"
            placeholder="Search for anything"
            className="searchBar"
          />
          <img src={Search} alt="search logo" />
        </div>
      </section>
    </section>
  );
};
export default Navbar;
