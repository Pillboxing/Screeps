var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.Restock) {
	        if (creep.carry.energy == creep.carryCapacity)
	        {
	            creep.memory.Restock = false;
	        }
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                
                creep.moveTo(sources[0])
            }
        }
        else
        {
            if (creep.carry.energy == 0)
            {
                creep.memory.Restock = true;
            }
            if (Game.spawns['Sp1'].energy < Game.spawns['Sp1'].energyCapacity)
            {
                var Result = creep.transfer(Game.spawns['Sp1'], RESOURCE_ENERGY);
            }
            else
            {
                var Result = ERR_FULL;
            }
            if(Result == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Sp1']);
                creep.say('Moving to dropoff');
            }
            if (Result == ERR_FULL)
            {
                var extensions = Game.spawns['Sp1'].room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_EXTENSION}});
                var x = 0;
                while (x < extensions.length)
                {
                        if (extensions[x].energy < extensions[x].energyCapacity)
                        {
                           Result = creep.transfer(extensions[x],RESOURCE_ENERGY);
                           console.log(Result);
                           if (Result == ERR_NOT_IN_RANGE)
                           {
                               creep.moveTo(extensions[x]);
                               creep.say('extension');
                               break;
                           }
                           if (Result == OK)
                           {
                               console.log('Pillbot - Harvester dropping off energy to extension');
                               break;
                           }
                        }
                         x++;
                }
                    
                }
            }
           if (Result == OK)
            {
                console.log('Pillbot - Worker dropping off energy');
            }
        }
    
};

module.exports = roleHarvester;