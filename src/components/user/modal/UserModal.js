import axios from "axios";
import React, {useCallback, useEffect, useMemo, useReducer} from "react";
import RegisterUserModalContent from "./RegisterUserModalContent";
import EditUserModalContent from "./EditUserModalContent";
import DeleteUserModalContent from "./DeleteUserModalContent";
import {IconButton, Modal, Stack} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InvalidModalContent from "./InvaildModalContent";


const UserModal = ({dispatch, state, selectedRowsData}) => {

    const closeAction = () => dispatch({
        type: "MODAL_CLOSE"
    });

    useEffect(() => {
        console.log("Modal Type changed:", state.modalType);
    }, [state.modalType]);

    const getModalContent = () => {
        const items = selectedRowsData.current;
        const length = items.length;
        const modalContentMap = {
            user_register: <RegisterUserModalContent dispatch={dispatch}/>,
            user_edit:
                length === 1
                    ? <EditUserModalContent selectedItem={items[0]} dispatch={dispatch}/>
                    : <InvalidModalContent dispatch={dispatch}/>,
            user_delete:
                length > 0
                    ? <DeleteUserModalContent dispatch={dispatch} selectedItems={items}/>
                    : <InvalidModalContent dispatch={dispatch}/>,
        };

        return modalContentMap[state.modalType] || <></>;
    };

    return (
        <Modal open={state.isOpen} onClose={closeAction}>
            <Stack sx={{position: "relative", width: 400, bgcolor: "white", p: 3, m: "auto", mt: "10%"}}>
                <IconButton
                    onClick={closeAction}
                    sx={{
                        position: "absolute",
                        top: 0, // 상단 여백
                        right: 0, // 우측 여백
                        color: "red"
                    }}
                >
                    <CloseIcon/>
                </IconButton>
                { getModalContent() }
            </Stack>
        </Modal>
    );
}

export default UserModal;