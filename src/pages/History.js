import { useEffect, useState } from "react";
import { deleteHistory, getHistory } from "../api-calls";
import { Footer, Navigation, useNotification, useUser, VideoListingCard } from "../exports";

const History = () => {

    const { user } = useUser();
    const [history, setHistory] = useState();
    const { notificationHandler } = useNotification();

    useEffect(() => {

        async function getUserHistory(user) {

            const data = await getHistory(user);
            setHistory(data);
        }
        user && getUserHistory(user);
    }, [])

    const clearUserHistory = async () => {

        try {
            await deleteHistory(user);
            setHistory(null);
            notificationHandler("History cleared");

        } catch (error) {
            notificationHandler(error.message);
        }
    }

    return (
        <>
            <Navigation />
            {
                user
                    ? (
                        <>
                            <div className="d-flex flex-center flex-dir-column">
                                <h1>History</h1>
                                <button className="btn btn-secondary" disabled={!user} onClick={clearUserHistory}>Clear history</button>
                            </div>
                            <div className="video-list-wrapper d-flex flex-justify-evenly flex-wrap gap-1">
                                {
                                    history?.videos?.length > 0
                                        ? history?.videos?.map(video => <VideoListingCard video={video} key={video._id} />)
                                        : <div>
                                            <img src="https://res.cloudinary.com/clouduser/image/upload/c_scale,w_300/v1648733613/cart-is-empty_kspfhu.png" alt="empty" />
                                        </div>
                                }
                            </div>
                        </>
                    )
                    : <p className="heading-xl text-align-center">Login to your account.</p>
            }
            <Footer />
        </>
    )
}

export { History };