import { useEffect, useState } from "react";
import { getWatchLaterVideos } from "../api-calls";
import { Navigation, useNotification, useUser, useWatchLater, VideoListingCard } from "../exports";

const WatchLater = () => {

    const { watchLater } = useWatchLater();
    const [videos, setVideos] = useState([]);
    const { notificationHandler } = useNotification();
    const { user } = useUser();

    useEffect(() => {

        try {
            (
                async () => {
                    if (user) {
                        const data = await getWatchLaterVideos(user);
                        setVideos(data.videos);
                    }
                }
            )()
        }
        catch (error) {
            notificationHandler(error.message)
        }
    }, [watchLater])

    return (
        <>
            <Navigation />
            <main>
                {
                    user
                        ? (
                            <main>
                                <h1 className="text-align-center">Watch Later</h1>

                                <div className="video-list-wrapper d-flex flex-justify-evenly flex-wrap gap-1">
                                    {
                                        videos?.length > 0
                                            ? videos?.map(video => <VideoListingCard video={video} key={video._id} />)
                                            : <div>
                                                <img src="https://res.cloudinary.com/clouduser/image/upload/c_scale,w_300/v1648733613/cart-is-empty_kspfhu.png" alt="empty cart" />
                                            </div>
                                    }
                                </div>
                            </main>
                        )
                        : <p className="heading-xl text-align-center">Login to your account.</p>
                }
            </main>
        </>
    )
}

export { WatchLater };