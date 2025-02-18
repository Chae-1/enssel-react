import React from "react";
import SearchButtonGroup from "../commons/SearchButtonGroup";
import SearchMenu from "../commons/SearchMenu";
import UserModal from "./modal/UserModal";

const UserSearchForm = ({loadData, searchForm, setSearchForm, selectedItems}) => {

    return (
        <>
            <SearchMenu loadData={loadData} searchForm={searchForm} setSearchForm={setSearchForm}/>
            <SearchButtonGroup loadData={loadData} selectedItems={selectedItems}>
                <UserModal />
            </SearchButtonGroup>
        </>
    );
};

export default UserSearchForm;
