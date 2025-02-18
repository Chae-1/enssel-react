import React, {useCallback, useRef, useState} from "react";
import UserSearchMenu from "../components/user/UserSearchMenu";
import UserDataGrid from "../components/user/datagrid/UserDataGrid";
import UserGroupDataGrid from "../components/user/datagrid/UserGroupDataGrid";

function emptySearchForm() {
    return {
        id: '',
        name: '',
        registerUserId: '',
        updateUserId: '',
        registerDateFrom: '',
        registerDateTo: '',
        updateDateFrom: '',
        updateDateTo: '',
        useYn: 'Y',
    };
}

const UserManagementPage = () => {

    const [onload, setOnload] = useState(false);

    // state -> 변경될때마다 모든 컴포넌트 렌더링, useRef -> 1번 렌더링
    // 변경을 감지하지 못한다.
    const selectedItems = useRef([]);

    const userDateGridRef = useRef(null);

    const groupDataGridRef = useRef(null);

    const searchForm = useRef(emptySearchForm());

    const setSelectedItems = (rowItems) => {
        selectedItems.current = rowItems;
    };

    const setSearchForm = useCallback((key, value) => {
        searchForm.current[key] = value;
    }, []);

    const onSelectionChanged = useCallback((e) => {
        const selectedRowsData = e.selectedRowsData;
        setSelectedItems([
            ...selectedRowsData
        ]);
    }, []);

    const refreshGrid = useCallback(() => {
        setOnload(true);
        setSearchForm(emptySearchForm());
        setSelectedItems([]);

        // user data grid.
        const userDataGridInstance = userDateGridRef.current.instance();
        userDataGridInstance.clearSelection();
        const userDataSource = userDataGridInstance.getDataSource();
        userDataSource.reload();

        // group date grid.
        const groupDataGridInstance = groupDataGridRef.current.instance();
        groupDataGridInstance.clearSelection();
        const groupDataSource = userDataGridInstance.getDataSource();
        groupDataSource.reload();
    }, []);


    return (
        <>
            <UserSearchMenu
                loadData={refreshGrid} searchForm={searchForm} setSearchForm={setSearchForm}
                selectedItems={selectedItems}
            />

            <UserDataGrid userDateGridRef={userDateGridRef}
                          onload={onload}
                          searchForm={searchForm}
                          onSelectionChanged={onSelectionChanged}
            />

            <UserGroupDataGrid groupDataGridRef={groupDataGridRef}
                               selectedItems={selectedItems} onload={onload}
                               searchForm={searchForm}/>

        </>
    );
}
export default UserManagementPage;