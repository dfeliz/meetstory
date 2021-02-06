const getName = (token) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    return fetch("https://content-people.googleapis.com/v1/people/me?personFields=names", requestOptions)
        .then(response => {
            return response.json()
        })
        .then(response => {
            const UserName  = response.names[0].displayName
            return UserName
        })
        .catch(err => {
            console.error(err);
        });
}

export {
	getName,
}
