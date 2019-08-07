import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/shared';
import { Redirect } from 'react-router-dom';

class NewQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
        toDashboard: false
    };

    handleTxtChange = (e) => {
        if(e.target.id==='txtFirst'){
            this.setState({
                optionOneText: e.target.value
            });
        }
        else{
            this.setState({
                optionTwoText: e.target.value
            });
        }
    }
 
   
    handleSubmit = (e) => {
        e.preventDefault();

        const { optionOneText, optionTwoText } = this.state;
        const { dispatch } = this.props;
        
        
        
        dispatch(handleAddQuestion(optionOneText, optionTwoText, () => {
            this.setState({
                optionOneText: '',
                optionTwoText: '',
                toDashboard: true
            });
        }));
    };

    render() {
        const { optionOneText, optionTwoText, toDashboard } = this.state
        if (toDashboard === true) {
            return <Redirect to='/' />;
        }
        return (
            <div className="row">
                <div className="col-4">
                </div>
                <div className="col-4">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card-title">
                                        Create New Question
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col-12">
                                        <h5 className="card-title">would you rather...</h5>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <input
                                                type='text'
                                                id='txtFirst'
                                                className='form-control'
                                                placeholder='Enter option one text here...'
                                                value={optionOneText}
                                                onChange={this.handleTxtChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-5">
                                        <hr />
                                    </div>
                                    <div className="col-2">
                                        OR
                                    </div>
                                    <div className="col-5">
                                        <hr />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <input
                                                type='text'
                                                id='txtSecond'
                                                className='form-control'
                                                placeholder='Enter option one text here...'
                                                value={optionTwoText}
                                                onChange={this.handleTxtChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <input type='submit'
                                            name='submit'
                                            id='submit'
                                            value='Submit'
                                            className='btn btn-primary btn-block'
                                            disabled={optionOneText === '' || optionTwoText === ''}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                </div>
            </div>           
        );
    }

}

export default connect()(NewQuestion);