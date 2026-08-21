import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, Settings, User, Menu, X } from "lucide-react";
import { useAuth } from "@/services/authContext";
import { useNavigate } from "react-router-dom";

export default function DashboardHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {

        try {

            await logout();

        } catch (e) {

            console.log(e);

        } finally {

            localStorage.clear();

            navigate("/login");

        }

    };

    const notifications = [
        "Exam starts from 25 June",
        "Fee due reminder",
        "New assignment uploaded",
    ];

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b shadow-sm">
            <div className="h-16 px-6 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold">
                        AE
                    </div>

                    <h1 className="font-bold text-lg">
                        Academy Elite ERP
                    </h1>
                </div>

                {/* Desktop Right Side */}
                <div className="hidden lg:flex items-center gap-4">

                    {/* Notifications */}
                    <div className="relative group">
                        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
                            <Bell size={22} />
                        </button>

                        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                            <div className="p-4 border-b font-semibold">
                                Notifications
                            </div>

                            {notifications.map((item, index) => (
                                <div
                                    key={index}
                                    className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Settings */}
                    <Link
                        to="/settings"
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                    >
                        <Settings size={22} />
                    </Link>

                    {/* Profile Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
                            <User size={22} />
                        </button>

                        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">

                            <Link
                                to="/profile"
                                className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700"
                            >
                                My Profile
                            </Link>

                            <Link
                                to="/settings"
                                className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700"
                            >
                                Settings
                            </Link>

                            <Link
                                to="/change-password"
                                className="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700"
                            >
                                Change Password
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                                Logout
                            </button>

                        </div>
                    </div>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden border-t">
                    <Link
                        to="/notifications"
                        className="block px-6 py-3"
                    >
                        Notifications
                    </Link>

                    <Link
                        to="/profile"
                        className="block px-6 py-3"
                    >
                        Profile
                    </Link>

                    <Link
                        to="/settings"
                        className="block px-6 py-3"
                    >
                        Settings
                    </Link>

                    <button
                        onClick={handleLogout}
                        className="block px-6 py-3 text-red-500">
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
}