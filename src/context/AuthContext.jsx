import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null); // "admin" | "user" | null
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (!u) {
                setUser(null);
                setRole(null);
                setLoading(false);
                return;
            }

            setUser(u);

            try {
                const snap = await getDoc(doc(db, "users", u.uid));
                setRole(snap.exists() ? snap.data().role : "user");
            } catch (err) {
                console.error("Error fetching user role:", err);
                setRole("user");
            }

            setLoading(false);
        });

        return () => unsub();
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setRole(null);
        } catch (err) {
            console.error("Logout error:", err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, role, loading, logout, userLoggedIn: !!user }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
