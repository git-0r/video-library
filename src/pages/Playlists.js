import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createNewPlaylist, deletePlaylist, getAllPlaylists } from "../api-calls";
import { Navigation, useNotification, usePlaylist, useUser } from "../exports";

const Playlists = () => {

    const { playlists, updatePlaylists } = usePlaylist();
    const { notificationHandler } = useNotification();
    const [playlistForm, setPlaylistForm] = useState(false);
    const [newPlaylist, setNewPlaylist] = useState("");

    const { user } = useUser();


    useEffect(() => {
        try {
            async function getPlaylists(user) {
                const data = await getAllPlaylists(user);
                updatePlaylists(data);
            }
            user && getPlaylists(user)

        } catch (error) {
            notificationHandler(error.message);
        }
    }, [])

    const createPlaylist = async (e) => {
        e.preventDefault();
        try {

            const isDuplicatePaylist = playlists?.findIndex(playlist => playlist.title === newPlaylist);

            if (isDuplicatePaylist === -1) {
                const data = await createNewPlaylist(newPlaylist, user);
                updatePlaylists(data);
                setNewPlaylist("");
                setPlaylistForm(false);
                notificationHandler("Playlist created")
            } else {
                throw new Error("Playlist with same name already exists");
            }
        } catch (error) {
            notificationHandler(error.message);
        }
    }

    const trashPlaylist = async (playlistId) => {
        try {

            const data = await deletePlaylist(playlistId, user);
            updatePlaylists(data);
            notificationHandler("Playlist deleted")
        } catch (error) {
            notificationHandler(error.message);
        }
    }

    return (
        <>
            <Navigation />
            {
                user ?
                    <>
                        <p className="heading-xl text-align-center">Playlists</p>
                        <div className="video-list-wrapper d-flex flex-justify-evenly flex-wrap gap-1">
                            <div className="playlist-cover d-flex flex-center flex-dir-column">
                                {
                                    playlistForm
                                        ? <>
                                            <div>
                                                <p className="text-xl text-align-center">Create playlist</p>
                                                <form className="d-flex flex-dir-column" onSubmit={createPlaylist}>
                                                    <input type="text" minLength={3} maxLength={15} className="input" placeholder="Enter new playlist name" value={newPlaylist} onChange={(e) => setNewPlaylist(e.target.value)} />
                                                    <button className="btn btn-primary">create</button>
                                                </form>
                                            </div>

                                        </>
                                        : <div className="d-flex flex-dir-column flex-center" onClick={() => setPlaylistForm(!playlistForm)}>
                                            <ion-icon name="add-outline" size="large"></ion-icon>
                                            <p className="text-xl">Create new playlist</p>

                                        </div>
                                }
                            </div>
                            {
                                playlists?.length > 0 &&
                                playlists?.reverse()?.map(playlist => <div className="playlist-cover d-flex flex-center flex-dir-column" key={playlist?._id}>
                                    <p>{playlist?.title}</p>
                                    <p>{playlist?.videos.length} videos</p>
                                    <Link className="remove-link-style btn btn-secondary" to={`/playlist/${playlist?._id}`}>view</Link>
                                    <div className="card-dismiss d-flex flex-center" onClick={() => trashPlaylist(playlist._id)}>
                                        <ion-icon name="trash-outline"></ion-icon>
                                    </div>
                                </div>)
                            }
                        </div>
                    </>
                    : <p className="heading-xl text-align-center">Login to your account.</p>
            }
        </>
    )
}

export { Playlists };