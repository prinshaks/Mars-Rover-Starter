class Rover {
   constructor(position){  
         this.position=position;
         this.mode='NORMAL';
         this.generatorWatts=110;

   }
   receiveMessage(message){
      let resultsarr = [];
      let cmds = message.commands;
      for (let i = 0; i< cmds.length; i++){
         if(cmds[i].commandType==="MOVE"){
            if(this.mode=="LOW_POWER"){
               resultsarr.push({completed: false});
            }
            else {
               this.position = cmds[i].value;
               resultsarr.push({completed: true});
            }
         }
         else if(cmds[i].commandType==="STATUS_CHECK"){
            resultsarr.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position }}); //87382098
         }
         else if(cmds[i].commandType==="MODE_CHANGE"){
            if(!(cmds[i].value =='LOW_POWER' || cmds[i].value == 'NORMAL')){
               resultsarr.push({completed: false});
               } 
            else {
               this.mode = cmds[i].value;
               resultsarr.push({completed: true});
            }
         }
         else{
            resultsarr.push({completed: false});
         }
      }
      let msg = {
         message:message.name,
         results:resultsarr
      }
      return msg;
   }
}


module.exports = Rover;