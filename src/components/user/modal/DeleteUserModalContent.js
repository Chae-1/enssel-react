import {Button, Typography} from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";

const DeleteUserModalContent = ({dispatch, selectedItems}) => {

    const sendDelete = () => {
        const itemIds = selectedItems
            .map(selectedItem => selectedItem.id);
        dispatch({type: "SUBMIT_FORM", form: { userIds: itemIds }});
    }

    const closeModal = () => {
        dispatch({type: "MODAL_CLOSE"});
    }

    return (
        <Box>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
            }}>
                <Typography variant="h5" gutterBottom>
                    삭제
                </Typography>
            </Box>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
            }}>
                <Button onClick={sendDelete}>네</Button>
                <Button onClick={closeModal}>아니오</Button>
            </Box>
        </Box>
    )
};

export default DeleteUserModalContent;
