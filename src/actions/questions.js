import { showLoading, hideLoading } from 'react-redux-loading';
import {getQuestions} from '../utils/api';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_VOTES = 'ADD_VOTES';

export function receiveQuestions(questions){
    return {
        type:RECEIVE_QUESTIONS,
        questions,
    }
}

export function addQuestion(question){
    return {
        type: ADD_QUESTION,
        question,
    }
}

export function addVotes(authedUser, qId, selectedOption ){
    return {
        type:ADD_VOTES,
        authedUser,
        qId,
        selectedOption,
    }
}


export function handleGetQuestions(){
    return (dispatch) => {
        dispatch(showLoading());
        return getQuestions().then((questions)=>{
            dispatch(receiveQuestions(questions));
            dispatch(hideLoading());
        });
    };
}