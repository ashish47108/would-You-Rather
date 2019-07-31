import {RECEIVE_QUESTIONS, ADD_QUESTION, ADD_VOTES } from '../actions/questions'

export default function questions(state = {}, action){
    switch(action.type){        
        case RECEIVE_QUESTIONS:
            return{
                ...state,
                ...action.questions
            };
        case ADD_QUESTION:
            return{
                ...state,
                [action.question.id]:action.question
            };
            
        case ADD_VOTES:
            return{
                ...state,
                [action.qId]:{
                    ...state[action.qId],
                    [action.selectedOption]: {
                        ...state[action.qId][action.selectedOption],
                        votes: state[action.qId][action.selectedOption].votes.concat([action.authedUser])                        
                    }
                }
            };         
        default:
            return state;
    }
}