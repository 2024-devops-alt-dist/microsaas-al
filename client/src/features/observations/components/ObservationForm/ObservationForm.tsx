import {
    ConfidenceLevel,
    CreateObservationDTO,
    Observation,
    ObservationFormData,
} from '../../../../shared/types/observations';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../auth/context/authContext';
import { ImageFormData } from '../../../../shared/types/images';
import { Calendar, Camera, Locate, Text, Upload } from 'lucide-react';
import { observationsService } from '../../../../shared/services/observationsService';
import { Mushroom } from '../../../../shared/types/mushrooms';
import { mushroomsService } from '../../../../shared/services/mushroomsService';
import { useNavigate } from 'react-router-dom';

const initialFormData: ObservationFormData = {
    title: '',
    date: new Date(),
    latitude: 0,
    longitude: 0,
    quantity: 1,
    notes: '',
    isPublic: false,
    confidenceLevel: ConfidenceLevel.MEDIUM,
    userId: 0,
    mushroomId: null,
};

export default function ObservationForm() {
    const [mushrooms, setMushrooms] = useState<Mushroom[]>([]);
    const [formImage, setFormImage] = useState<ImageFormData>();
    const [formData, setFormData] = useState<Partial<ObservationFormData>>(initialFormData);
    const [preview, setPreview] = useState<string | null>(null);
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchMushrooms() {
            try {
                const data = await mushroomsService.getAll();
                setMushrooms(data);
            } catch (error) {
                console.error('Erreur lors de la récupération des champignons:', error);
            }
        }
        fetchMushrooms();
    }, []);

    // Références pour les inputs file
    const fileInputRef = useRef<HTMLInputElement>(null);
    const cameraInputRef = useRef<HTMLInputElement>(null);

    // Ouvrir l'explorateur de fichiers
    function handleUploadClick() {
        fileInputRef.current?.click();
    }

    // Ouvrir la caméra
    function handleCameraClick() {
        cameraInputRef.current?.click();
    }

    // Gérer la sélection de fichier
    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            // Créer une URL de prévisualisation
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);

            // Stocker les données de l'image
            console.log(file);

            setFormImage({
                url: file.name,
                filename: file.name,
                mimeType: file.type,
                size: file.size,
            });
        }
    }

    function updateFormData(updatedFields: Partial<ObservationFormData>) {
        console.log('Mise à jour des données du formulaire:', updatedFields);
        setFormData((prev) => ({ ...prev, ...updatedFields }));
    }

    function getCurrentPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    updateFormData({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => console.error('Erreur géolocalisation:', error),
            );
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (
            formData.title &&
            formData.date &&
            formData.latitude &&
            formData.longitude &&
            formData.notes &&
            formData.quantity &&
            formData.isPublic &&
            formData.confidenceLevel
        ) {
            setLoading(true);
        } else {
            console.error('Formulaire incomplet');
            return;
        }
        if (!user) {
            console.error('Utilisateur non authentifié');
            return;
        }
        const newObservation: CreateObservationDTO = {
            title: formData.title,
            date: formData.date || new Date(),
            latitude: formData.latitude,
            longitude: formData.longitude,
            quantity: formData.quantity,
            notes: formData.notes,
            isPublic: true,
            confidenceLevel: formData.confidenceLevel,
            userId: user.id,
            mushroomId: null,
        };
        try {
            const createdObservation = await observationsService.create(newObservation);
            if (createdObservation) {
                navigate('/observations');
            }
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden max-w-lg w-full">
            {/* En-tête */}
            <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-gray-50">
                <div>
                    <h2 className="font-title text-2xl font-bold">Nouvelle observation</h2>
                </div>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="p-4 border-b border-gray-100 gap-3">
                    <label className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
                        Ajouter une photo
                    </label>

                    {/* Inputs cachés */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                    <input
                        type="file"
                        ref={cameraInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                    />

                    {/* Prévisualisation */}
                    {preview && (
                        <div className="mb-3">
                            <img
                                src={preview}
                                alt="Prévisualisation"
                                className="w-full h-48 object-cover rounded-lg"
                            />
                        </div>
                    )}
                    <div className="flex gap-3 relative">
                        <button
                            type="button"
                            onClick={handleUploadClick}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-200  text-lime-700 rounded-full mb-3"
                        >
                            <Upload size={20} />
                            Télécharger
                        </button>
                        <button
                            type="button"
                            onClick={handleCameraClick}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-200  text-lime-700 rounded-full mb-3"
                        >
                            <Camera size={20} />
                            Prendre une photo
                        </button>
                    </div>
                </div>

                {/* Titre */}
                <div className="p-4 bg-gray-50">
                    <label className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
                        Titre
                    </label>
                    <div className="relative">
                        <Text
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            type="text"
                            placeholder="Titre"
                            onChange={(e) => updateFormData({ title: e.target.value })}
                            required
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="p-4 border-b border-gray-100 gap-3">
                    <label className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
                        Date
                    </label>
                    <div className="relative">
                        <Calendar
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={18}
                        />
                        <input
                            type="date"
                            value={formData.date?.toISOString().split('T')[0]}
                            onChange={(e) => updateFormData({ date: new Date(e.target.value) })}
                            required
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                </div>
                <div className="p-4 bg-gray-50 gap-3">
                    <label className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
                        Localisation
                    </label>
                    <div className="flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={getCurrentPosition}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-200  text-lime-700 rounded-full"
                        >
                            <Locate size={20} />
                            Utiliser ma position
                        </button>

                        {formData.latitude && formData.longitude ? (
                            <div>
                                <p className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full">
                                    Latitude {formData.latitude.toFixed(6)}
                                </p>
                                <p className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full">
                                    Longitude {formData.longitude.toFixed(6)}
                                </p>
                            </div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>

                <div className="p-4 border-b border-gray-100 gap-3">
                    <label className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
                        Notes
                    </label>
                    <div className="relative">
                        <textarea
                            value={formData.notes}
                            onChange={(e) => updateFormData({ notes: e.target.value })}
                            required
                            className="w-full pl-4 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        ></textarea>
                    </div>
                </div>

                <div className="p-4 bg-gray-50 gap-3">
                    <label className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
                        Quantité
                    </label>
                    <input
                        type="number"
                        min={1}
                        value={formData.quantity}
                        onChange={(e) => updateFormData({ quantity: parseInt(e.target.value) })}
                        required
                        className="w-full pl-4 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                </div>

                <div className="p-4 border-b border-gray-100 gap-3">
                    <label className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
                        Niveau de confiance
                    </label>
                    <select
                        value={formData.confidenceLevel}
                        onChange={(e) =>
                            updateFormData({ confidenceLevel: e.target.value as ConfidenceLevel })
                        }
                        required
                        className="w-full pl-4 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                        <option value={ConfidenceLevel.LOW}>Faible</option>
                        <option value={ConfidenceLevel.MEDIUM}>Moyen</option>
                        <option value={ConfidenceLevel.HIGH}>Élevé</option>
                    </select>
                </div>

                <div className="p-4 bg-gray-50 gap-3">
                    <label className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
                        Rendre l'observation publique
                    </label>
                    <input
                        type="checkbox"
                        checked={formData.isPublic}
                        onChange={(e) => updateFormData({ isPublic: e.target.checked })}
                        className="h-5 w-5 text-lime-700 focus:ring-lime-500 border-gray-300 rounded"
                    />
                </div>

                <div className="p-4 border-b border-gray-100 gap-3">
                    <label className="text-sm font-semibold text-gray-500 uppercase mb-2 block">
                        Identification de l'espèce (optionnel)
                    </label>
                    <select
                        value={formData.mushroomId || ''}
                        onChange={(e) =>
                            updateFormData({
                                mushroomId: e.target.value ? parseInt(e.target.value) : null,
                            })
                        }
                        className="w-full pl-4 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                        <option value="">Sélectionnez une espèce</option>
                        {mushrooms.map((mushroom) => (
                            <option key={mushroom.id} value={mushroom.id}>
                                {mushroom.commonName}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-2 bg-lime-700 text-white rounded-full font-semibold hover:bg-full-800 disabled:opacity-50"
                >
                    {loading ? 'Envoi...' : 'Créer la fiche'}
                </button>
            </form>
        </div>
    );
}
