const Presence = require("./presence.js");

const config = require("./config.json");

(async () => {
    const rpc = new Presence(config);
    await rpc.login();
    
    setInterval(_ => {
        rpc.setPresence({
            name: "GT:New Horizons",
            state: "Playing Singleplayer Minecraft 1.7.10",
            details: "In the Overworld",
            largeImage: "mp:attachments/781499018253434924/1066145127510319204/12788076.png",
            start: 1689584799000
        });
    }, 600000);
    
})();