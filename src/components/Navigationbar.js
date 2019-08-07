import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigationbar = (props) => {
    return (
        <div>       
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto nav-pills">
                        <li className="nav-item menuList-padding-top">
                            <NavLink to='/' exact activeClassName='navMenuActive' className='nav-link' >Home</NavLink>
                        </li>
                        <li className="nav-item menuList-padding-top">
                            <NavLink to='/add' exact activeClassName='navMenuActive' className='nav-link' >New Question</NavLink>
                        </li>

                        <li className="nav-item menuList-padding-top">
                            <NavLink to='/leaderboard' exact activeClassName='navMenuActive' className='nav-link' >Leaderboard</NavLink>
                        </li>
                        {props.loggedInUser !== 'undefined'  && (
                            
                            <li className='nav-item navitem nav-link'>
                                <img className='loginavatar' alt='user-avatar' src={props.loggedInUser.avatarURL} />
                            </li>    
                        )}  
                        
                        {props.loggedInUser !== 'undefined'  && (
                        <li className='nav-item navitem nav-link'>
                            <span>
                                Hello {props.loggedInUser.name}
                            </span>
                        </li>
                        )}  
                        {props.loggedInUser !== 'undefined'  && (
                        <li className='nav-item menuList-padding-top'>
                            <NavLink to='/logout' exact activeClassName='navMenuActive' className='nav-link' >Logout</NavLink>
                        </li>
                        )}  

                    </ul>
                </div>
            </nav>
        </div>

       

    )
};

export default Navigationbar;