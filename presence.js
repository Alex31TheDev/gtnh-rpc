const discord = require('discord.js-selfbot-v13');

function ready() {
    console.log("RPC connected");

    this.connected = true;
}

class Presence {
    constructor(config) {
        this.auth = {
            token: config.token,
            app_id: config.client_id
        }

        this.client = new discord.Client({
            checkUpdate: false,
            readyStatus: false
        });
        
        this.connected = false;
    }

    async login() {
        this.client.on("ready", ready.bind(this));

        await this.client.login(this.auth.token);

        console.log("Client login");
        return true;
    }

    setPresence(config) {
        return new Promise((resolve, reject) => {
            const doSet = async function(client) {
                const pres = new discord.RichPresence()
                    .setApplicationId(client.auth.app_id)
                    .setType(config.type || "PLAYING")
                    .setStartTimestamp(config.start || Date.now())
                    .setName(config.name || "")
                    .setDetails(config.details || "")
                    .setState(config.state || "")
                    .setAssetsLargeImage(config.largeImage || "");
                
                await client.client.user.setActivity(pres);
            }

            const checkFlag = async function (client) {
                if(!client.connected) {
                    setTimeout(checkFlag.bind(undefined, client), 100);
                } else {
                    await doSet(client);

                    console.log("Presence updated");
                    resolve(true);
                }
            };

            checkFlag(this);
        });
    }
}

module.exports = Presence;