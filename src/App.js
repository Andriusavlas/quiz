import React from 'react';
import Landing from './components/Landing';
import Question from './components/Question';
import Results from './components/Results';
import axios from 'axios';
const API_URL="http://enigmatic-cliffs-25405.herokuapp.com/questions";

class App extends React.Component{
    state={
        quizPart:"registration",
        name:"",
        surname:"",
        questions:"",
        answers:[],
        activeQuestion:0,
        startTime:0,
        endTime:0
    };
    startQuiz=()=>this.setState({quizPart:"quiz",startTime:new Date()});
    endQuiz=()=>this.setState({quizPart:"results", endTime:new Date()});
    renderContent=()=>{
        switch(this.state.quizPart){
            case "registration": 
                return <Landing 
                    start={this.startQuiz} 
                    inputHandler={this.registrationInputHandler}
                />;
            case "quiz":
                return this.state.questions.map((question, i)=>{
                    return <Question
                        previous={this.previousQuestion}
                        endQuiz={this.endQuiz}
                        answered={this.state.answers}
                        addAnswer={this.addAnswer}
                        key={i}
                        next={this.nextQuestion}
                        active={this.state.activeQuestion}
                        number={i}
                        answers={question.answers} 
                        question={question}
                        alreadyAnswered={this.state.answers}
                    />
                });
            case "results":
                return <Results
                    elapsed={(this.state.endTime-this.state.startTime)/1000}
                    answers={this.state.answers}
                    name={this.state.name}
                    surname={this.state.surname}
                />
            default: console.log("Something went wrong");
        };
    };
    registrationInputHandler=(information, type)=>{
        switch(type){
            case "name": return this.setState({name:information});
            case "surname": return this.setState({surname:information});
            default: console.log("Something failed");
        };
    };
    componentDidMount(){
        axios.get(API_URL).then((data)=>{
            const information=data.data.questions;
            const questions=[];
            for(let topic in information){
                const question=(Math.floor(Math.random()*(3)));
                questions.push(information[topic][question])
            };
            this.setState({questions});
        });
    };
    nextQuestion=()=>{
        const nextActive=this.state.activeQuestion+1;
        this.setState({activeQuestion:nextActive});
    };
    previousQuestion=()=>{
        let previousActive;
        if(this.state.activeQuestion!==0){
            previousActive=this.state.activeQuestion-1;
            this.setState({activeQuestion:previousActive});
        };
    };
    addAnswer=(answer, i)=>{
        if(this.state.answers.length===this.state.activeQuestion){
            const newAnswers=[...this.state.answers, answer];
            this.setState({answers:newAnswers});
        }else{
            let prevAnswers=this.state.answers.filter((answer,i)=>i!==this.state.activeQuestion);
            const newAnswers=[...prevAnswers, answer];
            this.setState({answers:newAnswers});
        };
    };
    render(){
        return(
            <div className="app">
                {this.renderContent()}
            </div>
        );
    };
};

export default App;