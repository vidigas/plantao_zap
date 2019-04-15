import { getUser, createUser } from './repositories/users.repository';
import { Vocabulary } from './vocabulary/index';
import { proceedWithRegistration } from './modules/registration';
import { proceedWithQuestion } from './modules/question';

export default class Bot {
	
	constructor(allChatsWithNewMessages){
		this.chats = allChatsWithNewMessages;
	}

	async init(window){
		return  this.chats.forEach( async (chat) => { return chat.isGroup ? await this.groupChat(chat, window) : await this.individualChat(chat, window)});
	}

	async individualChat(chat, window){
	
	try {
		
		var user =  await getUser(chat.id.user);

		if(user.data.notRegistered)  return await proceedWithRegistration(user, chat, window);

		//TODO: PROCEED WITH QUESTION  -> READ THE MSG AND PARSE TO SE IF ITS A QUESTION THEN SEND TO TEACHERS GROUP
		return await proceedWithQuestion(user, chat, window);

		// if(user.hasCredit)  return this.proceedWithQuestion();
		// else return this.proceedWithPayment();

	} catch(err) {
		console.log(err)
	}

		return

	
	}

	async groupChat(chat, window){
		//console.log('Nome do Grupo', chat.contact.formattedName);
	}



}