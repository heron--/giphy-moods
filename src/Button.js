import React, { Component } from 'react';

const HOLD_LENGTH = 3000;

class Button extends Component {
	state = {
		timeoutId: null,
	};

	handleMouseDown = () => {
		const {
			generateEmotion,
			setButtonState,
		} = this.props;

		const timeoutId = setTimeout(() => {
			generateEmotion();	
		}, HOLD_LENGTH)

		this.setState({
			timeoutId
		});

		setButtonState(true);
	};

	handleMouseUp = () => {
		const {
			setButtonState,
		} = this.props;

		clearTimeout(this.state.timeoutId);
		setButtonState(false);
	};

	render() {


		return (
			<div className="Button"
				onMouseDown={this.handleMouseDown}
				onMouseUp={this.handleMouseUp}
			>
				¡That was easy!
			</div>	
		);
	}
}

export default Button;