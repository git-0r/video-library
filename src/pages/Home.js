import { useState, useEffect } from "react";
import { getAllVideos, getVideosByCategory } from "../api-calls";
import { Footer, Navigation, VideoListingCard } from "../exports";

const Home = () => {

    const [videos, setVideos] = useState([]);
    const [category, setCategory] = useState("");
    const categories = ["All", "The witcher", "Hallo infinite", "Ghost runner", "Dying light", "God of war"];

    useEffect(() => {

        try {

            const getVideoData = async (category) => {

                const data = category !== "All"
                    ? await getVideosByCategory(category)
                    : await getAllVideos()

                setVideos(data);
            }

            getVideoData(category);

        } catch (error) {
            console.log(error.message)
        }

    }, [category])

    return (
        <>
            <Navigation />

            <div className="categories-container d-flex flex-justify-evenly flex-wrap">
                {
                    categories?.map(btn => <button key={btn}
                        className={`btn ${btn === category
                            ? "btn-primary"
                            : "btn-secondary"}`}
                        onClick={() => setCategory(btn)}
                    >{btn}</button>)
                }
            </div>
            <main className="video-list-wrapper d-flex flex-justify-evenly flex-wrap gap-1">

                {
                    videos.length > 0
                        ? videos?.map(video => <VideoListingCard video={video} key={video._id} />)
                        : "Loading..."
                }
            </main>
            <Footer />

        </>
    )
}

export { Home };