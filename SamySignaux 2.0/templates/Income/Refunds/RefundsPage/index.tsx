"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import Search from "@/components/Search";
import Tabs from "@/components/Tabs";
import Button from "@/components/Button";
import DeleteItems from "@/components/DeleteItems";
import NoFound from "@/components/NoFound";
import Dropdown from "@/components/Dropdown";
import { Refund } from "@/types/refund";
import { TabsOption } from "@/types/tabs";
import { useSelection } from "@/hooks/useSelection";
import List from "./List";

import { refunds } from "@/mocks/refunds";

const views: TabsOption[] = [
    { id: 1, name: "Demandes ouvertes" },
    { id: 2, name: "Demandes fermées" },
];

const RefundsPage = () => {
    const [search, setSearch] = useState("");
    const [view, setView] = useState<TabsOption>(views[0]);
    const {
        selectedRows,
        selectAll,
        handleRowSelect,
        handleSelectAll,
        handleDeselect,
    } = useSelection<Refund>(refunds);

    return (
        <Layout title="Remboursements">
            <div className="max-w-[1200px] mx-auto card">
                {selectedRows.length === 0 ? (
                    <div className="flex items-center max-md:h-12">
                        <div className="pl-5 text-h6 max-lg:mr-auto max-lg:pl-3">
                            {refunds.length} demande{refunds.length !== 1 ? "s" : ""} ouverte{refunds.length !== 1 ? "s" : ""}
                        </div>
                        <Search
                            className="w-70 ml-6 mr-auto max-lg:hidden"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Rechercher des demandes"
                            isGray
                        />
                        {search === "" && (
                            <>
                                <Tabs
                                    className="max-md:hidden"
                                    items={views}
                                    value={view}
                                    setValue={setView}
                                />
                                <Dropdown
                                    className="hidden max-md:block"
                                    items={views}
                                    value={view}
                                    setValue={setView}
                                />
                            </>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center">
                        <div className="mr-6 pl-5 text-h6">
                            {selectedRows.length} remboursement{selectedRows.length !== 1 ? "s" : ""} sélectionné{selectedRows.length !== 1 ? "s" : ""}
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
                            content={`Cela supprimera définitivement ${
                                selectedRows.length > 1
                                    ? `${selectedRows.length} remboursements`
                                    : "ce remboursement"
                            }, et toutes les données seront supprimées. Cette action est irréversible.`}
                            onDelete={() => {}}
                            isLargeButton
                        />
                    </div>
                )}
                {search !== "" ? (
                    <NoFound title="Aucune demande trouvée" />
                ) : (
                    <div className="p-1 pt-3 max-lg:px-0">
                        <List
                            selectedRows={selectedRows}
                            onRowSelect={handleRowSelect}
                            items={refunds}
                            selectAll={selectAll}
                            onSelectAll={handleSelectAll}
                        />
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default RefundsPage;
