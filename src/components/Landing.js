import React from 'react';

const Landing = (props)=>{
    return(
        <div className="landing">
            <h1>&lt;Programavimo Testas/&gt;</h1>
            <input type="text" placeholder="vardas" onChange={(e)=>{props.inputHandler(e.target.value,"name")}}/>
            <input type="text" placeholder="pavardė" onChange={(e)=>{props.inputHandler(e.target.value, "surname")}}/>
            <div className="btn" onClick={props.start}>Pradėti</div>
        </div>
    );
};

export default Landing;