import * as React from "react";
import { StreamingService } from "../../../../services/StreamingService";

export function MusicServicesStep({ onComplete, userData }) {
    const [services, setServices] = React.useState<any[]>([]);
    const [selectedServices, setSelectedServices] = React.useState(
        userData?.streamingServices?.connected || []
    );

    React.useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        const availableServices = await StreamingService.getInstalledServices();
        setServices(availableServices);
    };

    const toggleService = async (service: string) => {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter(s => s !== service));
        } else {
            // Here we would normally handle OAuth flow for the service
            setSelectedServices([...selectedServices, service]);
        }
    };

    const handleSubmit = () => {
        onComplete({
            streamingServices: {
                connected: selectedServices
            }
        });
    };

    return (
        <stackLayout className="space-y-4">
            <label className="text-gray-600 text-center">
                Connect your music streaming services
            </label>

            {services.map((service, index) => (
                <button
                    key={index}
                    className={`p-4 rounded-lg ${
                        selectedServices.includes(service.name)
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white text-gray-800'
                    }`}
                    onTap={() => toggleService(service.name)}
                >
                    {service.name}
                </button>
            ))}

            <button
                className="bg-indigo-600 text-white p-4 rounded-lg mt-4"
                onTap={handleSubmit}
            >
                Next
            </button>
        </stackLayout>
    );
}