import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { useHistory, useNotification, useUser, useWatchLater } from "../exports";
import { addToWatchLater, removeFromHistory, removeFromWatchLater } from "../api-calls";

const VideoListingCard = ({ video }) => {

    const [videoOptions, setVideoOptions] = useState(false);
    const { user } = useUser();
    const navigate = useNavigate();
    const { notificationHandler } = useNotification();
    const { watchLater, updateWatchLater } = useWatchLater();
    const { pathname } = useLocation();
    const { setHistory } = useHistory();

    const toggleVideoOptions = () => setVideoOptions(state => !state);


    const handleWatchLater = async (action) => {

        try {
            if (user) {
                const data = action === "ADD"
                    ? await addToWatchLater(video._id, user)
                    : await removeFromWatchLater(video._id, user);

                updateWatchLater(data);
                notificationHandler(action === "ADD" ? "Added" : "Removed")
            }
            else {
                navigate("/auth/login")
            }

        } catch (error) {
            notificationHandler(error.message);
        }
    }

    const updateHistory = async () => {
        const updatedHistory = await removeFromHistory(video._id, user);
        setHistory(updatedHistory);
        notificationHandler("Removed from history");
        try {

        } catch (error) {
            notificationHandler(error.message);
        }
    }

    return (
        <div className="video-container d-flex">
            <Link to={`/video/${video._id}`} className="remove-link-style">
                <div className="video-thumb-wrapper">
                    <img className="video-thumb" src={video?.image} alt="video-title" />
                    <div className="video-thumb-overlay d-flex flex-center" >
                        <ion-icon name="play-circle"></ion-icon>
                    </div>
                </div>
            </Link>
            <div className="d-flex flex-align-center flex-justify-between video-info">
                <img className="uploader-img" src="https://picsum.photos/50" alt="uploader-thumb" />
                <div className="d-flex flex-dir-column">
                    <p className="video-title">{video ? video.title : "Loading..."}</p>
                    <p className="text-xs view-count">{video ? `${video.views} views` : "Loading..."}</p>
                </div>
                <div className="video-options-list">
                    <div onClick={toggleVideoOptions}>
                        <ion-icon name="ellipsis-vertical"></ion-icon>
                    </div>
                    {
                        videoOptions &&
                        <ul className="video-options-list-items">
                            <li className="video-options-list-item">Add to playlist</li>
                            {
                                watchLater?.videos?.includes(video?._id)
                                    ? < li className="video-options-list-item" onClick={() => handleWatchLater("REMOVE")}>Remove from Watch later</li>
                                    : <li className="video-options-list-item" onClick={() => handleWatchLater("ADD")}>Watch later</li>
                            }
                            {
                                pathname?.includes("history") && <li className="video-options-list-item" onClick={updateHistory}>Remove from history</li>
                            }
                        </ul>
                    }
                </div>
            </div>
        </div>
    )
}

export { VideoListingCard }