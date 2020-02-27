class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    getChats(callback){
        this.unsub = this.chats
            .where('room', '==', this.room)
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                // console.log(snapshot.docChanges());
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added'){
                        // console.log(change.doc.id)
                        callback(change.doc.data(), change.doc.id);
                    }
                })
            })
    }

    addChat(message){
        const now = new Date();
        const chat = {
            username : this.username,
            room : this.room,
            message,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        this.chats.add(chat);
        console.log('Chat added');
    }

    deleteChat(id){
        this.chats.doc(id).delete();
        console.log('Chat deleted');
    }

    updateName(username){
        this.username = username;
        localStorage.setItem('username', this.username);
    }

    updateRoom(room){
        this.room = room;
        if(this.unsub){this.unsub()}
    }
}

