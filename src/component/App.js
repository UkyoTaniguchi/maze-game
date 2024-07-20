// src/App.js
import React from 'react';
import Maze from './Maze';

class App extends React.Component{
    render(){
        return(
            <div className="App">
                <div className = "">
                    <h1 className = "maintitle">MAZE &nbsp;&&nbsp; ESCAPE</h1>
                </div>
            <Maze />
    </div>
        );
    }
}

export default App;
