const se = require("swarm-engine");
se.initialise();

module.exports.load = function(seed, identity, callback){
    const pathName = "path";
    const path = require(pathName);
    const powerCord = se.OuterThreadPowerCord(path.join(process.env.PSK_ROOT_INSTALATION_FOLDER, "psknode/bundles/threadBoot.js"), false, seed);

    let cord_identity;
    try{
        const crypto = require("pskcrypto");
        cord_identity = crypto.pskHash(seed, "hex");
        $$.swarmEngine.plug(cord_identity, powerCord);
    }catch(err){
        return callback(err);
    }

    const handler = {
        attachTo : $$.interactions.attachTo,
        startTransaction : function (transactionTypeName, methodName, ...args) {
            //todo: get identity from context somehow
            return $$.interactions.startSwarmAs(cord_identity, "transactionHandler", "start", identity, transactionTypeName, methodName, ...args);
        }
    };
    //todo implement a way to know when thread is ready
    setTimeout(()=>{
        callback(undefined, handler);
    }, 100);
};