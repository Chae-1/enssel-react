import axios from "axios";
import React, {useMemo, useReducer} from "react";
import RegisterUserModalContent from "./RegisterUserModalContent";
import EditUserModalContent from "./EditUserModalContent";
import DeleteUserModalContent from "./DeleteUserModalContent";
import {IconButton, Modal, Stack} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InvalidModalContent from "./InvaildModalContent";


const UserModal = ({ dispatch, state, selectedRowsData}) => {

    const closeAction = () => dispatch({
        type: "CLOSE"
    });

    const getModalContent = () => {
        const modalContentMap = {
            user_register: <RegisterUserModalContent dispatch={dispatch} />,
            user_edit:
                selectedRowsData.length === 1
                    ? <EditUserModalContent dispatch={dispatch} />
                    : <InvalidModalContent dispatch={dispatch} />,
            user_delete:
                selectedRowsData.length > 0
                    ? <DeleteUserModalContent dispatch={dispatch} />
                    : <InvalidModalContent dispatch={dispatch} />,
        };

        return modalContentMap[state.modalType] || <></>;
    };

    return (
        <Modal open={ state.isOpen } onClose={ closeAction }>
            <Stack sx={{position: "relative", width: 400, bgcolor: "white", p: 3, m: "auto", mt: "10%"}}>
                <IconButton
                    onClick={ closeAction }
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