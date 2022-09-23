import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import { LinkOffSharp } from "@mui/icons-material";
export default function Footer() {
  const [value, setValue] = React.useState(1);
  return (
    <>
      <BottomNavigation
        className="footer"
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        {/* <Link to="/recent"> */}
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        {/* </Link> */}
        {/* <Link to="/Home"> */}
        <BottomNavigationAction
          label="Home"
          icon={<FavoriteIcon />}
          href="/home"
        />
        {/* </Link> */}
        {/* <Link to="/account"> */}
        <BottomNavigationAction
          label="Account"
          href="/account"
          icon={<LocationOnIcon />}
        />
        {/* </Link> */}
      </BottomNavigation>
    </>
  );
}
