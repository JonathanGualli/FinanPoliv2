const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', (qr) =>{
    qrcode.generate(qr, { small: true});
});

client.initialize();

client.on('ready', () => {
        console.log('Client is ready!');
        //sendMessage('+593984704114', 'SMS de verificacion');
});

const sendSMS = async (to, message) =>{
    const chatId = '593' + to.substring(1) + "@c.us";
    console.log(chatId);
    try {
        await client.sendMessage(chatId, message);
    } catch (error){
        console.log(error);
    }
    //client.sendMessage(to, message);
}

module.exports={
    sendSMS
}


