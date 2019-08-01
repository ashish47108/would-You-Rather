import React from 'react';
import { connect } from 'react-redux';

const PollResult = (props) => {
    const { question, author, pageNotFound } = props;

    if (pageNotFound === true) {
        return (
            <div>
                <img className="page-not-found-image" src="/404.jpg" alt="" />
            </div>
        );
    }

    const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;
    const optionSelected = question.optionOne.votes.includes(author.id) ? "optionOne" : "optionTwo";

    let optionOneWidth = Math.round((question.optionOne.votes.length / totalVotes) * 100);
    let optionTwoWidth = Math.round((question.optionTwo.votes.length / totalVotes) * 100);


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
                                    Asked by {author.name}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-4">
                                <img src={author.avatarURL}
                                    alt={`Avatar of ${author.name}`}
                                    className='avatar' />
                            </div>
                            <div className="col-1 box-border-left"></div>
                            <div className="col-7">
                                <div className='row'>
                                    <h5 className='card-title'>Results</h5>
                                </div>
                                <div className='row'>
                                    <div className="card">                                    
                                        {optionSelected === 'optionOne' ? <span class="badge badge-secondary">Your Vote</span> : null  }
                                        <div className={optionSelected === 'optionOne' ? "card-body CardBackground" : "card-body"  }>                                            
                                            <div>Would you rather {question.optionOne.text}? </div>
                                            <div className="progress">
                                                <div className="progress-bar" style={{ width: optionOneWidth + '%' }} role="progressbar" aria-valuenow={optionOneWidth} aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                            <span>{question.optionOne.votes.length} out of {totalVotes} votes. ({optionOneWidth}%)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="card">
                                    {optionSelected === 'optionTwo' ? <span class="badge badge-secondary">Your Vote</span> : null  }
                                        <div className={optionSelected === 'optionTwo' ? "card-body CardBackground" : "card-body"  }> 
                                                                             
                                            <div>Would you rather {question.optionTwo.text}? </div>
                                            <div className="progress">
                                                <div className="progress-bar" style={{ width: optionTwoWidth + '%' }} role="progressbar" aria-valuenow={optionOneWidth} aria-valuemin="0" aria-valuemax="100"></div>
                                            </div>
                                                <span>{question.optionTwo.votes.length} out of {totalVotes} votes. ({optionTwoWidth}%)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-4">
            </div>
        </div>
        /*
                <div className='App'>
                    <div>Added by {author.name}</div>
                    <img src={author.avatarURL}
                        alt={`Avatar of ${author.name}`}
                        className='avatar' />
                    <div>Results:
                        <div>Would you rather {question.optionOne.text}? </div>
                        <div>
                            <span>{question.optionOne.votes.length} out of {totalVotes} votes. ({optionTwoWidth}%)</span>
                        </div>
                        <div>Would you rather {question.optionTwo.text}?</div>
                        <div>
                            <span>{question.optionTwo.votes.length} out of {totalVotes} votes. ({optionTwoWidth}%)</span>
                        </div>
                    </div>
                </div>*/
    )

};

function mapStateToProps({ questions, users }, props) {
    const { id } = props.match.params;

    let pageNotFound = true;
    let author = "";
    let specificQuestion = "";

    if (questions[id] !== undefined) {
        pageNotFound = false;
        specificQuestion = questions[id];
        author = users[specificQuestion['author']];
    }

    return {
        id,
        question: specificQuestion,
        author: author,
        pageNotFound: pageNotFound
    }
}

export default connect(mapStateToProps)(PollResult);