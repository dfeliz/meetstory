
export function chatChildrenMapper(children) {
    const time = children.querySelector("div > div.MuzmKe").innerText;
    const sender = children.querySelector("div > div.YTbUzc").innerText;
    const messageElements = Array.from(children.querySelector("div > div.Zmm6We").childNodes);
    const messages = messageElements.map(message => message.innerText);

    return {
        time,
        sender,
        messages
    }
}
            