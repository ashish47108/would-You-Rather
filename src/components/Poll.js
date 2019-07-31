import React, {Component} from 'react';
import {connect} from 'react-redux';
import {handleAddQuestionAnswer} from '../actions/shared';
import {Redirect} from "react-router-dom";

class Poll extends Component {
    state = {
        optionSelected: '',
        answerSubmitted: false
    };

    handleInputChange = (e) => {
        const text = e.target.value;

        this.setState(() => ({
            optionSelected: text
        }));
    };

    handleSubmit(e, questionId) {
        e.preventDefault();

        const {dispatch} = this.props;
        const {optionSelected} = this.state;

        dispatch(handleAddQuestionAnswer(questionId, optionSelected));

        this.setState(() => ({
            optionSelected: '',
            answerSubmitted: true
        }));
    }

    render()
    {
        const {optionSelected, answerSubmitted} = this.state;
        const {id, question, author, pageNotFound} = this.props;
        const redirectTo = `/question/${id}/results`;

        if (pageNotFound === true) {
            return (
                <div>
                    <h1>Error: 404</h1>    
                    <h1> Page Not Found</h1>
                </div>
            );
        }

        if (answerSubmitted === true) {
            return <Redirect to={redirectTo}/>;
        }

        return(
            <div className='App'>
                <div>{author.name} asks would you rather...</div>
                <div>
                    <img src={author.avatarURL}
                            alt={`Avatar of ${author.name}`}
                            className='avatar'/>
                </div>
                <div>
                    <form onSubmit={(e) => this.handleSubmit(e, id)}>
                        <div>
                            <input 
                                    type="radio"
                                    name="questionPoll"
                                    id="optionOne"
                                    value="optionOne"
                                    onChange={this.handleInputChange}
                            />
                            <label                                
                                htmlFor="optionOne">
                                {question.optionOne.text}
                            </label>
                        </div>
                        <div >
                            <input 
                                    type="radio"
                                    name="questionPoll"
                                    id="optionTwo"
                                    value="optionTwo"
                                    onChange={this.handleInputChange}
                            />
                            <label                                
                                htmlFor="exampleRadios2">
                                {question.optionTwo.text}
                            </label>
                        </div>
                        <button
                            className='btn'
                            type='submit'
                            disabled={optionSelected === ''}
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps({authedUser, questions, users, match}, props) {
    console.log('match paramters ');
    console.log(match);
    console.log(props);
    console.log('======End========');
    
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
        authedUser: authedUser.loggedInUser.id,
        pageNotFound: pageNotFound
    }
}

export default connect(mapStateToProps)(Poll);