import React from 'react';

const Results = (props)=>{
    let score=0;
    props.answers.forEach((answer)=>{
        if(answer.user_answer===answer.correct_answer) score+=1;
    });
    return(
        <div className="results">
            <h3>Rezultatai</h3>
            <div className="line"></div>
            <h4>{props.name} {props.surname}</h4>
            <h5>Laikas: {props.elapsed}s</h5>
            <div className="result-bar">{(score/5)*100}%</div>
        </div>
    );
};

export default Results;