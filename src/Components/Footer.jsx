import React from 'react'
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { SiX } from "react-icons/si";

function Footer() {
    return (
        <footer className="bg-(--md-sys-color-surface-container-highest) text-(--md-sys-color-on-surface) py-10 mt-12 rounded-tl-3xl rounded-tr-3xl">
            <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                {/* Brand */}
                <div>
                    <h3 className="text-xl font-bold text-(--md-sys-color-primary)">Flick the Show</h3>
                    <p className="text-sm text-(--md-sys-color-on-surface-variant) mt-2">
                        Your go-to place for booking tickets, finding theatres, and enjoying the best movies near you.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-(--md-sys-color-primary)">Home</a></li>
                        <li><a href="/movies" className="hover:text-(--md-sys-color-primary)">Movies</a></li>
                        <li><a href="/theatres" className="hover:text-(--md-sys-color-primary)">Theatres</a></li>
                        <li><a href="/contact" className="hover:text-(--md-sys-color-primary)">Contact</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h4 className="text-lg font-semibold mb-3">Support</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/faq" className="hover:text-(--md-sys-color-primary)">FAQ</a></li>
                        <li><a href="/privacy" className="hover:text-(--md-sys-color-primary)">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-(--md-sys-color-primary)">Terms & Conditions</a></li>
                    </ul>
                </div>

                {/* Socials */}
                <div>
                    <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
                    <div className="flex space-x-5 text-2xl">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-(--md-sys-color-primary)">
                            <FaFacebook />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-(--md-sys-color-primary)">
                            <FaInstagram />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-(--md-sys-color-primary)">
                            <FaYoutube />
                        </a>
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-(--md-sys-color-primary)">
                            <SiX />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-(--md-sys-color-outline-variant) mt-8 pt-4 text-center text-sm text-(--md-sys-color-on-surface-variant)">
                © {new Date().getFullYear()} Flick the Show. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
