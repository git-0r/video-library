import { Link } from "react-router-dom"
import { useState } from "react"

const VideoListingCard = ({ video }) => {

    const [videoOptions, setVideoOptions] = useState(false);

    const toggleVideoOptions = () => setVideoOptions(state => !state);

    return (
        <div className="video-container d-flex">
            <Link to={`/video/${"id"}`} className="remove-link-style">
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
                            <li className="video-options-list-item">Watch later</li>
                        </ul>
                    }
                </div>
            </div>
        </div>
    )
}

export { VideoListingCard }