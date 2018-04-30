import React from 'react';

const Question = (props)=>{
    const answers=props.answers.map((answer, i)=>{
        return (
            <label key={i}>
                <input
                    onClick={()=>{props.addAnswer({user_answer:i,correct_answer:props.question.correct})}} 
                    name="question" 
                    key={i} 
                    type="radio"
                />
                {answer}
            </label>
    )});
    const progress=props.answered.map((single, i)=><div key={i} className="bar"></div>);
    return(
        <div className={props.number===props.active? "question active" : "question"}>
            <h4>Klausimas {props.number+1}/5</h4>
            <div className="content">
                <h3>{props.question.question}</h3>
                <form>
                   {answers}
                </form>
                {props.active<props.alreadyAnswered.length? (props.active!==4? <div className="btn btn-next active" onClick={props.next}>Sekantis</div>: null): (props.active!==4?<div className="btn btn-next">Sekantis</div>:null)}
                {props.active===4 ? (props.active<props.alreadyAnswered.length?<div className="btn btn-next active" onClick={props.endQuiz}>Baigti Testą</div> : <div className="btn btn-next">Baigti Testą</div>) : null}
                <div className="btn btn-previous" onClick={props.previous}>Atgal</div>
                <div className="cleafix"></div>
            </div>
            <div className="progress-bar">
                {progress}
            </div>
        </div>
    );
};

export default Question;