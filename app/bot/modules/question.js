export const proceedWithQuestion =  async (user, chat, window) => {

//TODO open msg
	const messages = window.WAPI.getUnreadMessagesInChat(chat.id._serialized, true, true)
	console.log(messages)
	 
}