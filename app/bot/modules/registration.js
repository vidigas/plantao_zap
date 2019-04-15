export const proceedWithRegistration =  async (user, chat, window) => {
	
	console.log('é aqui memo samerda');

	//filter for testing 
	if(chat.id.user == '5511975102191'){
	
		try {
	
			// save user on db
			const user = await createUser(chat.id.user, 'student');	
			
			// send welcome msg
			window.WAPI.sendMessage2(chat.id._serialized, Vocabulary().intro);	
	
		} catch(err) {
	
			console.log(err)
	
		}
			
		}
}
