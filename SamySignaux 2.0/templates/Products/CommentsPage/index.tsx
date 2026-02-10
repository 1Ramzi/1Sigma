"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Layout from "@/components/Layout";
import Search from "@/components/Search";
import Select from "@/components/Select";
import Button from "@/components/Button";
import DeleteItems from "@/components/DeleteItems";
import NoFound from "@/components/NoFound";
import Dropdown from "@/components/Dropdown";
import List from "./List";
import { Comment } from "@/types/comment";
import { SelectOption } from "@/types/select";
import { useSelection } from "@/hooks/useSelection";

import { comments } from "@/mocks/comments";

const CommentsPage = () => {
    const { t } = useLanguage();

    const timeCreateOptions: SelectOption[] = [
        { id: 1, name: t.newestFirst },
        { id: 2, name: t.oldestFirst },
        { id: 3, name: "A-Z" },
        { id: 4, name: "Z-A" },
    ];

    const [search, setSearch] = useState("");
    const [timeCreate, setTimeCreate] = useState<SelectOption>(timeCreateOptions[0]);
    const {
        selectedRows,
        selectAll,
        handleRowSelect,
        handleSelectAll,
        handleDeselect,
    } = useSelection<Comment>(comments);

    return (
        <Layout title={t.commentsTitle}>
            <div className="max-w-[1200px] mx-auto card">
                {selectedRows.length === 0 ? (
                    <div className="flex items-center min-h-12">
                        <div className="pl-5 text-h6 max-lg:pl-3 max-md:mr-auto">
                            {comments.length} {t.newComments}
                        </div>
                        <Search
                            className="w-70 ml-6 mr-auto max-lg:w-60 max-md:hidden"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={t.searchComments}
                            isGray
                        />
                        {search === "" && (
                            <>
                                <Select
                                    className="min-w-45 max-md:hidden"
                                    value={timeCreate}
                                    onChange={setTimeCreate}
                                    options={timeCreateOptions}
                                />
                                <Dropdown
                                    className="hidden max-md:block"
                                    items={timeCreateOptions}
                                    value={timeCreate}
                                    setValue={setTimeCreate}
                                />
                            </>
                        )}
                    </div>
                ) : (
                    <div className="flex items-center">
                        <div className="mr-6 pl-5 text-h6">
                            {selectedRows.length} {t.comment.toLowerCase()}{selectedRows.length !== 1 ? "s" : ""} {t.selected}
                        </div>
                        <Button
                            className="mr-auto"
                            isStroke
                            onClick={handleDeselect}
                        >
                            {t.deselect}
                        </Button>
                        <DeleteItems
                            counter={selectedRows.length}
                            content={t.deleteCommentConfirmation}
                            onDelete={() => {}}
                            isLargeButton
                        />
                        <Button className="ml-2" isBlack>
                            {t.markAsRead}
                        </Button>
                    </div>
                )}
                {search !== "" ? (
                    <NoFound title={t.noTransactionsFound} /> // Reuse noTransactionsFound or similar
                ) : (
                    <div className="p-1 pt-3 max-lg:px-0">
                        <List
                            selectedRows={selectedRows}
                            onRowSelect={handleRowSelect}
                            items={comments}
                            selectAll={selectAll}
                            onSelectAll={handleSelectAll}
                        />
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default CommentsPage;
