import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");
        try {
            const cred = await signInWithEmailAndPassword(auth, email, password);
            const snap = await getDoc(doc(db, "users", cred.user.uid));
            const role = snap.exists() ? snap.data().role : "user";
            navigate(role === "admin" ? "/admin" : "/user");
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md transition delay-150 ease-in-out">
                <div>
                    <Link to="/" replace>
                        <button className="font-bold bg-(--md-sys-color-surface-variant) text-(--md-sys-color-on-surface-variant) px-4 py-2 rounded-4xl hover:scale-110 transition delay-150 duration-300 ease-in-out cursor-pointer h-9 flex justify-center items-center mr-2">
                            Back
                        </button>
                    </Link>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Login
                </h2>
                <div className="space-y-4">
                    <input
                        className="w-full px-4 py-2 border-2 border-(--md-sys-color-inverse-primary) rounded-3xl focus:ring-2 focus:ring-(--md-sys-color-primary) outline-none transition delay-150 ease-in-out"
                        type="email"
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        className="w-full px-4 py-2 border-2 border-(--md-sys-color-inverse-primary) rounded-3xl focus:ring-2 focus:ring-(--md-sys-color-primary) outline-none transition delay-150 ease-in-out"
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full bg-(--md-sys-color-primary) text-white py-2 rounded-3xl font-semibold hover:bg-(--md-sys-color-primary) hover:scale-105 transition delay-150 duration-300 ease-in-out cursor-pointer active:scale-90"

                    >
                        Login
                    </button>
                    {error && (
                        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                    )}
                </div>
            </div>



        </div>
    );
}
