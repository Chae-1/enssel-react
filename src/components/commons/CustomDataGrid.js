import DataGrid, {Column, Pager, Paging, Selection, HeaderFilter} from "devextreme-react/data-grid";
import {CustomStore} from "devextreme/common/data";
import axios from "axios";
import {useState} from "react";

const CustomDataGrid = ({columns, gridRef, formData, requestUrl, }) => {

    const [onload, setOnload] = useState(false);

    const refreshGrid = () => {
        setOnload(true);
        const instance = gridRef.current.instance();
        const dataGridDataSource = instance.getDataSource();
        dataGridDataSource.reload();
    };

    const store = new CustomStore({
        key: "id",
        async load() {
            try {
                if (!onload) {
                    return [];
                }

                const { data } = await axios.get("http://localhost:8082/bi/user/table", {
                    params: formData.current,
                });

                return {
                    data: data.data
                };
            } catch (err) {
                throw new Error("Data Loading Error.");
            }
        },
    });

    return (
        <>
            <DataGrid
                dataSource={store}
                allowColumnReordering={false}
                allowColumnResizing={false}
                ref={gridRef}
                columns={columns}
                keyExpr="id"
                dateSerializationFormat={"yyyy-MM-dd"}
                selection={{"mode":"multiple", "showCheckBoxesMode":"always", "selectAllMode":"page"}}
            >
                <Selection mode="multiple" showCheckBoxesMode={"always"} selectAllMode={"page"}/>
                <HeaderFilter visible={true}/>
                {columns.map((column => {
                    return <Column caption={column.caption}
                                   dataField={column.dataField}/>
                }))}
                <Paging defaultPageSize={12}/>
                <Pager visible={true} allowedPageSizes={false} showPageSizeSelector={true}/>
            </DataGrid>
        </>
    )
}
export default CustomDataGrid;
