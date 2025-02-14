import { Outlet } from "react-router-dom";
import Sidebar from "../components/commons/Sidebar";
import Header from "../components/commons/Header";
import {useState} from "react";
/* dd */
const Layout = () => {

    const [open, setOpen] = useState(false);

    // open state가 변경될 때마다 호출되는 callback 메서드를 지정할 때 사용한다.
     return (
        <div className="wrapper">
            <Header open={open} setOpen={setOpen} />
            <Sidebar open={open} setOpen={setOpen} />
            <main>
                <Outlet />
            </main>  
        </div>
     )
} 
// outlet 부분이 router에 따라 보여질 DataGrid
export default Layout;