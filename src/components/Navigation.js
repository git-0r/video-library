import { useState } from "react";
import { Link } from "react-router-dom";
import { useNotification, useUser, useWatchLater } from "../exports";

const Navigation = () => {

    const [drawer, setDrawer] = useState(false);
    const { user, setUser } = useUser();
    const { notificationHandler } = useNotification();
    const { updateWatchLater } = useWatchLater();


    const toggleDrawer = () => setDrawer(state => !state);

    const logout = () => {

        try {

            localStorage.clear();
            setUser({ type: "LOGOUT" });
            updateWatchLater();
            notificationHandler("Logged out!")
        } catch (error) {
            notificationHandler(error.message)
        }
    }

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
                    {
                        user
                            ? <button className="btn btn-secondary" onClick={logout}>Logout</button>
                            : <Link to="/auth/login" className="remove-link-style btn btn-primary">Login</Link>
                    }
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
                    <Link to={`/watchlater/${user?._id}`} className="nav-drawer-item remove-link-style d-flex flex-align-center">
                        <ion-icon name="time-outline" size="large"></ion-icon>
                        Watch Later
                    </Link>
                    <div className="nav-drawer-item d-flex flex-align-center">
                        <ion-icon name="thumbs-up-outline" size="large"></ion-icon>
                        Likes
                    </div>
                    <Link to={`/history/${user?._id}`} className="nav-drawer-item d-flex flex-align-center remove-link-style">
                        <ion-icon name="hourglass-outline" size="large"></ion-icon>
                        History
                    </Link>
                </div>
            }
        </>
    )
}

export { Navigation };