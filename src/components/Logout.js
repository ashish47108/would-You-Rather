import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {handleLogout} from '../actions/authedUser';

class Logout extends Component{
    componentDidMount(){
        this.props.dispatch(handleLogout());
    }
    render(){
        return(
            <Redirect to='/login'/>
        );
    }

}
export default connect()(Logout);