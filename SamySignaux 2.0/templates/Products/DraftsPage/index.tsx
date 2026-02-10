"use client";

"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Search from "@/components/Search";
import Tabs from "@/components/Tabs";
import Button from "@/components/Button";
import DeleteItems from "@/components/DeleteItems";
import NoFound from "@/components/NoFound";
import List from "./List";
import Grid from "./Grid";
import { ProductDraft } from "@/types/product";
import { TabsOption } from "@/types/tabs";
import { useSelection } from "@/hooks/useSelection";

import { draftsProducts } from "@/mocks/products";

const views: TabsOption[] = [
    { id: 1, name: "grille" },
    { id: 2, name: "liste" },
];

const DraftsPage = () => {
    const [search, setSearch] = useState("");
    const [view, setView] = useState<TabsOption>(views[1]);
    const {
        selectedRows,
        selectAll,
        handleRowSelect,
        handleSelectAll,
        handleDeselect,
    } = useSelection<ProductDraft>(draftsProducts);

    return (
        <Layout title="Brouillons">
            <div className="max-w-[1200px] mx-auto card">
                {selectedRows.length === 0 ? (
                    <div className="flex items-center">
                        <div className="pl-5 text-h6 max-lg:pl-3 max-md:mr-auto">
                            Produits
                        </div>
                        <Search
                            className="w-70 ml-6 mr-auto max-md:hidden"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher des produits"
                            isGray
                        />
                        {search === "" && (
                            <Tabs
                                items={views}
                                value={view}
                                setValue={setView}
                                isOnlyIcon
                            />
                        )}
                    </div>
                ) : (
                    <div className="flex items-center">
                        <div className="mr-6 pl-5 text-h6">
                            {selectedRows.length} produit{selectedRows.length !== 1 ? "s" : ""} sélectionné{selectedRows.length !== 1 ? "s" : ""}
                        </div>
                        <Button
                            className="mr-auto"
                            isStroke
                            onClick={handleDeselect}
                        >
                            Désélectionner
                        </Button>
                        <DeleteItems
                            counter={selectedRows.length}
                            onDelete={() => {}}
                            isLargeButton
                        />
                        <Button className="ml-2" isBlack>
                            Publier
                        </Button>
                    </div>
                )}
                {search !== "" ? (
                    <NoFound title="Aucun produit trouvé" />
                ) : (
                    <div className="p-1 pt-3 max-lg:px-0">
                        {view.id === 1 ? (
                            <Grid
                                selectedRows={selectedRows}
                                onRowSelect={handleRowSelect}
                                items={draftsProducts}
                            />
                        ) : (
                            <List
                                selectedRows={selectedRows}
                                onRowSelect={handleRowSelect}
                                items={draftsProducts}
                                selectAll={selectAll}
                                onSelectAll={handleSelectAll}
                            />
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default DraftsPage;
