import {
    History,
    HistoryProvider,
    Home,
    Likes,
    LikesProvider,
    Login,
    Notification,
    NotificationProvider,
    Playlist,
    PlaylistProvider,
    Playlists,
    Signup,
    UserProvider,
    Video,
    WatchLater,
    WatchLaterProvider
} from "./exports";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <NotificationProvider>
            <Notification />
            <UserProvider>
                <WatchLaterProvider>
                    <LikesProvider>
                        <HistoryProvider>
                            <PlaylistProvider>
                                <BrowserRouter>
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/auth/login" element={<Login />} />
                                        <Route path="/auth/register" element={<Signup />} />
                                        <Route path="/watchlater/:id" element={<WatchLater />} />
                                        <Route path="/video/:id" element={<Video />} />
                                        <Route path="/history/:id" element={<History />} />
                                        <Route path="/likes/:id" element={<Likes />} />
                                        <Route path="/playlists" element={<Playlists />} />
                                        <Route path="/playlist/:id" element={<Playlist />} />
                                    </Routes>
                                </BrowserRouter>
                            </PlaylistProvider>
                        </HistoryProvider>
                    </LikesProvider>
                </WatchLaterProvider>
            </UserProvider>
        </NotificationProvider>
    )
}

export default App;