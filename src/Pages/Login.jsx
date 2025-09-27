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
        <div className="min-h-screen flex items-center justify-center bg-(--md-sys-color-background) px-4 banner-bg">
            {/* Back button */}
            <div className="fixed top-5 left-5 shadow-xl/90 shadow-black rounded-4xl">
                <Link to="/" replace>
                    <button className="font-bold bg-(--md-sys-color-surface-variant) text-(--md-sys-color-on-surface-variant) px-4 py-2 rounded-4xl hover:scale-110 transition delay-150 duration-300 ease-in-out cursor-pointer h-9 flex justify-center items-center">
                        Back
                    </button>
                </Link>
            </div>

            <div className="bg-(--md-sys-color-surface-container-low)/85 shadow-lg rounded-2xl p-8 w-full max-w-md transition delay-150 ease-in-out">



                {/* Heading */}
                <h2 className="text-2xl font-bold text-center text-(--md-sys-color-on-surface) mb-6">
                    Login
                </h2>

                {/* Form */}
                <div className="space-y-4">
                    <input
                        className="w-full px-4 py-2 border-2 border-(--md-sys-color-outline) rounded-3xl focus:ring-2 focus:ring-(--md-sys-color-primary) outline-none transition delay-150 ease-in-out bg-(--md-sys-color-surface-container-lowest) text-(--md-sys-color-on-surface)"
                        type="email"
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        className="w-full px-4 py-2 border-2 border-(--md-sys-color-outline) rounded-3xl focus:ring-2 focus:ring-(--md-sys-color-primary) outline-none transition delay-150 ease-in-out bg-(--md-sys-color-surface-container-lowest) text-(--md-sys-color-on-surface)"
                        type="password"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />

                    {/* Login button */}
                    <button
                        onClick={handleLogin}
                        className="w-full bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary) py-2 rounded-3xl font-semibold hover:scale-105 transition delay-150 duration-300 ease-in-out cursor-pointer active:scale-95 shadow-sm"
                    >
                        Login
                    </button>

                    {/* Error */}
                    {error && (
                        <p className="text-(--md-sys-color-error) text-sm text-center mt-2">
                            {error}
                        </p>
                    )}
                </div>
            </div>
        </div>

    );
}
