import React, { useEffect, useRef } from "react";
import "./Header.css";
import { FiHeart } from "react-icons/fi";
import { MdOutlineAccountCircle, MdOutlineLibraryBooks } from "react-icons/md";
import { Link } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function Header(props) {
  // run only if state changes and Not Mount
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      setTimeout(() => {}, 1000);
    } else {
      didMount.current = true;
    }
  }, [props.cartProducts]);

  const LinkWithTooltip = ({ children, href, tooltip, className }) => (
    <OverlayTrigger
    overlay={<Tooltip id="tooltip_message">{tooltip}</Tooltip>}
    placement="bottom"
    delayShow={300}
    delayHide={150}
    >
      <Link to={href} className={className}>{children}</Link>
    </OverlayTrigger>
  );

  return (
    <header className="header">
      <nav className="nav">
        <Link to={"/"} className="logo">
          Easy Give
        </Link>
        <div className="menu">
          <LinkWithTooltip tooltip="Favorites" href={"/basket"} className="menu_icon_box">
              <FiHeart className="menu_icon" />
              {5 > 0 && <span className="badge_shop">{5}</span>}
          </LinkWithTooltip>
          <LinkWithTooltip tooltip="My Items" href={"/my-items"} className="menu_icon_box">
            <MdOutlineLibraryBooks className="menu_icon" />
          </LinkWithTooltip>
          <LinkWithTooltip tooltip="Account" href={"#"} className="menu_icon_box">
            <MdOutlineAccountCircle className="menu_icon" />
          </LinkWithTooltip>          
        </div>
      </nav>
    </header>
  );
}

export default Header;
