import { Link, NavLink } from "react-router-dom";
import {useEffect, useState} from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// redux를 이용해서, 상태관리를 수행하도록 만들어 보자.
// 이벤트에 따라서 menu가 변경이 되어야한다.

const Sidebar = ({open, setOpen}) => {

    // 메뉴가 업데이트 됐을 경우, 이 상태가 변경
    const [menus, setMenus] = useState([
        {name: '사용자 관리', url: "/page1"},
        {name: '메뉴 관리', url: "/page2"}
    ]);

    useEffect(() => {

    }, [menus]);

    const SideMenuList = (
        <Box sx={{width: 250}}>
            <List>
                {menus.map((menu, index) => (
                <ListItem key={menu.name} disablePadding>
                    <NavLink to={menu.url} style={{ textDecoration: "none", color: "black" }} className={({isActive}) => isActive ? "active" : "" }>
                        <ListItemButton>
                            <ListItemText primary={menu.name}></ListItemText>
                        </ListItemButton>
                    </NavLink>
                </ListItem>
                ))}
            </List>
        </Box>
    )


    return (
        <div>
            <Drawer open={open} onClose={() => setOpen(false)}>
                {SideMenuList}
            </Drawer>
        </div>
    );
}

export default Sidebar;