import * as React from "react";
import { ImageSource } from "@nativescript/core";

export function PersonalInfoStep({ onComplete, userData }) {
    const [name, setName] = React.useState(userData?.personalInfo?.name || "");
    const [birthdate, setBirthdate] = React.useState(userData?.personalInfo?.birthdate || "");
    const [gender, setGender] = React.useState(userData?.personalInfo?.gender || "");
    const [profileImage, setProfileImage] = React.useState<ImageSource | null>(null);

    const handleSubmit = () => {
        onComplete({
            personalInfo: {
                name,
                birthdate,
                gender,
                profileImage: profileImage ? profileImage.toBase64String("png") : null
            }
        });
    };

    const selectImage = async () => {
        // Image picker implementation will go here
    };

    return (
        <stackLayout className="space-y-4">
            <button 
                className="bg-gray-200 h-32 w-32 rounded-full self-center"
                onTap={selectImage}
            >
                {profileImage ? (
                    <image src={profileImage} className="rounded-full" />
                ) : (
                    <label className="text-gray-600">Add Photo</label>
                )}
            </button>

            <textField
                className="p-4 bg-white rounded-lg"
                hint="Full Name"
                text={name}
                onTextChange={(e) => setName(e.value)}
            />

            <datePicker
                className="p-4 bg-white rounded-lg"
                onDateChange={(e) => setBirthdate(e.value)}
            />

            <listPicker
                className="p-4 bg-white rounded-lg"
                items={["Male", "Female", "Other", "Prefer not to say"]}
                selectedIndex={0}
                onSelectedIndexChange={(e) => setGender(e.value)}
            />

            <button
                className="bg-indigo-600 text-white p-4 rounded-lg"
                onTap={handleSubmit}
            >
                Next
            </button>
        </stackLayout>
    );
}