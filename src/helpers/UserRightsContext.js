import React from 'react';
import { getAddVerifyRight } from '../api/rights';

export const ManageRightContext = React.createContext({
    isConfirmed: false,
    isStaff: false,
    updateRights: () => {},
})

export const useRights = () => React.useContext(ManageRightContext);

export class RightsManager extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isConfirmed: false,
            isStaff: false,
        }

        this.updateRights = this.updateRights.bind(this)
    }

    async componentDidMount() {
        alert('Update')
        this.updateRights();
    }

    updateRights = async () => {
        const data = await getAddVerifyRight();
        this.setState({isConfirmed: data.confirmed, isStaff: data.is_staff})
    }

    render(){
        return(
        <ManageRightContext.Provider value={{
            isConfirmed: this.state.isConfirmed,
            isStaff: this.state.isStaff,
            updateRights: this.updateRights(),
        }}>
            {this.props.children}
        </ManageRightContext.Provider>
        )
    }
}