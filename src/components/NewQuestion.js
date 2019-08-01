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

    handleFirstOption = (e) => {
        this.setState({
            optionOneText: e.target.value
        });
    };

    handleSecondOption = (e) => {
        this.setState({
            optionTwoText: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { optionOneText, optionTwoText } = this.state;
        const { dispatch } = this.props;
        console.log('===========Txt values =========');
        console.log(optionOneText);
        console.log(optionTwoText);
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
                                                className='form-control'
                                                placeholder='Enter option one text here...'
                                                value={optionOneText}
                                                onChange={this.handleFirstOption}
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
                                                className='form-control'
                                                placeholder='Enter option one text here...'
                                                value={optionOneText}
                                                onChange={this.handleFirstOption}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <input type='submit'
                                            name='submit'
                                            id='submit'
                                            value="Submit"
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

            /* <div className='App'>
                <div ><strong>Create New Question</strong></div>
                <div>
                    <p><strong>Would You Rather...?</strong></p>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <input
                                className='form-control'
                                placeholder='Enter option one text here...'
                                value={optionOneText}
                                onChange={this.handleFirstOption}
                            />
                        </div>
                        <div>
                            <input
                                className='form-control'
                                placeholder='Enter option two text here...'
                                value={optionTwoText}
                                onChange={this.handleSecondOption}
                            />
                        </div>
                        <div>
                            <input type='submit'
                                name='submit'
                                id='submit'
                                value="Submit"
                                className='btn'
                                disabled={optionOneText === '' || optionTwoText === ''}
                            />
                        </div>
                    </form>
                </div>
            </div> */
        );
    }

}

export default connect()(NewQuestion);