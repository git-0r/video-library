import { useState, useEffect } from "react";
import { getAllVideos, getVideosByCategory } from "../api-calls";
import { Footer, Navigation, VideoListingCard } from "../exports";

const Home = () => {

    const [videos, setVideos] = useState([]);
    const [category, setCategory] = useState("");

    useEffect(() => {

        try {

            category
                ? (async () => {
                    const data = await getVideosByCategory(category);
                    setVideos(data);
                })()
                : (async () => {
                    const data = await getAllVideos()
                    setVideos(data);
                })()

        } catch (error) {
            console.log(error.message)
        }

    }, [category])

    return (
        <>
            <Navigation />

            <div className="categories-container d-flex flex-justify-evenly flex-wrap">
                <button className={`btn ${category === ""
                    ? "btn-primary"
                    : "btn-secondary"}`}
                    onClick={() => setCategory("")}>
                    All</button>
                <button className={`btn ${category === "the witcher"
                    ? "btn-primary"
                    : "btn-secondary"}`}
                    onClick={() => setCategory("the witcher")}>
                    The witcher</button>
                <button className={`btn ${category === "halo infinite"
                    ? "btn-primary"
                    : "btn-secondary"}`}
                    onClick={() => setCategory("halo infinite")}>
                    Hallo infinite</button>
                <button className={`btn ${category === "ghost runner"
                    ? "btn-primary"
                    : "btn-secondary"}`}
                    onClick={() => setCategory("ghost runner")}>
                    Ghost runner</button>
                <button className={`btn ${category === "dying light"
                    ? "btn-primary"
                    : "btn-secondary"}`}
                    onClick={() => setCategory("dying light")}>
                    Dying light</button>
                <button className={`btn ${category === "god of war"
                    ? "btn-primary"
                    : "btn-secondary"}`}
                    onClick={() => setCategory("god of war")}>
                    God of war</button>
            </div>
            <div className="d-flex flex-justify-evenly flex-wrap gap-1">

                {
                    videos.length > 0
                        ? videos?.map(video => <VideoListingCard video={video} key={video._id} />)
                        : "Loading..."
                }
            </div>
            <Footer />

        </>
    )
}

export { Home };