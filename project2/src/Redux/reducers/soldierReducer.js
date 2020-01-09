const initState = {
    avatar: '',
    name: '',
    sex: '',
    rank: '',
    startDate: '',
    phone: '',
    email: '',
    superiorID: '',
    superiorName: '',
    options:[],
    editIsFetching: false,
    editError: null,
    editFinished: false,
    createFinished: false,
    createError: null
}

const reducer = (state = initState, action) => {
    switch(action.type){
        case "EDIT_AVATAR":
            return{
                ...state,
                avatar: action.avatar
            }
        case "EDIT_NAME":
            return{
                ...state,
                name: action.name
            }
        case "EDIT_SEX":
            return{
                ...state,
                sex: action.sex
            }
        case "EDIT_RANK":
            return{
                ...state,
                rank: action.rank
            }
        case "EDIT_DATE":
            return{
                ...state,
                startDate: action.date
            }
        case "EDIT_PHONE":
            return{
                ...state,
                phone: action.phone
            }
        case "EDIT_EMAIL":
            return{
                ...state,
                email: action.email
            }
        case "EDIT_SUPERIORID":
            return{
                ...state,
                superiorID: action.superiorID
            }
        case "EDIT_SUPERIORNAME":
            return{
                ...state,
                superiorName: action.superiorName
            }
        case "EDIT_FETCH_START":
            return{
                ...state,
                editIsFetching: true,
                editError: null,
                editFinished: false
            }
        case "EDIT_FETCH_FAIL":
            return{
                ...state,
                editIsFetching: false,
                editFinished: action.finished,
                editError: action.error
            }
        case "EDIT_FETCH_SUCCESS":
            return{
                ...action.data,
                editFinished: action.finished,
                editIsFetching: false,
                editError: null
            }
        case "CREATE_FETCH_SUCCESS":
            return{
                ...state,
                createError: null,
                createFinished: true
            }
        case "CREATE_FETCH_FAIL":
            return{
                ...state,
                createError: action.error,
                createFinished: true
            }
        case "CREATE_FETCH_START":
            return{
                ...state,
                options: action.value,
                createError: null
            }
        case "CREATE_FETCH_PRE":
            return{
                ...state,
                createFinished: false
            }
        default:
            return state
    }
}

export default reducer;