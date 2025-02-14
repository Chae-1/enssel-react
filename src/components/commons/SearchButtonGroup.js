import {Button, Grid2 as Grid} from "@mui/material";
import React, {useCallback, useEffect, useMemo, useReducer} from "react";
import UserModal from "../user/modal/UserModal";
import axios from "axios";

const modalReducer = (state, action) => {
    console.log("action", action);
    if (action.type === "OPEN") {
        return {isOpen: true, modalType: action.modalType};
    }

    if (action.type === "CLOSE") {
        return {isOpen: false, modalType: null};
    }

    if (action.type === "SUBMIT_FORM") {
        const url = state.modalType === "user_register"
            ? "http://localhost:8082/bi/user/regiUser"
            : "http://localhost:8082/bi/user/update";

        axios.post(url, action.form || {})
            .then(console.log)
            .catch(console.error);

        return {isOpen: false, modalType: null};
    }
    return state;
};

const SearchButtonGroup = ({loadData, selectedItems}) => {

    const [state, dispatch] = useReducer(modalReducer, {
        isOpen: false, modalType: null, form: null
    });

    useEffect(() => {
        if (!state.isOpen) {
            loadData();
        }
    }, [state.isOpen, loadData]);

    const openModal = useCallback((modalType) => {
        dispatch({type: "OPEN", modalType});
    }, [])


    const buttonConfigs = [
        {label: "조회", action: loadData},
        {label: "등록", action: () => openModal("user_register")},
        {label: "수정", action: () => openModal("user_edit")},
        {label: "삭제", action: () => openModal("user_delete")}
    ];

    return (
        <>
            <Grid
                container
                spacing={2}
                sx={{
                    justifyContent: "space-around",
                    textAlign: "center",
                    marginTop: "1.5rem",
                    marginBottom: "1.5rem",
                    fontSize: "1.5rem",
                }}>
                {buttonConfigs.map(({label, action}) => (
                    <Grid key={label} size={{xs: 6, sm: 3, md: 3}}>
                        <Button onClick={action}>{label}</Button>
                    </Grid>
                ))}
            </Grid>

            <UserModal dispatch={dispatch} state={state} selectedRowsData={selectedItems}/>
        </>
    );
}

export default SearchButtonGroup;
