import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Game } from './modules/game/containers';
import { Editor } from './modules/editor/containers';
import { Home } from './modules/home/containers';

import './modules/base/css/app.scss';

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Route exact path="/" component={Home} />
                <Route exact path="/game" render={() => <Game
                />} />
                <Route exact path="/editor" render={() => <Editor
                />} />
            </BrowserRouter>
        </div>
    );
};

export default App;
