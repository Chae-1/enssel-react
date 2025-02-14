import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ open, setOpen }) => {

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" onClick={() => setOpen(!open)}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6">TEST</Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;