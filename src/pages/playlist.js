import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getPlaylist } from "../api-calls";
import { Navigation, usePlaylist, useUser, VideoListingCard } from "../exports";

const Playlist = () => {

    const [playlist, setPlaylist] = useState();
    const { playlists } = usePlaylist();
    const { user } = useUser();
    const { pathname } = useLocation();
    const playlistId = pathname.split("/")[2];

    useEffect(() => {
        (
            async () => {
                const data = await getPlaylist(playlistId);
                setPlaylist(data);
            }
        )()
    }, [playlists, playlistId])

    return (
        <>
            <Navigation />
            {
                user ? <>
                    <p className="heading-xl text-align-center">{playlist?.title}</p>
                    <div className="video-list-wrapper d-flex flex-justify-evenly flex-wrap gap-1">
                        {
                            playlist?.videos?.length > 0
                                ? playlist?.videos?.map(video => <VideoListingCard video={video} key={video._id} />)
                                : <div>
                                    <img src="https://res.cloudinary.com/clouduser/image/upload/c_scale,w_300/v1648733613/cart-is-empty_kspfhu.png" alt="empty" />
                                </div>
                        }
                    </div>

                </> : <p className="heading-xl text-align-center">Login to your account.</p>
            }
        </>
    )
}

export { Playlist };