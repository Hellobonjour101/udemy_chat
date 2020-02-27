class ChatUI{
    constructor(list){
        this.list = list
    }
    clear(){
        this.list.innerHTML = '';
    }
    render(data, id){
        // console.log(data);
        const time = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            {addSuffix: true}
        )
        const html = `
        <li class="list-group-item" data-id="${id}">
            <span class="username">${data.username}</span>
            <span class="message">${data.message}</span>
            <button class="delBtn btn-sm">delete</button>
            <div>${time}</div>
        </li>
        `;

        this.list.innerHTML += html;
    }
}