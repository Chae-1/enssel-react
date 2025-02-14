import React, {useCallback, useRef, useState} from "react";
import {CustomStore} from "devextreme/common/data";
import axios from "axios";
import UserSearchMenu from "../components/user/UserSearchMenu";
import DataGrid from "devextreme-react/data-grid";



const UserManagementPage = () => {

    const [onload, setOnload] = useState(false);

    const [selectedItems, setSelectedItems] = useState({});

    const gridRef = useRef(null);

    const searchForm = useRef({
        id: '',
        name: '',
        registerUserId: '',
        updateUserId: '',
        registerDateFrom: '',
        registerDateTo: '',
        updateDateFrom: '',
        updateDateTo: '',
        useYn: 'Y',
    });

    const setSearchForm = useCallback((key, value) => {
        searchForm.current[key] = value;
        console.log(searchForm.current);
    }, []);

    const onSelectionChanged = useCallback((e) => {
        const selectedRowsData = e.selectedRowsData;
        console.log(e.selectedRowsData);
        setSelectedItems({
            ...selectedRowsData
        });
    }, []);

    const store = new CustomStore({
        key: "id",
        async load() {
            try {
                if (!onload) {
                    return [];
                }
                const {data} = await axios.get("http://localhost:8082/bi/user/table", {
                    params: searchForm.current,
                });

                console.log(data);
                return {data: data.data};
            } catch (err) {
                throw new Error("Data Loading Error.");
            }
        },
    });

    const refreshGrid = useCallback(() => {
        setOnload(true);
        setSearchForm({});
        const instance = gridRef.current.instance();
        const dataGridDataSource = instance.getDataSource();
        dataGridDataSource.reload();
    }, []);

    const userDataGridColumns = [
        {
            dataField: "id",
            caption: "아이디",
        },
        {
            caption: "이름",
            dataField: "name",
        },
        {
            dataField: "password",
            caption: "패스워드",
        },
        {
            caption: '등록일',
            dataField: "registerDateTime",
            dataType: "date",
        },
        {
            caption: "등록자아이디",
            dataField: "registerUserId",
        }, {
            caption: "수정일",
            dataField: "updateDateTime",
            dataType: "date"
        },
        {
            caption: "수정자아이디",
            dataField: "updateUserId"
        },
        {
            caption: "사용여부",
            dataField: "useYn",
        }
    ];

    return (
        <>
            <UserSearchMenu
                loadData={refreshGrid} searchForm={searchForm} setSearchForm={setSearchForm}
                selectedItems={selectedItems}
            />

            <DataGrid
                dataSource={store}
                allowColumnReordering={false}
                allowColumnResizing={false}
                ref={gridRef}
                columns={userDataGridColumns}
                onSelectionChanged={onSelectionChanged}
                keyExpr="id"
                dateSerializationFormat={"yyyy-MM-dd"}
                selection={{ mode: "multiple", showCheckBoxesMode: "always", selectAllMode: "page" }}
                pager={{ visible: true, showNavigationButtons: true }}
                paging={{ enabled: true, pageSize: 10 }}
            />
        </>
    );
}
export default UserManagementPage;