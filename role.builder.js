var roleBuilder = {

    
   /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE && (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE || creep.carry.energy == 0)) {
            //Do pathfinding here to ensure the upgrader sticks to the path, maybe create a function to do this that all roles inherit
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
                creep.say('Moving.');
            }
            else
            {
                creep.say("Upgrading.");
            }
        }
	}
};

module.exports = roleBuilder;