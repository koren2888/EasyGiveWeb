import React, { useEffect, useRef } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FiHeart } from "react-icons/fi";
import { MdOutlineAccountCircle, MdOutlineLibraryBooks } from "react-icons/md";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";

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
      overlay={<Tooltip id={styles.tooltip_message}>{tooltip}</Tooltip>}
      placement="bottom"
      delayShow={300}
      delayHide={150}
    >
      <Link to={href} className={className}>{children}</Link>
    </OverlayTrigger>
  );

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to={"/"} className={styles.logo}>
          Easy Give
        </Link>
        <div className={styles.menu}>
          <LinkWithTooltip tooltip="Favorites" href={"/basket"} className={styles.menu_icon_box}>
              <FiHeart className={styles.menu_icon} />
              {5 > 0 && <span className={styles.badge_favorites}>{5}</span>}
          </LinkWithTooltip>
          <LinkWithTooltip tooltip="My Items" href={"/my-items"} className={styles.menu_icon_box}>
            <MdOutlineLibraryBooks className={styles.menu_icon} />
          </LinkWithTooltip>
          <LinkWithTooltip tooltip="Account" href={"#"} className={styles.menu_icon_box}>
            <MdOutlineAccountCircle className={styles.menu_icon} />
          </LinkWithTooltip>          
        </div>
      </nav>
    </header>
  );
}

export default Header;
