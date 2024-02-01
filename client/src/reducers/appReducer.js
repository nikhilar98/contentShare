const appReducer =(state,action) => {
    switch(action.type){
        case "LOGIN_USER":{
            return {...state,isLoggedin:true}
        }
        case "LOGOUT_USER":{
            return {...state,isLoggedin:false,userContents:[]}
        }
        case "SET_USER_CONTENTS" : { 
            return {...state,userContents:action.payload}
        }
        case "ADD_USER_CONTENT":{
            return {...state,userContents:[...state.userContents,action.payload]}
        }
        default : {
            return {...state}
        }
    }
}

export default appReducer