import { useState, useEffect } from "react";
import Card from "@/components/Card";
import Icon from "@/components/Icon";
import Image from "@/components/Image";
import Field from "@/components/Field";
import Select from "@/components/Select";
import Editor from "@/components/Editor";
import { useUserStore } from "@/stores/userStore";
import { useLanguage } from "@/context/LanguageContext";
import { SelectOption } from "@/types/select";

const locations: SelectOption[] = [
    { id: 1, name: "France" },
    { id: 2, name: "United Kingdom" },
    { id: 3, name: "United States" },
    { id: 4, name: "Canada" },
    { id: 5, name: "Belgium" },
    { id: 6, name: "Switzerland" },
];

const ProfileInformation = ({}) => {
    const { user, updateProfile } = useUserStore();
    const { language } = useLanguage();
    
    const [preview, setPreview] = useState<string | null>(user?.avatar || "/images/avatar.png");
    const [displayName, setDisplayName] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [location, setLocation] = useState<SelectOption>(locations[0]);
    const [content, setContent] = useState("");

    useEffect(() => {
        if (user) {
            setDisplayName(user.username);
            setEmail(user.email);
            setPreview(user.avatar);
        }
    }, [user]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPreview(imageUrl);
            // In a real app, you would upload the file here
        }
    };

    return (
        <Card title={language === 'fr' ? "Informations du profil" : "Profile information"}>
            <div className="flex flex-col gap-8 p-5 pt-0 max-lg:px-3">
                <div className="flex items-center">
                    <div className="relative flex justify-center items-center shrink-0 w-20 h-20 rounded-full overflow-hidden bg-b-surface1">
                        {preview ? (
                            <Image
                                className="z-2 w-20 h-20 object-cover opacity-100"
                                src={preview}
                                width={80}
                                height={80}
                                quality={100}
                                priority={true}
                                alt="Avatar"
                            />
                        ) : (
                            <Icon
                                className="absolute top-1/2 left-1/2 -translate-1/2 fill-t-secondary"
                                name="camera"
                            />
                        )}
                        <input
                            type="file"
                            className="absolute z-3 inset-0 opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="grow max-w-88 pl-4 text-caption text-t-secondary">
                        {language === 'fr' 
                            ? "Mettez à jour votre avatar en cliquant sur l'image. JPG ou PNG recommandé." 
                            : "Update your avatar by clicking the image beside. JPG or PNG recommended."}
                    </div>
                </div>
                <Field
                    label={language === 'fr' ? "Nom d'affichage" : "Display name"}
                    placeholder={language === 'fr' ? "Entrez votre nom" : "Enter display name"}
                    value={displayName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDisplayName(e.target.value)}
                    required
                    validated
                />
                <Field
                    label="Email"
                    placeholder="Enter email"
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEmail(e.target.value)}
                    required
                    validated
                    readOnly // Email usually not changeable directly or requires verification
                />
                <Select
                    label={language === 'fr' ? "Localisation" : "Location"}
                    value={location}
                    onChange={setLocation}
                    options={locations}
                />
                <Editor
                    label="Bio"
                    content={content}
                    onChange={setContent}
                />
            </div>
        </Card>
    );
};

export default ProfileInformation;
