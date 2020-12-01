import React, { useState, useRef, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import ProfileMenu from "./Components/ProfileMenu";
import { CATEGORIES, LOGIN_PROFILE_MENUS } from "./navdata";
import { theme } from "../../styles/theme";

const Navtrans = ({ themeColor }) => {
  const [profileVisible, setProfileVisible] = useState(false);
  const [isInputFocused, setInputFocused] = useState(false);
  const [isLogined, setIsLogined] = useState(false);

  const profileImageRef = useRef(null);

  const handleProfilePicClick = useCallback(() => {
    setProfileVisible(!profileVisible);
  }, [profileVisible]);

  useEffect(() => {
    if (localStorage.getItem("token")) setIsLogined(true);
  }, []);

  return (
    <NavContainer>
      <Navbar themeColor={themeColor}>
        <div className="navLeft">
          <Link to="/">
            <LogoImage themeColor={themeColor} />
          </Link>
          <div className="searchBar">
            <BsSearch
              className="searchIcon"
              size="1em"
              color={themeColor === "normal" || isInputFocused ? "gray" : "white"}
            />
            <input
              type="text"
              placeholder="여행지나 상품을 검색해보세요"
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
            />
          </div>
        </div>
        {isLogined ? (
          <>
            <LoginProfileBar themeColor={themeColor}>
              {LOGIN_PROFILE_MENUS.map((menu) => (
                <p key={menu.id}>{menu.name}</p>
              ))}
              <div className="profileImageContainer" ref={profileImageRef}>
                <FaUserCircle
                  className="userIcon"
                  onClick={handleProfilePicClick}
                  size="2em"
                  color={themeColor === "normal" ? "gray" : theme.transparentWhite}
                />
              </div>
            </LoginProfileBar>
            <ProfileMenu
              visible={profileVisible ? "visible" : ""}
              setProfileVisible={setProfileVisible}
              profileImageRef={profileImageRef}
              setIsLogined={setIsLogined}
            />
          </>
        ) : (
          <LogoutProfileBar themeColor={themeColor}>
            <p>파트너 등록하기</p>
            <p>
              <Link to="/login">로그인</Link>
            </p>
            <p className="signUpButton">
              <Link to="/signup">회원가입</Link>
            </p>
          </LogoutProfileBar>
        )}
      </Navbar>
      <NavBottom themeColor={themeColor}>
        {CATEGORIES.map((category) => (
          <div className="categoryItem" key={category.id}>
            <p className={category.name === "항공권" ? "selected" : ""}>{category.name}</p>
          </div>
        ))}
      </NavBottom>
    </NavContainer>
  );
};

const LogoImage = styled.img.attrs((props) => ({
  alt: "my little trip logo",
  src: props.themeColor === "normal" ? "/images/logo.png" : "/images/logo_white.png",
}))`
  width: 128px;
  margin: 0 20px;
`;

const NavContainer = styled.div`
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 1060px;
  height: 72px;
  margin: 0 auto;
  background-color: rgba(0, 0, 0, 0);

  .navLeft {
    display: flex;
    align-items: center;

    .searchBar {
      display: flex;
      align-items: center;
      position: relative;

      .searchIcon {
        position: absolute;
        left: 23px;
      }

      input {
        width: 330px;
        height: 48px;
        margin-left: 10px;
        padding-left: 40px;
        color: ${(props) => (props.themeColor === "normal" ? "rgba(0,0,0,0.8)" : "white")};
        background-color: ${(props) =>
          props.themeColor === "normal" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.15)"};
        font-size: 15px;
        border-radius: 4px;
        transition: ease-in-out 0.5s;

        &::placeholder {
          color: ${(props) => (props.themeColor === "normal" ? "rgba(0,0,0,0.5)" : theme.transparentWhite)};
        }

        &:hover {
          background-color: ${(props) =>
            props.themeColor === "normal" ? "rgba(136, 16, 16, 0.06)" : "rgba(255, 255, 255, 0.25)"};
        }

        &:focus {
          outline: none;
          background-color: white;
          color: rgba(0, 0, 0, 0.8);
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.12);
          transition: ease-in-out 0.5s;
        }
      }
    }
  }

  .profileBar {
    display: flex;
    align-items: center;

    p {
      margin-right: 20px;
      font-size: 15px;
      color: ${(props) => (props.themeColor === "normal" ? "#666d75" : theme.transparentWhite)};
      cursor: pointer;
    }

    .userIcon {
      cursor: pointer;
    }
  }
`;

const NavBottom = styled.nav`
  display: flex;
  justify-content: center;
  height: 35px;
  margin: 10px 300px 0 0;

  @media screen and (max-width: 1000px) {
    margin: 10px 0 0 0;
  }

  .categoryItem {
    padding: 0 10px;

    p {
      padding: 0 7px 15px 7px;
      color: ${(props) => (props.themeColor === "normal" ? theme.darkGray : "rgba(255,255,255,0.7)")};
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: ease-in-out 0.2s;
      border-bottom: 4px solid rgba(255, 255, 255, 0);

      &:hover {
        border-bottom: 4px solid
          ${(props) => (props.themeColor === "normal" ? theme.lightBlue : "rgba(255,255,255,0.5)")};
        transition: ease-in-out 0.2s;
      }

      &.selected {
        text-align: center;
        color: ${(props) => (props.themeColor === "normal" ? "#495056" : "white")};
        border-bottom: 4px solid ${(props) => (props.themeColor === "normal" ? "#3c92e0" : "white")};
      }
    }
  }
`;

const LoginProfileBar = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-right: 20px;
    font-size: 15px;
    color: ${(props) => (props.themeColor === "normal" ? "#666d75" : theme.transparentWhite)};
    cursor: pointer;
  }

  .userIcon {
    cursor: pointer;
  }
`;

const LogoutProfileBar = styled.div`
  display: flex;
  align-items: center;

  p {
    margin-left: 30px;
    color: ${(props) => (props.themeColor === "normal" ? "#666d75" : theme.transparentWhite)};
    font-size: 15px;
    cursor: pointer;

    a {
      color: ${(props) => (props.themeColor === "normal" ? "#666d75" : theme.transparentWhite)};
    }

    &.signUpButton {
      padding: 9px 30px 7px 30px;
      border: 1px solid ${(props) => (props.themeColor === "normal" ? theme.deepBlue : theme.transparentWhite)};
      a {
        color: ${(props) => (props.themeColor === "normal" ? theme.deepBlue : theme.transparentWhite)};
      }
    }
  }
`;

export default Navtrans;