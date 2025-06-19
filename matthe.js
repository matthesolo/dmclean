const { Client, version } = require('discord.js-selfbot-v13');
const matthe = new Client();

const token = ""; // Hesabının tokeni
const ID = "1365382843815034960"; //kendi idni giricen
const komut = "!clean"; // Komut adı

matthe.on('ready', () => {
    console.log(`💚 Matthe Cleaner Bot başarıyla ${matthe.user.tag} olarak giriş yaptı! Botun ID: (${matthe.user.id}) Versiyon: ${version}`);
});

matthe.on('messageCreate', async message => {
    if (message.author.id !== ID) {
        return;
    }

    if (message.content.startsWith(komut)) {
        console.log(`[!] == Command Run: ${message.content}`);

        // Hızlı / Yavaş mod seçimi
        const args = message.content.split(" ").slice(1); // Komut kısmını ayırıyoruz
        let speed = args[0] || "normal";  // Hızlı ya da yavaş mod
        let limit = args[1] || "5";  // Silinecek mesaj sayısı (varsayılan: 5)

        // Kullanıcıya hız modunu ve limit değerini soruyoruz
        if (!args[0] || !args[1]) {
            message.reply("Lütfen komutunuzu şu formatta yazın: `clean [hızlı/yavaş] [silinecek_mesaj_sayısı]`");
            return;
        }

        console.log(`Hız Modu: ${speed}, Mesaj Limiti: ${limit}`);

        // Hızlı veya Yavaş mod işlemi
        let deleteSpeed = speed === "hızlı" ? 100 : 1000; // Hızlı: 100ms, Yavaş: 1000ms

        try {
            const messages = await message.channel.messages.fetch({ limit: limit });
            let userMessages = messages.filter(m => m.author.id === matthe.user.id);
            let i = 0;

            // Mesajları silme işlemi
            for (const msg of userMessages.values()) {
                setTimeout(async () => {
                    try {
                        await msg.delete();
                        console.log(`Mesaj silindi: ${msg.id}`);
                    } catch (err) {
                        console.error('Mesaj silme hatası:', err);
                    }
                }, i * deleteSpeed);

                i++;
            }
        } catch (error) {
            console.error('Error fetching or deleting messages:', error);
        }
    }
});

matthe.login(token);
