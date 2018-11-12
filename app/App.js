import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import './app.styl';

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			show: false,
			loggedIn: false,
			selecteds: [],
			contacts: [],
			msg: ''
		};
	}

	componentWillMount() {
		this.icons = JSON.parse(window.sessionStorage.getItem('tv-icons'));
		this.authVerify = setInterval(() => {
			this.setState({ loggedIn: window.WAPI.isLoggedIn() });
		}, 1000);
	}

	componentDidMount() {
		document.addEventListener("keyup", (e) => {
			console.log('dispatch event');
			if(e.keyCode === 27) this.setState({ show: false });
		}, false);
	}

	componentWillUpdate(nextProps, nextState) {
		if(!this.state.loggedIn && nextState.loggedIn) {
			this.setState({ contacts: window.WAPI.getMyContacts() })
			clearInterval(this.authVerify) 
		}
	}

	renderOpenButton() {
		return <button className='tv-open-button' onClick={() => this.setState({ show: true })}><img src={this.icons.chat} /></button>
	}

	handleContactClick(id) {
		let selecteds = [...this.state.selecteds];
		const index = this.state.selecteds.findIndex(({ user }) => id.user === user);

		if(index === -1) {
			selecteds.push(id);
		} else {
			selecteds.splice(index, 1)
		}

		this.setState({ selecteds });
	}

	renderContacts() {
		return this.state.contacts.map((contact) => {
			const { name, id } = contact;
			const active = this.state.selecteds.findIndex(({ user }) => id.user === user) != -1;
			return (
				<div className={`card ${active ? '-active' : ''}`} onClick={() => this.handleContactClick(id)}>
					{ name }
				</div>
			)
		});
	}

	handleSend() {
		const { selecteds, msg } = this.state;
		if(!selecteds.length, !msg) return;

		const promises = [];
		this.state.selecteds.forEach(id => {
			window.WAPI.sendMessage2(id, this.state.msg, () => console.log);
		});

		this.setState({ show: false });
	}

	handleSearch(e) {
		const regexp = new RegExp(e.target.value, 'i');
		const contacts = window.WAPI.getMyContacts().filter(contact => {
			return regexp.test(contact.name) || regexp.test(contact.id.user);
		});

		this.setState({ contacts });
	}

	render() {
		if(!this.state.show || !this.state.loggedIn) 
			return this.renderOpenButton();

		return (
			<div className='tv-app'>
				<div className='modal'>
					<div className='search-wrapper'>
						<div className='input-group'>
							<input placeholder='pequise por nome ou telefone' onChange={this.handleSearch.bind(this)} />
							<img src={this.icons.searchDark} />
						</div>
					</div>	
					<section className='contact-list'>
						{ this.renderContacts() }
					</section>
					<section id='message-wrapper' className='message-wrapper'>
						<textarea placeholder='write your message' onChange={(e) => this.setState({ msg: e.target.value })} />
						<div className='actions'>
							<div>
								<img className='icon' src={this.icons.clip} />
								<img className='icon' src={this.icons.image} />
							</div>
							<img className='icon' src={this.icons.send} onClick={() => this.handleSend()} />
						</div>
					</section>
				</div>
			</div>
		);
	}
};
