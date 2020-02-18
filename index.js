
module.exports.load = function(seed){
//        const edfs = require("edfs").attachFromSeed(seed);
    const se = require("swarm-engine");
    se.initialise();
    //TODO: maybe we should get the boot script from the same csb? :-?
    const pathName = "path";
    const path = require(pathName);
    const powerCord = se.OuterThreadPowerCord(path.join(__dirname, "../../modules/swarm-engine/bootScripts/ThreadWorkerBootScript"), false, seed);
    $$.swarmEngine.plug(se.prototype.WILD_CARD_IDENTITY, powerCord);

    const handler = {
        attachTo : $$.interactions.attachTo,
        startTransaction : function (swarmTypeName, phaseName, ...args) {
            //todo: get identity from context somehow
            return $$.interactions.startSwarmAs("anonymous", swarmTypeName, phaseName, ...args);
        }
    };

    return handler;
};