import DataGrid from "devextreme-react/data-grid";
import React, {useCallback, useState} from "react";
import {CustomStore} from "devextreme/common/data";
import axios from "axios";

const UserDataGrid = ({userDateGridRef, onload, searchForm, onSelectionChanged }) => {


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


    const userDataGridStore = new CustomStore({
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
                return { data: data.data };
            } catch (err) {
                console.error(err);
                throw new Error("Data Loading Error.");
            }
        },
    });


    return (
        <DataGrid
            dataSource={userDataGridStore}
            ref={userDateGridRef}
            columns={userDataGridColumns}
            onSelectionChanged={onSelectionChanged}
            selection={{ mode: "multiple", showCheckBoxesMode: "always", selectAllMode: "page" }}
            dateSerializationFormat={"yyyy-MM-dd"}
            allowColumnReordering={false}
            allowColumnResizing={false}
            pager={{ visible: true, showNavigationButtons: true }}
            paging={{ enabled: true, pageSize: 10 }}
        />
    );
}

export default UserDataGrid;