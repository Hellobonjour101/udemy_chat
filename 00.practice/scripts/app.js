const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');

//localStorage check for a name
const username = localStorage.getItem('username')? localStorage.getItem('username') : 'anonymous';


//class instances
const chatroom = new Chatroom('general', username);
const chatUI = new ChatUI(chatList);

//getChats
chatroom.getChats((data, id)  => chatUI.render(data, id));
// chatroom.addChat('wow hello');

//addChats
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message);
    newChatForm.reset();
})

//deleteChats
chatList.addEventListener('click', e => {
    e.preventDefault();
    // console.log(e.target.tagName);

    if(e.target.tagName === 'BUTTON'){
        const id = e.target.parentElement.getAttribute('data-id');
        chatroom.deleteChat(id);
        e.target.parentElement.remove();
    }    
})

//update Username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    // console.log(newNameForm.name.value.trim());
    const username = newNameForm.name.value.trim();
    chatroom.updateName(username);
    newNameForm.reset();

    updateMssg.innerText = `Your username was updated to ${username}`;
    // setTimeout(() => {
    //     updateMssg.innerText = '';
    // }, 3000);
    
})


//update room
rooms.addEventListener('click', e => {
    // console.log(e.target.id);
    const room = e.target.id;
    chatUI.clear();
    chatroom.updateRoom(room);
    chatroom.getChats((data, id)  => chatUI.render(data, id));
})