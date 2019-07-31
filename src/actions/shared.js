import { showLoading, hideLoading } from 'react-redux-loading';
import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { addQuestion, addVotes } from './questions';
import { addUserQuestion, addUserQuestionAnswer } from './users';

export function handleAddQuestion(optionOneText, optionTwoText, cb){
    

    return(dispatch, getState) => {
        dispatch(showLoading());
        const {authedUser} = getState();
        const author =authedUser.loggedInUser.id;
        
        saveQuestion({optionOneText,optionTwoText,author})
        .then((question) =>{
            dispatch(addQuestion(question));
            dispatch(addUserQuestion(question));
            dispatch(hideLoading());
        })
        .then(cb);
    }
}

export function handleAddQuestionAnswer(qId, selectedOption){
    return(dispatch, getState) => {
        dispatch(showLoading());
        let {authedUser} = getState();
        authedUser =authedUser.loggedInUser.id;
        
        saveQuestionAnswer({
            authedUser,
            qid: qId,
            answer: selectedOption 
            })
        .then(() =>{
            dispatch(addVotes(authedUser, qId, selectedOption));
            dispatch(addUserQuestionAnswer(authedUser, qId, selectedOption));
            dispatch(hideLoading());
        });
    }

}