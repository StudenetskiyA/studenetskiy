var fs = require('fs');
var TelegramBot = require('node-telegram-bot-api');
var token = '291293592:AAHPHpuCEK-fDzl1Q5oXS38ZpqeSeBsT4pI';
var SHOW_N_FILES=8;
var dirname = 'C:/users/samsung/OneDrive/LYMplayer/';

var bot = new TelegramBot(token, {
	polling: true,
});

bot.on('message', function(msg) {
	var chatId = msg.chat.id;
	var filename = dirname+msg.text+'.mp3';
	var foundfile = [];
	if (fs.existsSync(filename)){
		bot.sendAudio(chatId,filename);
	}
	else {
		var file_list = fs.readdirSync(dirname);
		var i=0;
		file_list.forEach(function(file){
			
			if (file.indexOfInsensitive(msg.text)!==-1) {
				foundfile[i]=file;
				i=i+1;
			}
			else {

			}
		});

		if (i>0){
			bot.sendMessage(chatId, 'Такого аудиофайла не существует, список похожих:');
		}
		else {
			bot.sendMessage(chatId, 'Такого аудиофайла не существует. И ничего похожего.');
		}
		

		var tmpJ = 0;
		if (i>SHOW_N_FILES) tmpJ=SHOW_N_FILES;
		else tmpJ=i;
		for (var j=0;j<tmpJ;j++){
			bot.sendMessage(chatId, foundfile[j].slice(0,-4));
		}
		if (i>SHOW_N_FILES){
			bot.sendMessage(chatId, 'И еще '+(i-SHOW_N_FILES)+' файлов.');
		}
		//console.log(foundfile);
	}




});


String.prototype.indexOfInsensitive = function (s, b) {
    return this.toLowerCase().indexOf(s.toLowerCase(), b);
}
