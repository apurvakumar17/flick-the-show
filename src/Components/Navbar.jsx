import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { HiOutlineSearch, HiOutlineMenu, HiOutlineX } from "react-icons/hi";

function Navbar() {
  const [search, setSearch] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { userLoggedIn, logout, user, role } = useAuth();
  const navigate = useNavigate();
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (!confirmed) return;
    await logout();
    setMobileMenuOpen(false);
  };

  // Close both menu and search
  const handleCloseAll = () => {
    setMobileMenuOpen(false);
    setShowMobileSearch(false);
    setShowResults(false);
  };

  const isOverlayActive = showMobileSearch || mobileMenuOpen;

  // Debounced search string
  const debouncedSearch = useMemo(() => search.trim(), [search]);

  useEffect(() => {
    if (!debouncedSearch || debouncedSearch.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    let cancelled = false;
    const controller = new AbortController();
    const fetchResults = async () => {
      setSearchLoading(true);
      try {
        const res = await fetch(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
            debouncedSearch
          )}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (!cancelled) {
          setSearchResults(Array.isArray(data.results) ? data.results.slice(0, 8) : []);
          setShowResults(true);
        }
      } catch (e) {
        if (!cancelled) {
          setSearchResults([]);
          setShowResults(false);
        }
      } finally {
        if (!cancelled) setSearchLoading(false);
      }
    };
    const t = setTimeout(fetchResults, 300);
    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(t);
    };
  }, [debouncedSearch]);

  // Click outside to close results
  useEffect(() => {
    const onDocClick = (e) => {
      const targets = [desktopSearchRef.current, mobileSearchRef.current];
      if (targets.every((ref) => !ref || !ref.contains(e.target))) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleSelectMovie = (movieId) => {
    setShowResults(false);
    setShowMobileSearch(false);
    setSearch("");
    navigate(`/movie/${movieId}`);
  };

  return (
    <>
      {/* 🔲 DIM BACKGROUND OVERLAY */}
      {isOverlayActive && (
        <div
          className="fixed inset-0 z-40 sm:hidden"
          onClick={handleCloseAll}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        ></div>
      )}

      <nav
        className="mx-3.5 mt-3.5 rounded-2xl p-3 flex items-center justify-between shadow-md w-full relative z-50"
        style={{ backgroundColor: "var(--md-sys-color-surface-container)" }}
        aria-label="Main navigation"
      >
        {/* LEFT: Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" replace className="flex items-center">
            <img
              src="/flick_t_dark.png"
              alt="Flick logo"
              className="h-10 md:h-14 object-contain"
            />
          </Link>
        </div>

        {/* CENTER: Search (desktop) */}
        <div className="flex-1 flex justify-center">
          {/* desktop search */}
          <div className="hidden sm:flex items-center w-full max-w-2xl px-4 relative" ref={desktopSearchRef}>
            <input
              type="text"
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => search.trim().length >= 2 && setShowResults(true)}
              className="w-full h-10 rounded-full px-4 placeholder:text-[0.95rem] focus:outline-none focus:ring-2"
              style={{
                border: "2px solid var(--md-sys-color-outline)",
                backgroundColor: "var(--md-sys-color-inverse-on-surface)",
                color: "var(--md-sys-color-on-surface-variant)",
                boxShadow: "var(--tw-shadow, 0 1px 2px rgba(0,0,0,0.05))",
              }}
              aria-label="Search movies"
            />

            {showResults && (
              <div
                className="absolute top-full mt-8 w-full rounded-xl shadow-xl overflow-hidden z-50"
                style={{
                  backgroundColor: "var(--md-sys-color-surface-container)",
                  border: "1px solid var(--md-sys-color-outline)",
                  maxHeight: "60vh",
                  overflowY: "auto",
                }}
              >
                {searchLoading && (
                  <div className="p-4 text-center" style={{ color: "var(--md-sys-color-on-surface)" }}>Searching...</div>
                )}
                {!searchLoading && searchResults.length === 0 && (
                  <div className="p-4 text-center" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>No results</div>
                )}
                {!searchLoading && searchResults.length > 0 && (
                  <ul className="divide-y overflow-y-auto" style={{ borderColor: "var(--md-sys-color-outline)" }}>
                    {searchResults.map((m) => (
                      <li
                        key={m.id}
                        className="flex items-center gap-3 p-3 cursor-pointer hover:opacity-90"
                        onClick={() => handleSelectMovie(m.id)}
                        style={{ color: "var(--md-sys-color-on-surface)" }}
                      >
                        {m.poster_path ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w92${m.poster_path}`}
                            alt={m.title}
                            className="w-10 h-14 object-cover rounded"
                          />
                        ) : (
                          <div className="w-10 h-14 rounded flex items-center justify-center" style={{ backgroundColor: "var(--md-sys-color-surface-variant)", color: "var(--md-sys-color-on-surface-variant)" }}>N/A</div>
                        )}
                        <div className="min-w-0">
                          <div className="font-semibold truncate">{m.title}</div>
                          <div className="text-sm" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>ID: {m.id}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* mobile search icon */}
          <button
            type="button"
            className="sm:hidden inline-flex items-center justify-center p-2 rounded-full"
            onClick={() => {
              setShowMobileSearch((s) => !s);
              setMobileMenuOpen(false);
            }}
            aria-label="Open search"
            style={{ color: "var(--md-sys-color-on-surface)" }}
          >
            <HiOutlineSearch size={20} />
          </button>
        </div>

        {/* RIGHT: Auth Buttons (desktop) and mobile menu toggle */}
        <div className="flex items-center gap-3">
          {/* Desktop auth buttons */}
          <div className="hidden sm:flex items-center gap-2">
            {userLoggedIn ? (
              <>
                {role === "admin" && (
                  <Link to="/admin">
                    <button
                      className="font-bold px-4 py-2 rounded-2xl hover:scale-105 transition"
                      style={{
                        backgroundColor: "var(--md-sys-color-primary)",
                        color: "var(--md-sys-color-on-primary)",
                      }}
                    >
                      Admin Dashboard
                    </button>
                  </Link>
                )}

                <Link to="/user">
                  <button
                    className="font-bold px-4 py-2 rounded-2xl hover:scale-105 transition"
                    style={{
                      backgroundColor: "var(--md-sys-color-primary)",
                      color: "var(--md-sys-color-on-primary)",
                    }}
                  >
                    User Dashboard
                  </button>
                </Link>

                <button
                  onClick={handleLogout}
                  className="font-bold px-4 py-2 rounded-2xl border-2 hover:scale-105 transition"
                  style={{
                    backgroundColor:
                      "var(--md-sys-color-surface-container-lowest)",
                    borderColor: "var(--md-sys-color-primary)",
                    color: "var(--md-sys-color-primary)",
                  }}
                >
                  LogOut
                </button>
              </>
            ) : (
              <>
                <Link to="/signup" replace>
                  <button
                    className="font-bold px-4 py-2 rounded-2xl hover:scale-105 transition"
                    style={{
                      backgroundColor: "var(--md-sys-color-primary)",
                      color: "var(--md-sys-color-on-primary)",
                    }}
                  >
                    SignUp
                  </button>
                </Link>

                <Link to="/login" replace>
                  <button
                    className="font-bold px-4 py-2 rounded-2xl border-2 hover:scale-105 transition"
                    style={{
                      backgroundColor:
                        "var(--md-sys-color-surface-container-lowest)",
                      borderColor: "var(--md-sys-color-primary)",
                      color: "var(--md-sys-color-primary)",
                    }}
                  >
                    LogIn
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="sm:hidden inline-flex items-center justify-center p-2 rounded-full"
            onClick={() => {
              setMobileMenuOpen((s) => !s);
              setShowMobileSearch(false);
            }}
            aria-label="Open menu"
            style={{ color: "var(--md-sys-color-on-surface)" }}
          >
            {mobileMenuOpen ? (
              <HiOutlineX size={20} />
            ) : (
              <HiOutlineMenu size={20} />
            )}
          </button>
        </div>

        {/* MOBILE: Expandable search input */}
        {showMobileSearch && (
          <>
            <div
              className="sm:hidden mt-2 w-full absolute left-0 right-0 z-50"
              style={{ marginTop: "0px" }}
            >
              <div className="w-full px-3 relative" ref={mobileSearchRef}>
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => search.trim().length >= 2 && setShowResults(true)}
                  className="w-full h-10 rounded-full px-4 focus:outline-none"
                  style={{
                    border: "2px solid var(--md-sys-color-outline)",
                    backgroundColor: "var(--md-sys-color-inverse-on-surface)",
                    color: "var(--md-sys-color-on-surface-variant)",
                  }}
                  aria-label="Mobile search input"
                />
                {showResults && (
                  <div
                    className="absolute top-full mt-2 left-3 right-3 rounded-xl shadow-xl overflow-hidden"
                    style={{
                      backgroundColor: "var(--md-sys-color-surface-container)",
                      border: "1px solid var(--md-sys-color-outline)",
                      maxHeight: "60vh",
                      overflowY: "auto",
                      zIndex: 60,
                    }}
                  >
                    {searchLoading && (
                      <div className="p-4 text-center" style={{ color: "var(--md-sys-color-on-surface)" }}>Searching...</div>
                    )}
                    {!searchLoading && searchResults.length === 0 && (
                      <div className="p-4 text-center" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>No results</div>
                    )}
                    {!searchLoading && searchResults.length > 0 && (
                      <ul className="divide-y overflow-y-auto" style={{ borderColor: "var(--md-sys-color-outline)" }}>
                        {searchResults.map((m) => (
                          <li
                            key={m.id}
                            className="flex items-center gap-3 p-3 cursor-pointer hover:opacity-90"
                            onClick={() => handleSelectMovie(m.id)}
                            style={{ color: "var(--md-sys-color-on-surface)" }}
                          >
                            {m.poster_path ? (
                              <img
                                src={`https://image.tmdb.org/t/p/w92${m.poster_path}`}
                                alt={m.title}
                                className="w-10 h-14 object-cover rounded"
                              />
                            ) : (
                              <div className="w-10 h-14 rounded flex items-center justify-center" style={{ backgroundColor: "var(--md-sys-color-surface-variant)", color: "var(--md-sys-color-on-surface-variant)" }}>N/A</div>
                            )}
                            <div className="min-w-0">
                              <div className="font-semibold truncate">{m.title}</div>
                              <div className="text-sm" style={{ color: "var(--md-sys-color-on-surface-variant)" }}>ID: {m.id}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="w-full p-5 h-full pb-15" >

            </div>
          </>

        )}

        {/* MOBILE: Slide-down menu */}
        {mobileMenuOpen && (
          <div
            className="sm:hidden mt-75 w-full px-4 pb-4 absolute left-0 right-0 z-50"
            style={{
              backgroundColor: "var(--md-sys-color-surface-container)",
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
              borderBottomLeftRadius: "12px",
              borderBottomRightRadius: "12px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
            }}
          >
            <div className="flex flex-col gap-3 pt-3">
              {userLoggedIn ? (
                <>
                  {role === "admin" && (
                    <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                      <button
                        className="w-full text-left px-4 py-3 rounded-lg font-semibold"
                        style={{
                          backgroundColor: "var(--md-sys-color-primary)",
                          color: "var(--md-sys-color-on-primary)",
                        }}
                      >
                        Admin Dashboard
                      </button>
                    </Link>
                  )}

                  <Link to="/user" onClick={() => setMobileMenuOpen(false)}>
                    <button
                      className="w-full text-left px-4 py-3 rounded-lg font-semibold"
                      style={{
                        backgroundColor: "var(--md-sys-color-primary)",
                        color: "var(--md-sys-color-on-primary)",
                      }}
                    >
                      User Dashboard
                    </button>
                  </Link>


                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 rounded-lg font-semibold border-2"
                    style={{
                      backgroundColor:
                        "var(--md-sys-color-surface-container-lowest)",
                      borderColor: "var(--md-sys-color-primary)",
                      color: "var(--md-sys-color-primary)",
                    }}
                  >
                    LogOut
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    replace
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button
                      className="w-full text-left px-4 py-3 rounded-lg font-semibold"
                      style={{
                        backgroundColor: "var(--md-sys-color-primary)",
                        color: "var(--md-sys-color-on-primary)",
                      }}
                    >
                      SignUp
                    </button>
                  </Link>

                  <Link
                    to="/login"
                    replace
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button
                      className="w-full text-left px-4 py-3 rounded-lg font-semibold border-2"
                      style={{
                        backgroundColor:
                          "var(--md-sys-color-surface-container-lowest)",
                        borderColor: "var(--md-sys-color-primary)",
                        color: "var(--md-sys-color-primary)",
                      }}
                    >
                      LogIn
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}

        {/* 🔘 Floating Close All button */}
        {isOverlayActive && (
          <div className="sm:hidden fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50">
            <button
              onClick={handleCloseAll}
              className="px-6 py-3 rounded-full font-bold hover:scale-105 transition"
              style={{
                backgroundColor: "var(--md-sys-color-primary)",
                color: "var(--md-sys-color-on-primary)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              }}
            >
              Close
            </button>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
