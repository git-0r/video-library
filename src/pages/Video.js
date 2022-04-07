import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Footer, Navigation, useNotification, useUser } from "../exports";
import { addToHistory, getVideoById } from "../api-calls";

const Video = () => {

    const { id } = useParams();
    const [video, setVideo] = useState();
    const { user } = useUser();
    const { notificationHandler } = useNotification();


    useEffect(() => {

        try {

            (
                async () => {
                    const data = await getVideoById(id);
                    setVideo(data);

                    user && addToHistory(id, user);
                }
            )()
        } catch (error) {
            notificationHandler(error.message);
        }
    }, [])

    return (
        <>
            <Navigation />
            <section className="video-section d-flex flex-dir-column">
                <video controls src={video?.url} className="video" />
                <p className="text-xl">{video?.title}</p>
                <div className="d-flex flex-justify-evenly video-stats-container">
                    <p className="video-views">{video?.views} views</p>
                    <div className="d-flex flex-align-center flex-justify-evenly video-likes">
                        <div className="d-flex flex-center gap-1">
                            <ion-icon name="thumbs-up-outline" size="large"></ion-icon>
                            {video?.likes}
                        </div>
                        <div className="d-flex flex-center gap-1">
                            <ion-icon name="thumbs-down-outline" size="large"></ion-icon>
                            {video?.dislikes}
                        </div>
                    </div>
                </div>
                <p>{video?.description}</p>
            </section>
            <Footer />
        </>
    )
}

export { Video };