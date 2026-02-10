"use client";

"use client";

import { useState } from "react";
import { NumericFormat } from "react-number-format";
import Search from "@/components/Search";
import Tabs from "@/components/Tabs";
import NoFound from "@/components/NoFound";
import Table from "@/components/Table";
import TableRow from "@/components/TableRow";
import Image from "@/components/Image";
import Dropdown from "@/components/Dropdown";
import { TabsOption } from "@/types/tabs";

import { payoutHistory } from "@/mocks/payouts";

const sortOptions: TabsOption[] = [
    { id: 1, name: "Tout" },
    { id: 2, name: "En attente" },
    { id: 3, name: "Payé" },
];

const tableHead = [
    "Date",
    "Statut",
    "Méthode",
    "ID Transaction",
    "Montant",
    "Frais",
    "Net",
];

const PayoutHistory = () => {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState<TabsOption>(sortOptions[0]);

    return (
        <div className="card">
            <div className="flex items-center max-md:h-12">
                <div className="pl-5 text-h6 max-lg:pl-3 max-md:mr-auto">
                    Historique des paiements
                </div>
                <Search
                    className="w-70 ml-6 mr-auto max-lg:w-64 max-lg:ml-4 max-md:hidden"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher..."
                    isGray
                />
                {search === "" && (
                    <>
                        <Tabs
                            className="max-md:hidden"
                            items={sortOptions}
                            value={sort}
                            setValue={setSort}
                        />
                        <Dropdown
                            className="hidden max-md:block"
                            items={sortOptions}
                            value={sort}
                            setValue={setSort}
                        />
                    </>
                )}
            </div>
            {search !== "" ? (
                <NoFound title="Aucun paiement trouvé" />
            ) : (
                <div className="p-1 pt-6 max-md:pt-3 max-lg:px-0">
                    <Table
                        cellsThead={tableHead.map((head) => (
                            <th
                                className="!h-12.5 last:text-right max-lg:nth-4:hidden max-lg:nth-6:hidden max-md:nth-3:hidden max-md:nth-5:hidden"
                                key={head}
                            >
                                {head}
                            </th>
                        ))}
                        isMobileVisibleTHead
                    >
                        {payoutHistory.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <td className="max-md:text-caption">
                                    {transaction.date}
                                </td>
                                <td>
                                    <div
                                        className={`label whitespace-nowrap ${
                                            transaction.status === "en cours"
                                                ? "label-yellow"
                                                : "label-green"
                                        }`}
                                    >
                                        {transaction.status
                                            .charAt(0)
                                            .toUpperCase() +
                                            transaction.status.slice(1)}
                                    </div>
                                </td>
                                <td className="max-md:hidden">
                                    <div className="inline-flex items-center gap-1 capitalize">
                                        <div className="shrink-0">
                                            <Image
                                                className="size-7 opacity-100"
                                                src={
                                                    transaction.method ===
                                                    "stripe"
                                                        ? "/images/logos/stripe.svg"
                                                        : "/images/logos/paypal.svg"
                                                }
                                                alt={transaction.method}
                                                width={28}
                                                height={28}
                                            />
                                        </div>
                                        {transaction.method}
                                    </div>
                                </td>
                                <td className="max-lg:hidden">
                                    {transaction.transactionId}
                                </td>
                                <td className="max-md:hidden">
                                    <NumericFormat
                                        value={transaction.amount}
                                        thousandSeparator=","
                                        decimalScale={2}
                                        fixedDecimalScale
                                        displayType="text"
                                        prefix="$"
                                    />
                                </td>
                                <td className="max-lg:hidden">
                                    <NumericFormat
                                        value={transaction.fees}
                                        thousandSeparator=","
                                        decimalScale={2}
                                        fixedDecimalScale
                                        displayType="text"
                                        prefix="$"
                                    />
                                </td>
                                <td className="text-right text-sub-title-2 max-md:text-body-2 max-md:font-normal">
                                    <NumericFormat
                                        value={transaction.net}
                                        thousandSeparator=","
                                        decimalScale={2}
                                        fixedDecimalScale
                                        displayType="text"
                                        prefix="$"
                                    />
                                </td>
                            </TableRow>
                        ))}
                    </Table>
                </div>
            )}
        </div>
    );
};

export default PayoutHistory;
