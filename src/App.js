import {
    History,
    Home,
    Login,
    Notification,
    NotificationProvider,
    Signup,
    UserProvider,
    Video,
    WatchLater,
    WatchLaterContextProvider
} from "./exports";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <NotificationProvider>
            <Notification />
            <UserProvider>
                <WatchLaterContextProvider>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/auth/login" element={<Login />} />
                            <Route path="/auth/register" element={<Signup />} />
                            <Route path="/watchlater/:id" element={<WatchLater />} />
                            <Route path="/video/:id" element={<Video />} />
                            <Route path="/history/:id" element={<History />} />
                        </Routes>
                    </BrowserRouter>
                </WatchLaterContextProvider>
            </UserProvider>
        </NotificationProvider>
    )
}

export default App;