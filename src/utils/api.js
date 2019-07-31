import { _getQuestions, _saveQuestion, _saveQuestionAnswer, _getUser, _getUsers  } from './_DATA.js'

export function getQuestions(){
    return _getQuestions();
}

export function saveQuestion(info){
    return _saveQuestion(info);
}

export function saveQuestionAnswer(info){
    return _saveQuestionAnswer(info);
}

export function getUser(id){
    return _getUser(id);    
}

export function getUsers(){
    return _getUsers();
}