var roleComrade = {
    /** @param {Creep} creep **/

    run: function(creep) {
        var CurrentTarget = Game.getObjectById(creep.memory.target);
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
            console.log('Pillbot - Comrade out of energy.');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
	       var targets = creep.room.find(FIND_STRUCTURES);
	       var bFoundReppableRoad = false;
	       var x = 0;
	       if (CurrentTarget)
	       {
    	       if (CurrentTarget.hits==CurrentTarget.hitsMax)
    	       {
    	           CurrentTarget = null;
    	       }
    	       else
    	       {
    	           if (CurrentTarget.hits < CurrentTarget.hitsMax)
    	           {
    	               bFoundReppableRoad = true;
    	           }
    	       }
	       }
                if (targets.length > 0 && bFoundReppableRoad == false)
                {
                    while(x < targets.length)
                    {
                        if (targets[x].hits/targets[x].hitsMax < .5)
                        {
                            bFoundReppableRoad = true;
                            console.log('Comrade is repairing '+targets[x].id+'.' );
                            creep.memory.target = targets[x].id;
                            break;
                        }
                        x++;
                    }
                    
                }
                if (bFoundReppableRoad)
                {
                    var result = creep.repair(CurrentTarget);
                    if (result == ERR_NOT_IN_RANGE)
                    {
                        creep.say('crm');
                        creep.moveTo(CurrentTarget);
                    }
                    if (result == OK)
                    {
                        creep.say('Repairing');
                    }
                }
            if (bFoundReppableRoad == false)
            {    
              
                /*var currentTarget = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES,{filter: { structureType: STRUCTURE_EXTENSION }});
                if (!currentTarget)
                {
                    currentTarget = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                }*/
               var currentTarget = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
                if(currentTarget) {
                 if(creep.build(currentTarget) == ERR_NOT_IN_RANGE) {
                      creep.moveTo(currentTarget);
                        creep.say('Building.');
                   }
                }
                else
                {
                    console.log('Failed to find construction site.');
                    creep.memory.role = 'builder';
                }
            }

	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
                creep.say('Harvesting');
            }
	    }
	}
};

module.exports = roleComrade;