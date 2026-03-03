import { PiSkullFill } from 'react-icons/pi';
import { PiForkKnifeFill } from 'react-icons/pi';

export default function EdibilityIcons({ edibility }: { edibility: string }) {
    if (edibility === 'POISONOUS') {
        return <PiSkullFill className="text-danger" size={32} />;
    } else if (edibility === 'EDIBLE') {
        return <PiForkKnifeFill className="text-success" size={32} />;
    } else {
        return null;
    }
}
