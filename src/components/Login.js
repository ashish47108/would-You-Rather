import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleGetUsers} from '../actions/users';
import {handleLogin} from '../actions/authedUser';
import LoadingBar from "react-redux-loading";
import logo from '../logo.svg';
import '../App.css';
import {Redirect} from 'react-router-dom';


class Login extends Component {
    state = {
        selectedUser: ''
    };

    componentDidMount() {
        this.props.dispatch(handleGetUsers());
    }

    handleChange = (e) => {
        const selectedUser = e.target.value;

        this.setState(() => ({
            selectedUser
        }));
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const {dispatch} = this.props;

        dispatch(handleLogin(this.state.selectedUser));
    };

    render() {
        if (this.props.loading === true || !this.props.users) {
            return <div/>;
        }
        
        const {from} = this.props.location.state || {from: {pathname: '/'}};
        console.log("hhhhhhhh");
        console.log( this.props.location.state);
        console.log( from);
        console.log( this.props.isAuthenticated);
        
        if (this.props.isAuthenticated) {
            console.log("redirection happend-*************--------------------------------------");
            return <Redirect to={from}/>;
        }

        return (
            <div>
                <LoadingBar />
                <div className="App">                    
                    <h3 >Welcome to the Would You Rather App!</h3>
                    <p>Please Sign in to continue</p>
                    <img src={logo} className="App-logo" alt="logo" />
                    <h3>Sign in</h3>                    
                    <form id="Login" onSubmit={this.handleSubmit}>
                        <div >
                            <select className="select-control" id="userId"
                                    onChange={(e) => this.handleChange(e)}>
                                <option></option>
                                {
                                    Object.keys(this.props.users).map((user) => {
                                        return <option key={this.props.users[user].id}
                                                        value={this.props.users[user].id}>{this.props.users[user].name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <button type="submit" className="btn" disabled={this.state.selectedUser === ''}>Login</button>
                    </form>                
                </div>
            </div>
        );
    }
}

function mapStateToProps({users, authedUser}){
    console.log('----------------------------------');
    console.log(authedUser);
    return{
        loading: users === null,
        users,
        isAuthenticated: authedUser.authenticated
    }

}

export default connect(mapStateToProps)(Login);
