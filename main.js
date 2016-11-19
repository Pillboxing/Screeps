var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
var roleComrade = require('role.comrade');
var x = 1;
var Namer = '';
var bFreeName;
var intNumberOfHarvesters;
var intNumberOfBuilders;
var intNumberOfComrades;
function Spawn(CreepType)
{
    x = 0;
    var Namer = CreepType;
    console.log('We are spawning a ' + CreepType + '.');
    while (Game.spawns['Sp1'].createCreep( [WORK,WORK,WORK,CARRY, CARRY,MOVE, MOVE], Namer,{ role: CreepType } ) == -3)
    {
        x++;
    Namer = CreepType + x;
    }
}
module.exports.loop = function () {

    intNumberOfHarvesters = 0;
    intNumberOfBuilders = 0;
    intNumberOfComrades = 0;

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(!creep) {
        delete Memory.creeps[name];
        console.log('Clearing dead creep from memory.');
        }
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
            intNumberOfHarvesters++;

        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
            intNumberOfBuilders++;
        }
        if (creep.memory.role == 'comrade')
        {
            roleComrade.run(creep);
            intNumberOfComrades++;
        }
    }



 var extensions = Game.spawns.Sp1.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_EXTENSION}});
                var x = 0;
                var TotalSpawnEnergy = 0;
                if (extensions.length > 0)
                {
                    while (x < extensions.length)
                    {
                        TotalSpawnEnergy = TotalSpawnEnergy + extensions[x].energy;
                     x++;   
                    }
                }
            
            TotalSpawnEnergy = TotalSpawnEnergy + Game.spawns['Sp1'].energy;

    if (TotalSpawnEnergy >= 500)
    {

        if (intNumberOfHarvesters < 2)
        {
            Spawn('harvester')
        }
        else
        {   if (intNumberOfComrades < 2 && intNumberOfBuilders > 0)
            {
                Spawn('comrade');
                
            }
            else
            {
                Spawn('builder');
            }
          
        }
    }
    else
    {
        if (intNumberOfHarvesters == 0)
        {
            if (Game.spawns['Sp1'].energy >= 200)
            {
                Game.spawns['Sp1'].createCreep([WORK,MOVE,CARRY],'Harvester1',{role: 'harvester'});
            }
        }
        if (intNumberOfBuilders == 0)
        {
            if (Game.spawns['Sp1'].energy == 300)
            {
                Game.spawns['Sp1'].createCreep([WORK,WORK,MOVE,CARRY],'Builder1',{role:'builder'});
            }
        }
    }
}