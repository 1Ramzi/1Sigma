import SignalDetail from "@/templates/SignalDetail";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    return <SignalDetail id={resolvedParams.id} />;
}
