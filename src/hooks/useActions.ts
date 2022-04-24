import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as AuthActionCreator from '../store/action-creater/auth'


export const useActionsAuth = () => {
    const dispatch = useDispatch()
    return bindActionCreators(AuthActionCreator, dispatch)
}