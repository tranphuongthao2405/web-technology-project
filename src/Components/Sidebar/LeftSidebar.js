import React from "react";
import "./LeftSidebar.css";
import { Link } from "react-router-dom";
import LeftSidebarRow from "./LeftSidebarRow/LeftSidebarRow";

function LeftSidebar({ user }) {
  return (
    <div className="left__sidebar">
      <Link to="/">
        <LeftSidebarRow
          avatar
          imageLink={user?.photoURL}
          title={user?.displayName}
        />
      </Link>
      <LeftSidebarRow
        imageLink="https://static.xx.fbcdn.net/rsrc.php/v3/y9/r/7_gcmlwrelX.png"
        title="COVID-19 Information Centre"
      />
      <LeftSidebarRow
        imageLink="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/tSXYIzZlfrS.png"
        title="Find Friends"
      />
      <LeftSidebarRow
        imageLink="https://static.xx.fbcdn.net/rsrc.php/v3/yj/r/Im_0d7HFH4n.png"
        title="Groups"
      />
      <LeftSidebarRow
        imageLink="https://static.xx.fbcdn.net/rsrc.php/v3/y4/r/MN44Sm-CTHN.png"
        title="Marketplace"
      />
      <LeftSidebarRow
        imageLink="https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/FhOLTyUFKwf.png"
        title="Videos"
      />
      <LeftSidebarRow
        imageLink="https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/N7UOh8REweU.png"
        title="Events"
      />
      <LeftSidebarRow
        imageLink="https://static.xx.fbcdn.net/rsrc.php/v3/y-/r/Uy-TOlM5VXG.png"
        title="Memories"
      />
      <LeftSidebarRow
        imageLink="https://static.xx.fbcdn.net/rsrc.php/v3/yA/r/KlDlsO3UxDM.png"
        title="Saved"
      />
      <LeftSidebarRow dropdown imageLink="null" title="See more" />
      <div className="hr" />
      <div className="policies">
        <p>Privacy</p>
        <p className="dot">·</p>
        <p>Terms</p>
        <p className="dot">·</p>
        <p>Advertising</p>
        <p className="dot">·</p>
        <p>Ad choices</p>
        <i className="ads" />
        <p className="dot">·</p>
        <p>Cookies</p>
        <p className="dot">·</p>
        <p>More</p>
        <p className="dot">·</p>
        <p>Facebook © 2020</p>
      </div>
    </div>
  );
}

export default LeftSidebar;
