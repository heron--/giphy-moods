import React, { Component } from 'react';
import giphyLogo from './giphy-logo.svg';
import Button from './Button';

import API from './utils/API';

const emotions = [
    'tired',
    'sad',
    'excited',
    'cranky',
    'confused',
    'angry',
    'contemplative',
    'perplexed',
    'mortified',
    'elated',
    'suffering',
    'surprised',
    'irate',
    'disdain',
    'despair',
    'disgust',
    'comfortable',
    'uncomfortable',
    'guilt',
    'content',
    'cozy',
    'pensive',
    'hungry',
    'shame',
    'fear',
    'sublime',
    'repugnant',
    'confused',
    'love',
    'worried',
    'vexed',
    'astonished',
    'miffed',
    'aggravated',
    'frustrated',
    'obnoxious',
    'horrified',
    'overwhelmed'
];

const initialState = {
    isButtonHeldDown: false,
    emotionsReceived: false,
    generatedEmotion: '',
    gifs: [],
}

class App extends Component {
    state = initialState;

    getDirectionText() {
        if (this.state.generatedEmotion !== '') {
            return `YOUR MOOD IS ${this.state.generatedEmotion} `; 
        }
        if (this.state.isButtonHeldDown) {
            return 'KEEP HOLDING';
        }

        return 'PRESS & HOLD TO FIND YOUR MOOD';
    }

    setButtonState = (isButtonHeldDown) => {
        this.setState({
            isButtonHeldDown
        });
    }

    generateEmotion = () => {
        const generatedEmotion = emotions[Math.floor((Math.random() * emotions.length))];

        API
            .getGifs(generatedEmotion)
            .then(res => {
                this.setState({
                    gifs: res.data.data,
                    emotionsReceived: true,
                    generatedEmotion,
                });
            });
    }

    reset = e => {
        e.preventDefault();
        this.setState({
            ...initialState
        });
    };

    render() {
        return (
            <div className="App">
                <header className="App__header">
                    <h1 className="App__title">
                        <img src={giphyLogo} alt="GIPHY" />
                        MOODS
                    </h1>
                </header>
                {
                    !this.state.emotionsReceived && <div className="App__button-container">
                        <Button
                            setButtonState={this.setButtonState}
                            generateEmotion={this.generateEmotion}
                        />
                    </div>
                }
                <p className="App__direction">
                    {
                        this.getDirectionText()
                    }
                </p>
                {
                    this.state.emotionsReceived && <a onClick={this.reset}>RESET</a>
                }
                {
                    this.state.gifs.map(gif => <img src={gif.images.fixed_width.url} alt="" />)
                }
            </div>
        );
    }
}

export default App;
