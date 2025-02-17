import {Button, Grid2 as Grid} from "@mui/material";
import React, {useCallback, useEffect, useMemo, useReducer} from "react";
import axios from "axios";



const userRequestUriEndPointMap = new Map([
    ['user_register', '/bi/user/regiUser'],
    ['user_edit', '/bi/user/update'],
    ['user_delete', '/bi/user/inactivate'],
]);


const modalReducer = (state, action) => {
    console.log("action", action);
    if (action.type === "MODAL_OPEN") {
        return { isOpen: true, modalType: action.modalType };
    }

    if (action.type === "MODAL_CLOSE") {
        return { isOpen: false, modalType: null };
    }

    if (action.type === "SUBMIT_FORM") {
        const url = 
            `http://localhost:8082${userRequestUriEndPointMap.get(state.modalType)}`
        
        axios.post(url, action.form || {})
            .then(console.log)
            .catch(console.error);

        return { isOpen: false, modalType: state.modalType };
    }
    return state;
};

function shouldLoadData(isModalOpen, modalType) {

    // modalType : edit, create, delete
    // modalOpen : false
    // 해당 상황일 때, datagrid의 data reload가 필요하다.
    return !isModalOpen && modalType;
}

const SearchButtonGroup = ({loadData, selectedItems, children}) => {

    const [state, dispatch] = useReducer(modalReducer, {
        isOpen: false, modalType: null, form: null
    });

    useEffect(() => {
        if (shouldLoadData(state.isOpen, state.modalType)) {
            console.log("data load");
            loadData();
        }
    }, [state.isOpen, state.modalType]);

    const openModal = useCallback((modalType) => {
        dispatch({type: "MODAL_OPEN", modalType});
    }, []);

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

            { React.isValidElement(children) ?
                React.cloneElement(children, { dispatch, state, selectedRowsData: selectedItems }) : children }
        </>
    );
}

export default SearchButtonGroup;
