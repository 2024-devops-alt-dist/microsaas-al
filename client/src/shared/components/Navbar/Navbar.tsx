import { NavLink } from 'react-router-dom';
import { TbHome } from 'react-icons/tb';
import { TbMushroom } from 'react-icons/tb';
import { TbNotes } from 'react-icons/tb';
import { TbCirclePlus } from 'react-icons/tb';
import { TbUser } from 'react-icons/tb';
import { GiMushrooms } from 'react-icons/gi';

export default function Navbar() {
    return (
        <nav className="fixed flex flex-row justify-between items-center bg-white z-50 gap-10 bottom-0 w-full border-y border-gray-200 text-dark-brown p-4 md:top-0 md:bottom-auto md:justify-start">
            <div className="hidden md:block">
                <GiMushrooms size={32} />
            </div>
            <ul className="flex flex-row w-full justify-between gap-10 md:justify-start">
                <NavLink className="font-semibold" to={{ pathname: '/observations' }}>
                    <TbHome className="md:hidden " size={32} />
                    <p className="hidden md:block">Accueil</p>
                </NavLink>
                <NavLink className="font-semibold" to={{ pathname: '/observations' }}>
                    <TbNotes className="md:hidden" size={32} />
                    <p className="hidden md:block">Observations</p>
                </NavLink>
                <NavLink className="font-semibold md:hidden" to={{ pathname: '/observations' }}>
                    <TbCirclePlus className="md:hidden" size={32} />
                </NavLink>
                <NavLink className="font-semibold" to={{ pathname: '/mushrooms' }}>
                    <TbMushroom className="md:hidden" size={32} />
                    <p className="hidden md:block">Champignons</p>
                </NavLink>
                <NavLink className="font-semibold md:hidden" to={{ pathname: '/observations' }}>
                    <TbUser className="md:hidden" size={32} />
                </NavLink>
            </ul>
        </nav>
    );
}
