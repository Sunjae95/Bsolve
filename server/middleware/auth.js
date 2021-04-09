const fetch = require('node-fetch');

const getAccessToken = async (url, bodyData) => {
    const queryStringBody = Object.keys(bodyData)
        .map(k => encodeURIComponent(k) + "=" + encodeURI(bodyData[k]))
        .join("&");
    console.log(bodyData);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body: queryStringBody
    };

    const getData = await fetch(url, requestOptions);
    const postData = await getData.json();
    console.log(postData);

    return postData;
}

const getUser = async (accessToken) => {
    const data = await fetch('https://kapi.kakao.com/v2/user/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken.access_token}`
        }
    });
    const user = await data.json();
    return user;
}

module.exports = {
    getAccessToken,
    getUser
};