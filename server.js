const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

// Замените 'YOUR_TELEGRAM_BOT_TOKEN' на токен вашего бота
const token = '7598096712:AAGUgykrx_OmY8TUjQIU0YqJfyhguuB0wcc';
const bot = new TelegramBot(token, { polling: true });

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
app.use(express.static('public')); // Предполагается, что ваши HTML-файлы находятся в папке 'public'
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Замените 'YOUR_CHAT_ID' на ваш chat_id
const chatId = '274942366';

app.post('/send-message', (req, res) => {
    const { name, partner_name, alcohol_preferences, food_allergies } = req.body;
    const message = `Новое сообщение:\nИмя: ${name}\nИмя второй половинки: ${partner_name}\nПредпочтения по алкоголю: ${alcohol_preferences}\nПищевые аллергены: ${food_allergies}`;

    bot.sendMessage(chatId, message)
        .then(() => {
            res.status(200).send('Сообщение отправлено');
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Ошибка при отправке сообщения');
        });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});