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
        //console.log(e);
        console.log(data.value);
        //const selectedUser = e.target.value;
        const selectedUser = data.value;

        this.setState(() => ({
            selectedUser
        }));
        console.log('selected user in state ' + selectedUser);
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { dispatch } = this.props;

        dispatch(handleLogin(this.state.selectedUser));
        console.log('selected user in submit ' + this.state.selectedUser);
    };

    render() {
        if (this.props.loading === true || !this.props.users) {
            return <div />;
        }

        const { from } = this.props.location.state || { from: { pathname: '/' } };
        console.log("hhhhhhhh");
        console.log(this.props.location.state);
        console.log(from);
        console.log(this.props.isAuthenticated);

        if (this.props.isAuthenticated) {
            console.log("redirection happend-*************--------------------------------------");
            return <Redirect to={from} />;
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
                                        <img src={logo} className="App-logo" alt="logo" />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        Sign In
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <Dropdown
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
                                        <form id="Login" onSubmit={this.handleSubmit}>
                                            <div className="row" >
                                                <div className="col">
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

/*
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
                </div>*/

function mapStateToProps({ users, authedUser }) {
    console.log('----------------------------------');
    console.log(authedUser);

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
