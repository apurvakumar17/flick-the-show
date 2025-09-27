import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [adminKey, setAdminKey] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        setError("");

        if (!name.trim()) {
            setError("Name is required");
            return;
        }

        try {
            const cred = await createUserWithEmailAndPassword(auth, email, password);

            const isAdmin = adminKey.trim() &&
                adminKey === import.meta.env.VITE_ADMIN_KEY;

            await setDoc(doc(db, "users", cred.user.uid), {
                name,  
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
                    Create Account
                </h2>

                {/* Form fields */}
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-4 py-2 border-2 border-(--md-sys-color-outline) rounded-3xl focus:ring-2 focus:ring-(--md-sys-color-primary) outline-none transition delay-150 ease-in-out bg-(--md-sys-color-surface-container-lowest) text-(--md-sys-color-on-surface)"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 border-2 border-(--md-sys-color-outline) rounded-3xl focus:ring-2 focus:ring-(--md-sys-color-primary) outline-none transition delay-150 ease-in-out bg-(--md-sys-color-surface-container-lowest) text-(--md-sys-color-on-surface)"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border-2 border-(--md-sys-color-outline) rounded-3xl focus:ring-2 focus:ring-(--md-sys-color-primary) outline-none transition delay-150 ease-in-out bg-(--md-sys-color-surface-container-lowest) text-(--md-sys-color-on-surface)"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* <input
                        type="text"
                        placeholder="Admin Key (optional)"
                        className="w-full px-4 py-2 border-2 border-(--md-sys-color-outline) rounded-3xl focus:ring-2 focus:ring-(--md-sys-color-primary) outline-none transition delay-150 ease-in-out bg-(--md-sys-color-surface-container-lowest) text-(--md-sys-color-on-surface)"
                        onChange={(e) => setAdminKey(e.target.value)}
                    /> */}

                    {/* Signup button */}
                    <button
                        onClick={handleSignup}
                        className="w-full bg-(--md-sys-color-primary) text-(--md-sys-color-on-primary) py-2 rounded-3xl font-semibold hover:scale-105 transition delay-150 duration-300 ease-in-out cursor-pointer active:scale-95 shadow-sm"
                    >
                        Sign Up
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
