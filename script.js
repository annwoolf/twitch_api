const request = new XMLHttpRequest(); 
const requestPost = new XMLHttpRequest(); 
request.open('GET','https://api.twitch.tv/kraken/streams?game=League%20of%20Legends&limit=20',true);
request.setRequestHeader("Client-ID", "ffq1m1096k0151oew2u35tt415ucnw"); //header沒有寫，看文件取得Client-ID的方法，上網找 XMLHttpRequest header
request.send();
const container = document.querySelector('.app');


function getgame(){
    if(request.status >= 200 && request.status <400){ //先確保可以取得資料
        //console.log(request.responseText);//印出responseText參考
        const gameList = JSON.parse(request.responseText)["streams"];//convert the string to jason object 
        gameList.forEach(function(game) { //遍歷 objects 
            const channel = game['channel']; //先 defined，因為後面會寫到，forEach 裡面的 channel 
            const preview = game['preview']; //先觀察層級，channel 和 preview 屬於同個層級
            console.log(preview['medium']); //preview 裡面的 medium 
            console.log(channel['logo']); //channel 裡面的 logo
            console.log(channel['status']); //channel 裡面的 status 
            console.log(channel['display_name']); //channel 裡面的 display_name 
            console.log(channel['url']);
            const div = document.createElement('div')
            div.classList.add('game')
            div.innerHTML = `
            <div class="preview">
                <a href="${game.channel['url']}" target="_blank"><img class="preview_image" src="${game.preview['medium']}" />
            </div>
            <div class="headshot_box">
                <a href="${game.channel['url']}" target="_blank"><img class="headshot" src="${game.channel['logo']}" />
            </div>
            <div class="text">
                <div class="title">${game.channel['status']}</div>
                <div class="player">${game.channel['display_name']}</div>
            </div>
            `
            container.appendChild(div)
        });
    } else {
        console.log(request.status, request.responseText);   
    }  
}

request.onload = getgame; 

request.onerror = function(){
    alert('系統不穩定，請再試一次');   
}

