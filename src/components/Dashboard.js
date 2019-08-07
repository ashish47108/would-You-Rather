import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { Tab } from 'semantic-ui-react'

class Dashboard extends Component {
    state = {
        'questionsToShow': 'unanswered',
    };

    

    handleTabChangeNew = (e, data) => {
        
        if(data.activeIndex ===0)
        {
            this.setState(() => ({
                questionsToShow: 'unanswered'
            }));
        }
        else{
            this.setState(() => ({
                questionsToShow: 'answered'
            }));
        }

    };

    panes = [
        { menuItem: 'Unanswered Questions' },
        { menuItem: 'Answered Questions' },
    ]


    render() {
        const color ='blue';
        const { questionsToShow } = this.state;
        return (
            <div className="contrainer">
                <div className="row">
                    <div className="col-3">
                        
                    </div>
                    <div className="col">
                        <Tab menu={{
                                color,
                                attached: true, 
                                style: {                                    
                                    justifyContent: "center"
                                }
                            }} panes={this.panes} onTabChange={this.handleTabChangeNew} />
                        <div className="container dashboardBorder">
                            
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
        );
    }
}

function mapStateToProps({ questions }) {


    return {
        questionIds: Object.keys(questions)
            .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
    }
}

export default connect(mapStateToProps)(Dashboard);