import { LOGIN, CLEAR } from "../types";
import { Account } from "../../types/account";

const setLoginReducer = (payload) => ({
    type: LOGIN,
    payload
})

const setClearReducer = () => ({
    type: CLEAR
})

const login = ({ username, password }: Account) => {
    return (dispatch) => {
        // do login
        setTimeout(() => {
            dispatch(setLoginReducer({ token: Math.random().toString(), user: { username } }))
        }, 500)
    }
}

const clear = () => {
    return (dispatch) => {
        dispatch(setClearReducer())
    }
}

export default {
    login,
    clear
}