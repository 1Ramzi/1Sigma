"use client";

import { useState } from "react";
import Card from "@/components/Card";
import Field from "@/components/Field";
import Editor from "@/components/Editor";

const ProductDetails = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <Card title="Détails du produit">
            <div className="flex flex-col gap-8 px-5 pb-5 max-lg:px-3 max-lg:pb-3">
                <Field
                    label="Titre du produit"
                    placeholder="ex. Bento Cards : Interface Utilisateur"
                    tooltip="Maximum 100 caractères. Pas de HTML ou d'emoji autorisé"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <Editor
                    label="Description"
                    tooltip="Maximum 100 caractères. Pas de HTML ou d'emoji autorisé"
                    content={content}
                    onChange={setContent}
                />
            </div>
        </Card>
    );
};

export default ProductDetails;
