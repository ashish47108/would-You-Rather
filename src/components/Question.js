import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from "../utils/helpers";
import { Link } from 'react-router-dom';

const Question = (props) => {
    const { question } = props;

    if (question === null) {
        return <p>This question doesn't exist.</p>
    }

    const { name, id, avatar, optionOne, optionTwo, hasVoted } = question;

    if (props.questionsToShow === 'answered' && hasVoted !== true) {
        return false;
    } else if (props.questionsToShow === 'unanswered' && hasVoted === true) {
        return false;
    }

    let viewPollLink = '';

    if (props.questionsToShow === 'answered') {
        viewPollLink = `/question/${id}/results`;
    } else if (props.questionsToShow === 'unanswered') {
        viewPollLink = `/question/${id}`;
    }

    // return(
    //     <div >            
    //         <table className='App'>
    //             <tbody>
    //             <tr><strong>{name} asks would you rather...</strong></tr>
    //             <tr>
    //                 <td>
    //                     <img src={avatar} alt={`Avatar of ${name}`} className='avatar'/>
    //                 </td>
    //                 <td>
    //                     <table>
    //                         <tbody>
    //                         <tr>
    //                             <p className='center'>{optionOne.text} <strong>OR</strong> {optionTwo.text}</p>
    //                         </tr>
    //                         <tr>
    //                             <Link key={viewPollLink} to={viewPollLink} className='center'>
    //                                 <button
    //                                     className='btn btn-outline-primary reset-vertical-margin '>
    //                                     View Poll
    //                                 </button>
    //                             </Link>
    //                         </tr>
    //                         </tbody>
    //                     </table>          
    //                 </td>

    //             </tr>
    //             </tbody>
    //         </table>
    //     </div>
    // );

    return (
        

                <div className="card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-12">
                                <div className="card-title">
                                    {name} asks:
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">                            
                            <div className="col-4">                                
                                <img src={avatar} alt={`Avatar of ${name}`} className='avatar' />
                            </div>
                            <div className="col-1 box-border-left"></div>
                            <div className="col-7">
                                <div className="row">
                                    <h5 className="card-title">would you rather...</h5>
                                </div>
                                <div className="row">
                                    <div>{optionOne.text}</div>
                                </div>
                                <div className="row">
                                    <strong>
                                        Or
                                    </strong>
                                </div>
                                <div className="row">
                                    <div>{optionTwo.text}</div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                    </div>
                                </div>
                                <div className="row">
                                    <Link to={viewPollLink} >
                                        <button className="btn btn-primary">
                                            View Poll
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
        
    )

    // return (
    //     <div>
    //         <div>{name} asks would you rather...</div>
    //         <div>
    //             <img src={avatar} alt={`Avatar of ${name}`} className='avatar' />
    //         </div>
    //         <div >
    //             <p>{optionOne.text} <strong>OR</strong> {optionTwo.text}</p>
    //             <Link to={viewPollLink} >
    //                 <button>
    //                     View Poll
    //                 </button>
    //             </Link>
    //         </div>
    //     </div>
    // )
};


function mapStateToProps({ authedUser, users, questions }, { id, questionsToShow }) {
    const question = questions[id];

    return {
        authedUser: authedUser.loggedInUser.id,
        question: formatQuestion(question, users[question.author], authedUser.loggedInUser.id),
        questionsToShow
    }
}

export default connect(mapStateToProps)(Question);