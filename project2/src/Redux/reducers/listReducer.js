const initState = {
    page: 0,
    listType: "list",
    searchContent: '',
    sort: {
        asc: 0,
        sortby: ''
    },
    superiorID: '',
    hasNext: false,
    curList: [],
    isFetching: false,
    error: null
};

const reducer = (state = initState, action) => {
    switch(action.type){
        case "ADD_DATA":
            return{
                ...state,
                curList: [...state.curList, ...action.data],
                hasNext: action.hasNext
            }
        case "SET_PAGE":
            return{
                ...state,
                page: action.page
            }
        case "SET_TYPE":
            return{
                ...state,
                listType: action.listType
            }
        case "SET_SEARCH_CONTENT":
            return{
                ...state,
                searchContent: action.searchContent
            }
        case "SET_SORT":
            return{
                ...state,
                sort: action.sort
            }
        case "SET_SUPERIOR":
            return{
                ...state,
                superiorID: action.superiorID
            }
        case "RESET":
            return{
                ...state,
                page: 0,
                listType: "list",
                searchContent: '',
                sort: {
                    asc: 0,
                    sortby: ''
                },
                hasNext: false,
                superiorID: ''
            }
        case "UPDATE_START":
            return{
                ...state,
                isFetching: true
            }
        case "UPDATE_SUCCESS":
            return{
                ...state,
                isFetching:false,
                curList: action.curList,
                hasNext: action.hasNext
            }
        case "UPDATE_FAIL":
            return{
                ...state,
                isFetching: false,
                error: action.error
            }
        default: 
            return state;
    }
}

export default reducer;