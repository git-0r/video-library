import { Home, Login, Notification, NotificationProvider, Signup, UserProvider } from "./exports";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
    return (
        <NotificationProvider>
            <Notification />
            <UserProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth/login" element={<Login />} />
                        <Route path="/auth/register" element={<Signup />} />
                    </Routes>
                </BrowserRouter>
            </UserProvider>
        </NotificationProvider>
    )
}

export default App;