import React, {useEffect, useMemo, useReducer} from "react";
import SearchButtonGroup from "../commons/SearchButtonGroup";
import SearchMenu from "../commons/SearchMenu";

const UserSearchForm = ({loadData, searchForm, setSearchForm, selectedItems}) => {

    return (
        <>
            <SearchMenu loadData={loadData} searchForm={searchForm} setSearchForm={setSearchForm}/>
            <SearchButtonGroup loadData={loadData} selectedItems={selectedItems}/>
        </>
    );
};

export default UserSearchForm;
