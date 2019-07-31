import React from 'react';
import { Link, NavLink } from 'react-router-dom'; 

const Navigationbar = (loggedInUser) => {
    return (
        <div className='App'> 
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
        </div>
    )
};

export default Navigationbar;