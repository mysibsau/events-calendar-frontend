import React from 'react';
import { getAddVerifyRight } from '../api/rights';

export const ManageRightContext = React.createContext({
    isConfirmed: false,
    isStaff: false,
})

export const useRights = () => React.useContext(ManageRightContext);

export class RightsManager extends React.Component {

    state = {
        isConfirmed: false,
        isStaff: false,
    }

    async componentDidMount() {
        const data = await getAddVerifyRight();
        console.log(data)
        this.setState({isConfirmed: data.confirmed, isStaff: data.is_staff})
    }


    render(){
        return(
        <ManageRightContext.Provider value={{
            isConfirmed: this.state.isConfirmed,
            isStaff: this.state.isStaff,
        }}>
            {this.props.children}
        </ManageRightContext.Provider>
        )
    }
}