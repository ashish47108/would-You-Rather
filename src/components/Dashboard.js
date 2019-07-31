import React, {Component} from 'react';
import {connect} from 'react-redux';
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

    render(){
        const {questionsToShow } = this.state;
        return(
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
                                                  questionsToShow={questionsToShow}/>
                            )
                        })}
                </div>
            </div>
        );
    }
}

function mapStateToProps({questions}) {
    console.log(questions);
    console.log('Dashboard method called');
    return {
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard);