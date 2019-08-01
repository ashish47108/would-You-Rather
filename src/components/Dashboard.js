import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class Dashboard extends Component {
    state = {
        'questionsToShow': 'unanswered',
    };

    handleTabChange = (e, tab) => {
        this.setState(() => ({
            questionsToShow: tab
        }));
    };

    render() {
        const { questionsToShow } = this.state;
        return (
            <div className="contrainer">
                <div className="row">
                    <div className="col-3">
                    </div>
                    <div className="col ">
                        <div className="container dashboardBorder">
                        <div className="row justify-content-center">
                            <div className="col-5">
                                <button type='button'
                                        className={"btn btn-primary dashboard " + (questionsToShow === 'unanswered' ? 'clickedButton' : null)}
                                        onClick={(e) => this.handleTabChange(e, 'unanswered')}>Unanswered Questions
                                </button>
                                </div>
                                <div className="col-5">
                                <button type='button'
                                        className={"btn btn-primary dashboard  " + (questionsToShow === 'answered' ? 'clickedButton' : null)}
                                        onClick={(e) => this.handleTabChange(e, 'answered')}>Answered Questions
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {this.props.questionIds.map((id) => {
                                    return (
                                        <Question key={id} id={id}
                                            questionsToShow={questionsToShow} />
                                    )
                                })}
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-3">
                    </div>
                </div>
            </div>

            /*
                        <div className="App">
                            <div className='center'>
                                <button type='button'
                                    className={"btn dashboard " + (questionsToShow === 'unanswered' ? 'active' : null)}
                                    onClick={(e) => this.handleTabChange(e, 'unanswered')}>Unanswered
                                    Questions
                                </button>
                                <button type='button'
                                    className={"btn dashboard  " + (questionsToShow === 'answered' ? 'active' : null)}
                                    onClick={(e) => this.handleTabChange(e, 'answered')}>Answered
                                    Questions
                                </button>
                            </div>
                            <div>
                                {this.props.questionIds.map((id) => {
                                    return (
                                        <Question key={id} id={id}
                                            questionsToShow={questionsToShow} />
                                    )
                                })}
                            </div>
                        </div>*/
        );
    }
}

function mapStateToProps({ questions }) {
    console.log(questions);
    console.log('Dashboard method called');
    return {
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard);