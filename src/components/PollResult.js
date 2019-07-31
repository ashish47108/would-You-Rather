import React from 'react';
import {connect} from 'react-redux';

const PollResult = (props) => {
    const {question, author, pageNotFound} = props;

    if (pageNotFound === true) {
        return (
            <div>
                <img className="page-not-found-image" src="/404.jpg" alt="" />
            </div>
        );
    }

    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
    const optionSelected = question.optionOne.votes.includes(author.id) ? "optionOne" : "optionTwo";

    let optionOneWidth = Math.round((question.optionOne.votes.length / totalVotes) * 100);
    let optionTwoWidth = Math.round((question.optionTwo.votes.length / totalVotes) * 100);
    return(
        <div className='App'>
            <div>Added by {author.name}</div>            
            <img src={author.avatarURL} 
                alt={`Avatar of ${author.name}`}
                className='avatar'/>            
            <div>Results:
                <div>Would you rather {question.optionOne.text}? </div>                   
                <div>
                    <span>{question.optionOne.votes.length} out of {totalVotes} votes. ({optionTwoWidth}%)</span>
                </div>
                <div>Would you rather {question.optionTwo.text}?</div>
                <div>
                    <span>{question.optionTwo.votes.length} out of {totalVotes} votes. ({optionTwoWidth}%)</span>
                </div>  
            </div>                                     
        </div>
    )
    
};

function mapStateToProps({ questions, users}, props) {
    const {id} = props.match.params;

    let pageNotFound = true;
    let author = "";
    let specificQuestion = "";

    if (questions[id] !== undefined) {
        pageNotFound = false;
        specificQuestion = questions[id];
        author = users[specificQuestion['author']];
    }

    return {
        id,
        question: specificQuestion,
        author: author,
        pageNotFound: pageNotFound
    }
}

export default connect(mapStateToProps)(PollResult);