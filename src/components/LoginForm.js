import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../api-calls";
import { useUser } from "../context/userContext";
import { useNotification, usePlaylist, useWatchLater } from "../exports";


const LoginForm = () => {

    const [userInput, setUserInput] = useState({});
    const { setUser } = useUser();
    const navigate = useNavigate();
    const { notificationHandler } = useNotification();
    const { updateWatchLater } = useWatchLater();
    const { updatePlaylists } = usePlaylist();

    const handleFormInput = (e) => {

        const inputFieldName = e.target.name;
        const inputFieldValue = e.target.value;

        setUserInput(state => {
            return {
                ...state,
                [inputFieldName]: inputFieldValue
            }
        })
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const { watchLater, likes, playlists, ...user } = await login(userInput);
            setUser({ type: "LOGIN", payload: user });
            updateWatchLater(watchLater);
            updatePlaylists(playlists);
            notificationHandler("Logged in!");
            navigate("/");

        } catch (error) {
            notificationHandler(error.message);
        }
    }

    const guestLogin = async () => {

        try {
            const { watchLater, likes, playlists, ...user } = await login({ email: "test@email.com", password: "Test@123" });
            setUser({ type: "LOGIN", payload: user });
            updateWatchLater(watchLater);
            updatePlaylists(playlists);
            notificationHandler("Logged in!");
            navigate("/");

        } catch (error) {
            notificationHandler(error.message)
        }
    }

    return (
        <div className="form-wrapper d-flex flex-center flex-dir-column">
            <p className="heading-xl">Log in</p>
            <form className="form" onSubmit={handleFormSubmit}>
                <label className="input-label" htmlFor="email">Email</label>
                <input className="input form-input" id="email" name="email" type="email" placeholder="something@gmail.com" required onChange={handleFormInput} />
                <p className="input-error-msg text-sm">enter email in 'email@gmail.com' format</p>
                <label className="input-label" htmlFor="password">Password</label>
                <input className="input form-input" id="password" name="password" type="password" placeholder="p@$$\/\/Or|)"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" required onChange={handleFormInput} />
                <div className="input-error-msg text-sm">
                    <ul>password must include atleast:
                        <li>one uppercase letter</li>
                        <li>one lowercase letter</li>
                        <li>one special character</li>
                        <li>one number</li>
                        <li>minimum length 8 characters</li>
                    </ul>
                </div>
                <div>
                    <input type="checkbox" name="remember" id="remember" />
                    <label className="input-label" htmlFor="remember">Remember me</label>
                </div>
                <button className="btn btn-primary">Log in</button>
                <div>
                    <Link to="/auth/register">New customer? Create an account.</Link>
                </div>
            </form>
            <button className="btn btn-link" onClick={guestLogin}>Guest Log in</button>
        </div>
    )
}

export { LoginForm };