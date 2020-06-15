import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Home from './View/Home';

class App extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div className="App">
                <Home />
            </div>
        );
    }
}

export default hot(module)(App);
