import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as AuthActionCreater from '../store/action-creater/auth'


export const useActionsAuth = () => {
    const dispatch = useDispatch()
    return bindActionCreators(AuthActionCreater, dispatch)
}