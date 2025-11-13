import Navbar from '../../../shared/components/Navbar/Navbar';
import MushroomsList from '../components/MushroomsList/MushroomsList';

export default function MushroomsPage() {
    return (
        <div className="bg-white">
            <Navbar />
            <h1 className="text-light">Liste des champignons</h1>
            <h2 className="text-accent-green">Liste des champignons</h2>
            <button className="bg-accent text-light font-body rounded-full px-5 py-3">
                S'inscrire
            </button>
            <MushroomsList />
        </div>
    );
}
