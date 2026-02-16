import Link from "next/link";
import Layout from "@/components/Layout";
import Image from "@/components/Image";
import Button from "@/components/Button";

const NotFound = () => {
    return (
        <Layout title="404">
            <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center">
                <div className="relative w-full max-w-sm aspect-square mb-8">
                    <Image
                        src="/images/404.png"
                        fill
                        className="object-contain"
                        alt="Page non trouvée"
                    />
                </div>
                <h1 className="text-h2 font-bold mb-4">Page non trouvée</h1>
                <p className="text-body-1 text-t-secondary mb-8 max-w-md">
                    Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
                </p>
                <Link href="/">
                    <Button isBlack>Retour à l&apos;accueil</Button>
                </Link>
            </div>
        </Layout>
    );
};

export default NotFound;
