
module.exports.load = function(seed, identity, callback){
//        const edfs = require("edfs").attachFromSeed(seed);
    const se = require("swarm-engine");
    se.initialise();
    //TODO: maybe we should get the boot script from the same csb? :-?
    const pathName = "path";
    const path = require(pathName);
    const powerCord = se.OuterThreadPowerCord(path.join(process.env.PSK_ROOT_INSTALATION_FOLDER, "psknode/bundles/threadBoot.js"), false, seed);
    $$.swarmEngine.plug("identityName", powerCord);

    const handler = {
        attachTo : $$.interactions.attachTo,
        startTransaction : function (transactionTypeName, methodName, ...args) {
            //todo: get identity from context somehow
            return $$.interactions.startSwarmAs("identityName", "transactionHandler", "start", identity, transactionTypeName, methodName, ...args);
        }
    };
    //return handler;
    //todo implement a way to know when thread is ready
    setTimeout(()=>{
        callback(undefined, handler);
    }, 100);
};