import React from "react";
import {TextField, Button, Grid2 as Grid, Paper} from "@mui/material";
import {isDateFormat} from "../../util/dateTypeValidator";

const SearchMenu = ({loadData, searchForm, setSearchForm}) => {

    const handleChange = (e) => {
        const {name, value} = e.target;
        if (!isDateFormat(value)) {
            setSearchForm(name, value);
            return;
        }
        const [year, month, day] = value.split("-").map(Number);
        const date = new Date(year, month - 1, day, 0, 0, 0, 0);
        setSearchForm(name, date.toISOString().split("Z")[0]);
    }

    const onKeyDown = (e) => {
        console.log(`keyDown ${e.key}`)
        if (e.key === "Enter") {
            loadData();
        }
    }

    return (
        <>
            <Paper sx={{padding: 2, marginBottom: 2}}>
                <form>
                    <Grid container spacing={2}>
                        <Grid item size={{xs: 12, sm: 6, md: 3}}>
                            <TextField
                                name="name"
                                label="이름"
                                value={searchForm.name}
                                onKeyDown={onKeyDown}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item size={{xs: 12, sm: 6, md: 3}}>
                            <TextField
                                name="id"
                                label="아이디"
                                value={searchForm.id}
                                onChange={handleChange}
                                onKeyDown={onKeyDown}
                                fullWidth
                            />
                        </Grid>

                        <Grid item size={{xs: 12, sm: 6, md: 3}}>
                            <TextField
                                name="registerUserId"
                                label="등록자"
                                value={searchForm.registerUserId}
                                onChange={handleChange}
                                onKeyDown={onKeyDown}
                                fullWidth
                            />
                        </Grid>

                        <Grid item size={{xs: 12, sm: 6, md: 3}}>
                            <TextField
                                name="updateUserId"
                                label="수정자"
                                value={searchForm.updateUserId}
                                onChange={handleChange}
                                onKeyDown={onKeyDown}
                                fullWidth
                            />
                        </Grid>

                        <Grid item size={{xs: 12, sm: 6, md: 6}}>
                            <Grid container spacing={2}>
                                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                                    <TextField
                                        name="registerDateFrom"
                                        label="등록일 From"
                                        type="date"
                                        value={searchForm.registerDateFrom}
                                        onChange={handleChange}
                                        onKeyDown={onKeyDown}
                                        fullWidth
                                        slotProps={{inputLabel: {shrink: true}}}/>
                                </Grid>
                                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                                    <TextField
                                        name="registerDateTo"
                                        label="등록일 To"
                                        type="date"
                                        value={searchForm.registerDateFrom}
                                        onChange={handleChange}
                                        onKeyDown={onKeyDown}
                                        fullWidth
                                        slotProps={{inputLabel: {shrink: true}}}/>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item size={{xs: 12, sm: 6, md: 6}}>
                            <Grid container spacing={2}>
                                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                                    <TextField
                                        name="updateDateFrom"
                                        label="수정일 시작"
                                        type="date"
                                        value={searchForm.updateDateFrom}
                                        onChange={handleChange}
                                        onKeyDown={onKeyDown}
                                        fullWidth
                                        slotProps={{inputLabel: {shrink: true}}}/>
                                </Grid>
                                <Grid item size={{xs: 12, sm: 6, md: 6}}>
                                    <TextField
                                        name="updateDateTo"
                                        label="수정일 종료"
                                        type="date"
                                        value={searchForm.updateDateTo}
                                        onChange={handleChange}
                                        onKeyDown={onKeyDown}
                                        fullWidth
                                        slotProps={{inputLabel: {shrink: true}}}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </>
    );
};

export default SearchMenu;
