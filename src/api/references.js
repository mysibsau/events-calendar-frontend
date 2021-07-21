import axios from 'axios';
import React from 'react';

export const ManageReferenceContext = React.createContext({
    directions: [],
    formats: [],
    levels: [],
    organizations: [],
    roles: [],
    isReferenceLoaded: false,
});

export const useReferences = () => React.useContext(ManageReferenceContext);

export class ReferenceManager extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            directions: [],
            formats: [],
            levels: [],
            organizations: [],
            roles: [],
            isReferenceLoaded: false,
        }
    }

    async componentDidMount() {
        const directions = await axios.get('/reference/directions/')
        const formats = await axios.get('/reference/formats/')
        const levels = await axios.get('/reference/levels/')
        const organizations = await axios.get('/reference/organizations/')
        const roles = await axios.get('/reference/roles/')
        this.setState({
            directions: directions.data,
            formats: formats.data,
            levels: levels.data,
            organizations: organizations.data,
            roles: roles.data,
        })
        this.setState({isReferenceLoaded: true})
    }

    render(){
        return(
            <ManageReferenceContext.Provider
            value={{
                directions: this.state.directions,
                formats: this.state.formats,
                levels: this.state.levels,
                organizations: this.state.organizations,
                roles: this.state.roles,
                isReferenceLoaded: this.state.isReferenceLoaded
            }}>
                {this.props.children}
            </ManageReferenceContext.Provider>
        )
    }
}