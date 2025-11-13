import type { Observation } from '../../types/observation';

export default function ObservationCard({ obs }: { obs: Observation }) {
    const notes = obs.notes ? <p>{obs.notes}</p> : null;

    return (
        <div className="flex flex-col items-center w-xs rounded-xl bg-secondary text-dark">
            <div className="w-full h-48 overflow-hidden rounded-t-xl">
                <img
                    src={`/assets/images/${obs.imageUrl}`}
                    className="w-full h-full object-cover object-center"
                    alt={obs.observer}
                    height={200}
                    width={200}
                />
            </div>
            <div className="flex-col justify-between items-center w-full p-4">
                <div className="flex flex-col items-start">
                    <p className="font-mono text-medium ">
                        <i>{obs.date}</i>
                    </p>
                </div>
                <div className="w-full">{notes}</div>
            </div>
        </div>
    );
}
