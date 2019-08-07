import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleGetUsers } from '../actions/users';
import { handleLogin } from '../actions/authedUser';
import LoadingBar from "react-redux-loading";
import logo from '../logo.svg';
import '../App.css';
import { Redirect } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';


class Login extends Component {
    state = {
        selectedUser: ''
    };

    componentDidMount() {
        this.props.dispatch(handleGetUsers());
    }

    handleChange = (e,data) => {
        
        const selectedUser = data.value;

        this.setState(() => ({
            selectedUser
        }));
        
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { dispatch } = this.props;

        dispatch(handleLogin(this.state.selectedUser));        
    };

    render() {
        if (this.props.loading === true || !this.props.users) {
            return <div />;
        }

        return (
            <div>
                
                <LoadingBar />
                <div className="row">
                    <div className="col-4">
                    </div>
                    <div className="col-4">
                        <div className="card text-center">
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card-title">
                                            <h6> Welcome to the Would You Rather App!</h6>
                                            <p>Please Sign in to continue</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">

                                <div className="row">
                                    <div className="col">
                                        <img src={logo} className="app-logo" alt="logo" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <h5>Sign In</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <form id="Login" onSubmit={this.handleSubmit}>
                                            <div className="row" >
                                                <div className="col">
                                                <Dropdown
                                                    className='symentic-select'
                                                    placeholder='Select User'
                                                    fluid
                                                    selection
                                                    options={this.props.userArray}
                                                    onChange={this.handleChange} 
                                                />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <button type="submit" className='btn btn-primary btn-block' disabled={this.state.selectedUser === ''}>Login</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                    </div>
                </div>

            </div>
        );
    }
}


function mapStateToProps({ users, authedUser }) {
    

    const userArray = Object.keys(users).map((user) => {
        const userInfo = {
            key: users[user].id,
            text: users[user].name,
            value: users[user].id,
            image: { avatar: true, src: users[user].avatarURL },
        }

        return userInfo;
    })

    return {
        loading: users === null,
        users,
        isAuthenticated: authedUser.authenticated,
        userArray
    }

}

export default connect(mapStateToProps)(Login);
