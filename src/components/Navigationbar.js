import React from 'react';
import { Link, NavLink } from 'react-router-dom';

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

        /*<li className="nav-item menuList-padding-top">                            
                            <Link to="/logout" className='nav-link'>
                                <button className="btn-sm btn-info">Logout</button>
                            </Link>
                        </li>*/
        /*     <div className='App'> 
            <ul>
                <NavLink to='/' exact activeClassName='active' className='navitem' >Home</NavLink>
                <NavLink to='/add' exact activeClassName='active' className='navitem' >New Question</NavLink>
                <NavLink to='/leaderboard' exact activeClassName='active' className='navitem' >Leaderboard</NavLink>
                
                    <img className='loginavatar navitem' alt="user-avatar" src= {loggedInUser.loggedInUser.avatarURL} />  
                <span className='navitem'>
                    Hello {loggedInUser.loggedInUser.name}
                </span>
                <Link to="/logout" className='navitem'>
                    <button className="btn-sm btn-info">Logout</button>
                </Link>
            </ul>            
            </div>*/
        /*
        <ul class="nav justify-content-center">
            <li class="nav-item">
                Active
                </li>
                <li class="nav-item">
                Menu 1
                </li>
                <li class="nav-item">
                Menu 2
                </li>
                <li class="nav-item">
                Menu 3
                </li>
            </ul>*/
        /*<nav className="navbar navbar-expand-lg navbar-light bg-light"> 
        <div className='container' >                   
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Features</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Pricing</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled" href="#" aria-disabled="true">Disabled</a>
                    </li>
                </ul>      
            </div>
            </div>
        </nav>*/



    )
};

export default Navigationbar;