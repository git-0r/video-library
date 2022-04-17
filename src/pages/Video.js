import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Footer, Navigation, useNotification, useUser } from "../exports";
import { addToHistory, dislikeVideo, getVideoById, likeVideo } from "../api-calls";
import { useLikes } from "../context/likesContext";

const Video = () => {

    const { id } = useParams();
    const [video, setVideo] = useState();
    const { user } = useUser();
    const { notificationHandler } = useNotification();
    const { likes, updateLikes } = useLikes();
    const [likesOnVideo, setLikesOnVideo] = useState(0);

    useEffect(() => {

        try {

            (
                async () => {
                    const data = await getVideoById(id);
                    setVideo(data);
                    setLikesOnVideo(data.likes);
                    user && addToHistory(id, user);
                }
            )()
        } catch (error) {
            notificationHandler(error.message);
        }
    }, [])

    const addToLikes = async () => {
        try {

            const updatedLikes = await likeVideo(id, user);
            updateLikes(updatedLikes);
            setLikesOnVideo(state => state + 1);
        } catch (error) {
            notificationHandler(error.message);
        }
    }

    const removeFromLikes = async () => {
        try {

            const updatedLikes = await dislikeVideo(id, user);
            updateLikes(updatedLikes);
            setLikesOnVideo(state => state - 1);
        } catch (error) {
            notificationHandler(error.message);
        }
    }

    return (
        <>
            <Navigation />
            <section className="video-section d-flex flex-dir-column">
                <video controls src={video?.url} className="video" />
                <p className="text-xl">{video?.title}</p>
                <div className="d-flex flex-justify-evenly video-stats-container">
                    <p className="video-views">{video?.views} views</p>
                    <div className="d-flex flex-center gap-1 video-likes">
                        {
                            likes?.videos?.includes(video?._id)
                                ? <div className="like-icon" onClick={removeFromLikes} ><ion-icon name="thumbs-up" size="large"></ion-icon></div>
                                : <div className="like-icon" onClick={addToLikes} ><ion-icon name="thumbs-up-outline" size="large"></ion-icon></div>
                        }
                        {likesOnVideo}
                    </div>
                </div>
                <p>{video?.description}</p>
            </section>
            <Footer />
        </>
    )
}

export { Video };