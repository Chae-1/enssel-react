import DataGrid from "devextreme-react/data-grid";
import React, {useCallback, useState} from "react";
import {CustomStore, DataSource} from "devextreme/common/data";
import axios from "axios";


const UserGroupDataGrid = ({groupDataGridRef, searchForm, onload, }) => {


    const userDataGridColumns = [
        {
            caption: "가입일자",
            dataField: "regiDateTime",
        },
        {
            caption: "회원수",
            dataField: "registerCount",
        }
    ];

    const groupDataSource = new CustomStore({
        key: "regiDateTime",
        async load() {
            try {
                if (!onload) {
                    return [];
                }

                const {data} = await axios.get("http://localhost:8082/bi/user/table/group", {
                    params: searchForm.current,
                });

                console.log(data);
                return {data: data.data};
            } catch (err) {
                console.error(err);
                throw new Error("Data Loading Error.");
            }
        },
    });

    return (
        <DataGrid
            dataSource={groupDataSource}
            ref={groupDataGridRef}
            columns={userDataGridColumns}
            selection={{mode: "multiple", showCheckBoxesMode: "always", selectAllMode: "page"}}
            dateSerializationFormat={"yyyy-MM-dd"}
            allowColumnReordering={false}
            allowColumnResizing={false}
            pager={{visible: true, showNavigationButtons: true}}
            paging={{enabled: true, pageSize: 10}}
        />
    );
}

export default UserGroupDataGrid;