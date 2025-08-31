import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminKey, setAdminKey] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        setError("");
        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);

            const isAdmin = adminKey.trim() &&
                adminKey === import.meta.env.VITE_ADMIN_KEY;

            await setDoc(doc(db, "users", cred.user.uid), {
                email,
                role: isAdmin ? "admin" : "user",
                createdAt: new Date().toISOString(),
            });

            navigate(isAdmin ? "/admin" : "/user");
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
                    Create Account
                </h2>

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border-2 border-(--md-sys-color-inverse-primary) rounded-3xl focus:ring-2 focus:ring-(--md-sys-color-primary) outline-none transition delay-150 ease-in-out"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border-2 border-(--md-sys-color-inverse-primary) rounded-3xl focus:ring-2 focus:ring-(--md-sys-color-primary) outline-none transition delay-150 ease-in-out"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Admin Key (optional)"
                        className="w-full px-4 py-2 border-2 border-(--md-sys-color-inverse-primary) rounded-3xl focus:ring-2 focus:ring-(--md-sys-color-primary) outline-none transition delay-150 ease-in-out"
                        onChange={(e) => setAdminKey(e.target.value)}
                    />

                    <button
                        onClick={handleSignup}
                        className="w-full bg-(--md-sys-color-primary) text-white py-2 rounded-3xl font-semibold hover:bg-(--md-sys-color-primary) hover:scale-105 transition delay-150 duration-300 ease-in-out cursor-pointer active:scale-90"
                    >
                        Sign Up
                    </button>

                    {error && (
                        <p className="text-red-500 text-sm text-center mt-2">{error}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
