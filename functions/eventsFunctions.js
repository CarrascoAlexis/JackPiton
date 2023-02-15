var fs = require('fs')

const startEventOrg = (interaction)  =>
{
    fs.readFile('./resources/eventsOrganisation.json', 'utf8', function readFileCallBack(err, data){
        if(err)
        {
            console.log(err)
            return
        }
        obj = JSON.parse(data)
        for(i = 0; i < obj.events.length; i++)
        {
            objectData = [{}]
            if(obj.events[i].authorId == interaction.member.user.id)
            {
                console.log("Le player à déja crée un event, doit possible continuer")
            }else
            {
                objectData[0].authorId = interaction.member.user.id
                objectData[0].state = 0
            }
            console.log(objectData)
            
            console.log(obj.events)
        }
    })
}

module.exports.startEventOrg = startEventOrg