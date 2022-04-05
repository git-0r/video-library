import { useState } from "react";
import { Link } from "react-router-dom";

const Navigation = () => {

    const [drawer, setDrawer] = useState(false);

    const toggleDrawer = () => setDrawer(state => !state);

    return (
        <>
            <nav className="navbar d-flex flex-justify-evenly flex-align-center">
                <div className="left-section d-flex flex-justify-evenly flex-align-center">
                    <div className="nav-drawer-toggle d-flex flex-center" onClick={toggleDrawer}>
                        <ion-icon name="menu-outline"></ion-icon>
                    </div>
                    <Link to="/" className="remove-link-style d-flex flex-center">
                        <ion-icon name="videocam-outline"></ion-icon>
                    </Link>
                </div>
                <div className="center-section d-flex flex-center">
                    <form className="search-form d-flex flex-center gap-1">
                        <input placeholder="search" className="search-input" />
                        <button className="d-flex flex-center navbar-search-button">
                            <ion-icon name="search" size="small"></ion-icon>
                        </button>
                    </form>
                </div>
                <div className="right-section d-flex flex-justify-evenly flex-align-center">
                    <ion-icon name="person-circle-outline"></ion-icon>
                    <ion-icon name="sunny"></ion-icon>
                </div>
            </nav>
            {
                drawer &&
                <div className="nav-drawer d-flex flex-center">
                    <div className="nav-drawer-item d-flex flex-align-center">
                        <ion-icon name="play-forward-outline" size="large"></ion-icon>
                        Playlists
                    </div>
                    <div className="nav-drawer-item d-flex flex-align-center">
                        <ion-icon name="time-outline" size="large"></ion-icon>
                        Watch Later
                    </div>
                    <div className="nav-drawer-item d-flex flex-align-center">
                        <ion-icon name="thumbs-up-outline" size="large"></ion-icon>
                        Likes
                    </div>
                    <div className="nav-drawer-item d-flex flex-align-center">
                        <ion-icon name="hourglass-outline" size="large"></ion-icon>
                        History
                    </div>
                </div>
            }
        </>
    )
}

export { Navigation };