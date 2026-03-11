import { NavLink } from 'react-router-dom';
import {
    TbHome,
    TbMushroom,
    TbNotes,
    TbCirclePlus,
    TbUser,
    TbLogin,
    TbLogout,
} from 'react-icons/tb';
import { GiMushrooms } from 'react-icons/gi';
import { useAuth } from '../../../features/auth/context/AuthContext';

export default function Navbar() {
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <nav className="fixed flex flex-row justify-between items-center  bg-white z-50 gap-10 bottom-0 w-full border-y border-gray-200 text-dark-brown p-4 md:top-0 md:bottom-auto md:justify-start">
            <div className="hidden md:block">
                <GiMushrooms size={32} className="text-lime-700" />
            </div>
            <ul className="flex flex-row items-center w-full justify-between gap-10 md:justify-start">
                <NavLink className="font-semibold" to={{ pathname: '/home' }}>
                    <TbHome className="md:hidden" size={32} />
                    <p className="hidden md:block">Accueil</p>
                </NavLink>
                <NavLink className="font-semibold" to={{ pathname: '/observations' }}>
                    <TbNotes className="md:hidden" size={32} />
                    <p className="hidden md:block">Observations</p>
                </NavLink>

                {isAuthenticated && (
                    <NavLink
                        className="font-semibold md:hidden"
                        to={{ pathname: '/observations/new' }}
                    >
                        <TbCirclePlus size={32} />
                    </NavLink>
                )}

                <NavLink className="font-semibold" to={{ pathname: '/mushrooms' }}>
                    <TbMushroom className="md:hidden" size={32} />
                    <p className="hidden md:block">Champignons</p>
                </NavLink>

                <div className="hidden md:flex md:ml-auto md:gap-6 md:items-center">
                    {isAuthenticated ? (
                        <>
                            <NavLink className="font-semibold" to={{ pathname: '/profile' }}>
                                Profil
                            </NavLink>
                            <button
                                onClick={handleLogout}
                                className="font-semibold flex items-center gap-1 hover:text-red-600"
                            >
                                <TbLogout size={20} />
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink className="font-semibold" to={{ pathname: '/login' }}>
                                Connexion
                            </NavLink>
                            <NavLink className="font-semibold" to={{ pathname: '/register' }}>
                                Inscription
                            </NavLink>
                        </>
                    )}
                </div>

                <div className="md:hidden">
                    {isAuthenticated ? (
                        <>
                            <NavLink className="font-semibold" to={{ pathname: '/profile' }}>
                                <TbUser size={32} />
                            </NavLink>
                        </>
                    ) : (
                        <NavLink className="font-semibold" to={{ pathname: '/login' }}>
                            <TbLogin size={32} />
                        </NavLink>
                    )}
                </div>
            </ul>
        </nav>
    );
}
