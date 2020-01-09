import Axios from "axios";

export const setPage = page => ({
    type: "SET_PAGE",
    page
});
export const setType = listType => ({
    type: "SET_TYPE",
    listType
});
export const setSearchContent = searchContent => ({
    type: "SET_SEARCH_CONTENT",
    searchContent
});
export const setSort = sort => ({
    type: "SET_SORT",
    sort
});
export const setSuperior = superiorID => ({
    type: "SET_SUPERIOR",
    superiorID
});
export const editAvatar = avatar => ({
    type: "EDIT_AVATAR",
    avatar
});
export const editName = name => ({
    type: "EDIT_NAME",
    name
});
export const editSex = sex => ({
    type: "EDIT_SEX",
    sex
});
export const editRank = rank => ({
    type: "EDIT_RANK",
    rank
});
export const editDate = date => ({
    type: "EDIT_DATE",
    date
});
export const editPhone = phone => ({
    type: "EDIT_PHONE",
    phone
});
export const editEmail = email => ({
    type: "EDIT_EMAIL",
    email
});
export const editSuperiorID = ID => ({
    type: "EDIT_SUPERIORID",
    superiorID: ID
});
export const editSuperiorName = name => ({
    type: "EDIT_SUPERIORNAME",
    superiorName: name
})
const resetState = () => ({
    type: "RESET"
});
const updateListStart = () => {
    return {
        type: "UPDATE_START"
    }
}
const updateListSuccess = data => {
    return{
        type: "UPDATE_SUCCESS",
        curList: data.soldiers,
        hasNext: data.hasNext
    }
}
const updateListFail = error => {
    return{
        type: "UPDATE_FAIL",
        error
    }
}
const editStart = () => {
    return {
        type: "EDIT_FETCH_START"
    };
};
const editFail = (err, finished) => {
    return {
        type: "EDIT_FETCH_FAIL",
        error: err,
        finished
    };
};
const editSuccess = (data, finished) => {
    return {
        type: "EDIT_FETCH_SUCCESS",
        data,
        finished
    };
};
const createFetchStart = () => {
    return{
        type: "CREATE_FETCH_PRE"
    }
}
const createStart = data => {
    return{
        type: "CREATE_FETCH_START",
        value: data
    }
};
const createFail = err => {
    return {
        type: "CREATE_FETCH_FAIL",
        error: err
    };
};
const createSuccess = () => {
    return {
        type: "CREATE_FETCH_SUCCESS"
    };
};
const addToListSuccess = data => {
    return{
        type: "ADD_DATA",
        data: data.soldiers,
        hasNext: data.hasNext
    }
}
export const resetList = () => {
    return (dispatch, getState) => {
        dispatch(updateListStart());
        Axios.get(`http://localhost:9000/soldiers/getsome`)
            .then(res => {
                dispatch(resetState());
                dispatch(updateListSuccess(res.data));
            })
            .catch(err => {
                dispatch(updateListFail(err.message));
            })
    }
}
export const createSoldier = (body, page, sort, sortby, search, type, superiorID) => {
    return (dispatch, getState) => {
        Axios.post("http://localhost:9000/soldiers/create", body)
            .then(res => {
                Axios.get(`http://localhost:9000/soldiers/getsome?start=0&end=${page + 1}&sort=${sort}&sortby=${sortby}&search=${search}&type=${type}&superiorID=${superiorID}`)
                    .then(res => {
                        dispatch(updateListSuccess(res.data));
                        dispatch(createSuccess());
                    })
                    .catch(err => {
                        dispatch(createFail(err.message));
                    })
            })
            .catch(err => {
                dispatch(createFail(err.message));
            });
    };
};
export const createFetch = () => {
    return (dispatch, getState) => {
        dispatch(createFetchStart());
        Axios.get(`http://localhost:9000/soldiers/getall`)
            .then(res => {
                dispatch(createStart(res.data));
            })
            .catch(err => {
                dispatch(createFail(err.message))
            })
    }
};
export const editFetch = (id) => {
    return (dispatch, getState) => {
        dispatch(editStart());
        Axios.get(`http://localhost:9000/soldiers/getone/${id}`)
            .then(res => {
                dispatch(editSuccess(res.data, false));
            })
            .catch(err => {
                dispatch(editFail(err.message, true));
            });
    }
}
export const editSoldier = (id, newbody, page, sort, sortby, search, type, superiorID) => {
    return (dispatch, getState) => {
        dispatch(updateListStart())
        Axios.put(`http://localhost:9000/soldiers/edit/${id}`, newbody)
            .then(res => {
                let soldier = res.data;
                Axios.get(`http://localhost:9000/soldiers/getsome?start=0&end=${page + 1}&sort=${sort}&sortby=${sortby}&search=${search}&type=${type}&superiorID=${superiorID}`)
                    .then(res => {
                        dispatch(updateListSuccess(res.data));
                        dispatch(editSuccess(soldier, true));
                    })
                    .catch(err => {
                        dispatch(editFail(err.message, true));
                    })
            })
            .catch(err => {
                dispatch(editFail(err.message, true));
            });
    };
};
export const delSoldier = (id, page, sort, sortby, search, type, superiorID) => {
    return (dispatch, getState) => {
        dispatch(updateListStart());
        Axios.delete(`http://localhost:9000/soldiers/delete/${id}`)
            .then(res => {
                Axios.get(`http://localhost:9000/soldiers/getsome?start=0&end=${page + 1}&sort=${sort}&sortby=${sortby}&search=${search}&type=${type}&superiorID=${superiorID}`)
                    .then(res => {
                        dispatch(updateListSuccess(res.data));
                    })
                    .catch(err => {
                        dispatch(updateListFail(err.message));
                    })
            })
            .catch(err => {
                dispatch(updateListFail(err.message));
            });
    };
};
export const getSuperior = id => {
    return (dispatch, getState) => {
        dispatch(updateListStart());
        Axios.get(`http://localhost:9000/soldiers/getone/${id}`)
            .then(res => {
                dispatch(updateListSuccess({
                    soldiers: [res.data],
                    hasNext: false
                }))
            })
            .catch(err => {
                dispatch(updateListFail(err.message))
            })
    }
}
export const getSomeContent = (page, sort, sortby, search, type, superiorID) => {
    return (dispatch, getState) => {
        if(type !== "superior"){
            dispatch(updateListStart());
            Axios.get(`http://localhost:9000/soldiers/getsome?start=0&end=${page + 1}&sort=${sort}&sortby=${sortby}&search=${search}&type=${type}&superiorID=${superiorID}`)
                .then(res => {
                    dispatch(updateListSuccess(res.data))
                })
                .catch(err => {
                    dispatch(updateListFail(err.message));
                })
        }else{
            return
        }
    }
}
export const addSomeContent = (page, sort, sortby, search, type, superiorID) => {
    return (dispatch, getState) => {
        if(type !== "superior"){
            Axios.get(`http://localhost:9000/soldiers/getsome?start=${page}&end=${page + 1}&sort=${sort}&sortby=${sortby}&search=${search}&type=${type}&superiorID=${superiorID}&hasmore=true`)
                .then(res => {
                    dispatch(addToListSuccess(res.data));
                })
                .catch(err => {
                    dispatch(updateListFail(err.message));
                })
        }
    }
}