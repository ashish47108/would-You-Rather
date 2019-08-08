import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { Menu } from 'semantic-ui-react'

class Dashboard extends Component {
    state = {
        'questionsToShow': 'unanswered',
    };

    handleMenuChange = (e, { name }) => {
        
        if (name === 'Unanswered Questions') {
            this.setState(() => ({
                questionsToShow: 'unanswered'
            }));
        }
        else
        {
            this.setState(() => ({
                questionsToShow: 'answered'
            }));

        }     

    };

    render() {
        const color = 'blue';        
        const { questionsToShow } = this.state;
        return (
            <div className="contrainer">
                <div className="row">
                    <div className="col-3">

                    </div>
                    <div className="col">
                        <Menu className="menuZeromargin" color={color} widths={2}>
                            <Menu.Item
                                name='Unanswered Questions'
                                active={questionsToShow === 'unanswered'}
                                onClick={this.handleMenuChange}
                            />
                            <Menu.Item
                                name='Answered Questions'
                                active={questionsToShow === 'answered'}
                                onClick={this.handleMenuChange}
                            />
                        </Menu>                       
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