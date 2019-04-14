import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import './app.styl';

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			loggedIn: false,
			allChats:[],
			newMessages: [],
			msg: ''
		};
	}

	componentWillMount() {
		this.icons = JSON.parse(window.sessionStorage.getItem('tv-icons'));

		//check login
		this.authVerify = setInterval(() => {
			this.setState({ loggedIn: window.WAPI.isLoggedIn() });
		}, 1000);

		//getAllchats

		this.allChats = setInterval(() => {
			this.setState({ allChats: 	window.WAPI.getAllChatsWithNewMsg() })
		}, 1000)

	}

	componentDidMount() {		

		document.addEventListener("keyup", (e) => {
			if(e.keyCode === 27) this.setState({ show: false });
		}, false);


	}

	componentWillUpdate(nextProps, nextState) {
		if(!this.state.loggedIn && nextState.loggedIn) {
			clearInterval(this.authVerify) 

		}

		if(nextState.allChats.length){
			console.log('allChats with new Messages', nextState.allChats)
			clearInterval(this.allChats)
		
		}
	}

	renderOpenButton() {
		return <button className='tv-open-button' onClick={() => this.setState({ show: true })}><img src={this.icons.chat} /></button>
	}

	render() {

		const { show, loggedIn } = this.state;
		if(!show || !loggedIn) 
			return this.renderOpenButton();

		return (
			<div className='tv-app'>
				<div className='modal'>
					Hello world 
				</div>
			</div>
		);
	}
};
