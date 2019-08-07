import React from 'react';
import connect from "react-redux/es/connect/connect";

const Leaderboard = (props) => {
    const { usersInfo } = props;
    return (
        <div className="row">
            <div className="col-4">
            </div>
            <div className="col-4">
                {usersInfo.map((user, index) => {
                    return (
                        <div key={index} className="card">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-4">
                                        <img src={user.avatar} alt={`Avatar of ${user.name}`} className='avatar' />
                                    </div>
                                    <div className="col-1 box-border-left"></div>
                                    <div className="col-7">
                                        <div className="row leaderBoard-Border">
                                            <h5>{user.name}</h5>
                                        </div>
                                        <div className="row box-border-bottom leaderBoard-Border">
                                        </div>
                                        <div className="row leaderBoard-Border">
                                            <p><span>Answered Questions: </span>
                                                <span>{user.questionsAnswered}</span>
                                            </p>
                                        </div>

                                        <div className="row leaderBoard-Border">
                                            <p><span>Created Questions: </span>
                                                <span>{user.questionsAsked}</span>
                                            </p>
                                        </div>
                                        <div className="row box-border-bottom leaderBoard-Border">
                                        </div>
                                        <div className="row">
                                            <p><span><strong>Score: </strong></span>
                                            <span>{user.totalScore}</span>
                                            </p>
                                        </div>                                   
                                    </div>
                                    
                                    
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="col-4">
            </div>
        </div>
      
    )
};

function mapStateToProps({ users }) {
    
    let usersInfo = Object.keys(users).map((key, index) => {
        let questionsAnswered = Object.keys(users[key].answers).length;
        let questionsAsked = Object.keys(users[key].questions).length;

        return {
            'name': users[key].name,
            'avatar': users[key].avatarURL,
            'questionsAnswered': questionsAnswered,
            'questionsAsked': questionsAsked,
            'totalScore': questionsAnswered + questionsAsked
        }
    });

    usersInfo.sort((a, b) => {
        if (b.totalScore < a.totalScore) return -1;
        if (b.totalScore > a.totalScore) return 1;
        return 0;
    });
    
    return {
        usersInfo
    }
}
export default connect(mapStateToProps)(Leaderboard);