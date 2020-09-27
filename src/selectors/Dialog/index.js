class Dialog {
    constructor(dialog) {
        this.dialog = dialog;
    }

    getTime() {
        const time = this.dialog.querySelector("div > div.MuzmKe").innerText;
        return time;
    }

    getSender() {
        const sender = this.dialog.querySelector("div > div.YTbUzc").innerText;
        return sender;
    }

    getMessages() {
        const messages = this.dialog.querySelector("div > div.Zmm6We").childNodes;
        return messages.map(message => {
            return message.innerText;
        });
    }
}

export default Dialog;
