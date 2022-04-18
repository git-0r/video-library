import { createPortal } from "react-dom";
import { useState } from "react";
import { useNotification, usePlaylist, useUser } from "../exports";
import { addVideoToPlaylist, createNewPlaylist, removeVideoFromPlaylist } from "../api-calls";

const PlaylistModal = ({ isModalVisible, setIsModalVisible, videoId }) => {

    const [newPlaylist, setNewPlaylist] = useState();
    const { playlists, updatePlaylists } = usePlaylist();
    const { notificationHandler } = useNotification();
    const { user } = useUser();

    const createPlaylist = async (e) => {
        e.preventDefault();
        try {

            const isDuplicatePaylist = playlists?.findIndex(playlist => playlist.title === newPlaylist);

            if (isDuplicatePaylist === -1) {
                const data = await createNewPlaylist(newPlaylist, user);
                updatePlaylists(data);
                notificationHandler("Playlist created")
            } else {
                throw new Error("Playlist with same name already exists");
            }
        } catch (error) {
            notificationHandler(error.message);
        }
    }

    const handlePlaylist = async (playlistId, videoId, checked) => {

        if (checked) {
            try {
                const data = await addVideoToPlaylist(playlistId, videoId, user);
                updatePlaylists(data);
                notificationHandler("Added to playlist");
            } catch (error) {
                notificationHandler(error.message);
            }
        } else {
            try {
                const data = await removeVideoFromPlaylist(playlistId, videoId, user);
                updatePlaylists(data);
                notificationHandler("Removed from playlist");
            } catch (error) {
                notificationHandler(error.message);
            }
        }
    }

    return (
        createPortal(
            <div className={`modal-container flex-center ${isModalVisible && "modal-visible"}`}>
                <div className="modal-content">
                    {
                        user
                            ?
                            <>
                                <div>
                                    <p className="text-xl">Your playlists</p>
                                    {
                                        playlists?.length > 0 ?
                                            <ul className="styled-list">
                                                {
                                                    playlists?.map(playlist => <li key={playlist?._id}>
                                                        <input type="checkbox" id={playlist?.title + videoId} key={playlist._id} onChange={(e) => handlePlaylist(playlist?._id, videoId, e.target.checked)} checked={playlist?.videos?.findIndex(video => video === videoId) === -1 ? false : true} />
                                                        <label htmlFor={playlist?.title + videoId}>{playlist?.title}</label>
                                                    </li>)
                                                }
                                            </ul>
                                            : <div className="d-flex flex-center"><ion-icon name="skull-outline" size="large"></ion-icon></div>
                                    }
                                </div>
                                <div>
                                    <p className="text-xl">Create playlist</p>
                                    <form className="d-flex flex-dir-column" onSubmit={createPlaylist}>
                                        <input type="text" minLength={3} maxLength={15} className="input" placeholder="Enter new playlist name" onChange={(e) => setNewPlaylist(e.target.value)} />
                                        <button className="btn btn-primary">create</button>
                                    </form>
                                </div>
                            </>
                            : <p className="heading-lg">Login to your account.</p>
                    }
                    <div className="card-dismiss d-flex flex-center" onClick={() => setIsModalVisible(false)}>
                        <ion-icon name="close-outline"></ion-icon>
                    </div>

                </div>
            </div>
            , document.getElementById("root"))
    )
}

export { PlaylistModal };