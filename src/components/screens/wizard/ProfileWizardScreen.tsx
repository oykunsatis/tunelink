import * as React from "react";
import { FirebaseService } from "../../../services/FirebaseService";

interface WizardStep {
    title: string;
    component: React.ComponentType<any>;
}

export function ProfileWizardScreen({ navigation }) {
    const [currentStep, setCurrentStep] = React.useState(0);
    const [userData, setUserData] = React.useState({
        personalInfo: {},
        musicalTastes: {},
        streamingServices: {}
    });

    const steps: WizardStep[] = [
        {
            title: "Personal Info",
            component: PersonalInfoStep
        },
        {
            title: "Music Services",
            component: MusicServicesStep
        },
        {
            title: "Musical Tastes",
            component: MusicalTastesStep
        }
    ];

    const handleStepComplete = async (stepData: any) => {
        const newUserData = {
            ...userData,
            [Object.keys(stepData)[0]]: stepData[Object.keys(stepData)[0]]
        };
        
        setUserData(newUserData);

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            try {
                const user = FirebaseService.getCurrentUser();
                if (user) {
                    await FirebaseService.updateUserProfile(user.uid, newUserData);
                    navigation.replace("Main");
                }
            } catch (error) {
                console.error("Error saving profile:", error);
            }
        }
    };

    const CurrentStepComponent = steps[currentStep].component;

    return (
        <flexboxLayout className="flex-1 bg-gray-100">
            <stackLayout className="w-full p-4 space-y-4">
                <label className="text-2xl font-bold text-center text-indigo-600">
                    {steps[currentStep].title}
                </label>
                
                <progressBar 
                    value={((currentStep + 1) / steps.length) * 100} 
                    className="bg-indigo-600"
                />

                <CurrentStepComponent
                    onComplete={handleStepComplete}
                    userData={userData}
                />
            </stackLayout>
        </flexboxLayout>
    );
}