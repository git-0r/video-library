import { useEffect, useState } from "react";
import { getLikes } from "../api-calls";
import { Navigation, useNotification, useUser, VideoListingCard } from "../exports";

const Likes = () => {

    const { notificationHandler } = useNotification();
    const [likes, setLikes] = useState();
    const { user } = useUser();

    useEffect(() => {

        try {
            async function getUserLikes(user) {

                const data = await getLikes(user);
                setLikes(data);
            }
            user ? getUserLikes(user) : setLikes(null);
        } catch (error) {
            notificationHandler(error.message);
        }

    }, [])

    return (
        <>
            <Navigation />
            {
                user
                    ? (
                        <main>
                            <h1 className="text-align-center">Your Likes</h1>
                            <div className="video-list-wrapper d-flex flex-justify-evenly flex-wrap gap-1">
                                {
                                    likes?.videos?.length > 0
                                        ? likes?.videos?.map(video => <VideoListingCard video={video} key={video._id} />)
                                        : <div>
                                            <img src="https://res.cloudinary.com/clouduser/image/upload/c_scale,w_300/v1648733613/cart-is-empty_kspfhu.png" alt="empty" />
                                        </div>
                                }
                            </div>
                        </main>
                    )
                    : <p className="heading-xl text-align-center">Login to your account.</p>
            }
        </>
    )
}

export { Likes };