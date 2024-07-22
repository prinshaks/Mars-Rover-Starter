const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  it("constructor sets position and default values for mode and generatorWatts", function() {
    expect(new Rover(87382098).position ).toBe(87382098);
    expect(new Rover(87382098).mode ).toBe('NORMAL');
    expect(new Rover(87382098).generatorWatts ).toBe(110);
  });
  it("response returned by receiveMessage contains the name of the message", function() {
    expect( new Rover(87382098).receiveMessage(new Message('Test message with two commands',[])).message).toBe('Test message with two commands');
  }); 
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    expect( new Rover(87382098).receiveMessage(new Message('Test message with two commands',[new Command('MODE_CHANGE','LOW_POWER'),new Command('STATUS_CHECK')])).results.length).toBe(2);
  }); 

  it("responds correctly to the status check command", function() {
    expect( new Rover(87382098).receiveMessage(new Message('Test message with two commands',[new Command('STATUS_CHECK')])).results[0].roverStatus.mode).toBe('NORMAL');
    expect( new Rover(87382098).receiveMessage(new Message('Test message with two commands',[new Command('STATUS_CHECK')])).results[0].roverStatus.generatorWatts).toBe(110);
    expect( new Rover(87382098).receiveMessage(new Message('Test message with two commands',[new Command('STATUS_CHECK')])).results[0].roverStatus.position).toBe(87382098);
  }); 
  it("responds correctly to the mode change command", function() {
    expect( new Rover(87382098).receiveMessage(new Message('Test message with two commands',[new Command('MODE_CHANGE','LOW_POWER')])).results[0].completed).toBe(true);
    expect( new Rover(87382098).receiveMessage(new Message('Test message with two commands',[new Command('MODE_CHANGE','LOW_POWER'),new Command('STATUS_CHECK')])).results[1].roverStatus.mode).toBe('LOW_POWER');

    expect( new Rover(87382098).receiveMessage(new Message('Test message with two commands',[new Command('MODE_CHANGE','NORMAL')])).results[0].completed).toBe(true);
    expect( new Rover(87382098).receiveMessage(new Message('Test message with two commands',[new Command('MODE_CHANGE','NORMAL'),new Command('STATUS_CHECK')])).results[1].roverStatus.mode).toBe('NORMAL');

    expect( new Rover(87382098).receiveMessage(new Message('Test message with two commands',[new Command('MODE_CHANGE','HIGH_POWER')])).results[0].completed).toBe(false);
  }); 
  it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    expect( new Rover(87382098).receiveMessage(new Message('Test message with two commands',[new Command('MODE_CHANGE','LOW_POWER'), new Command('MOVE',2)])).results[1].completed).toBe(false);
    expect( new Rover(87382098).receiveMessage(new Message('Test message with two commands',[new Command('MODE_CHANGE','LOW_POWER'), new Command('MOVE',97382098),new Command('STATUS_CHECK')])).results[2].roverStatus.position).toBe(87382098);
  }); 
  it("responds with the position for the move command", function() {
    expect( new Rover(87382098).receiveMessage(new Message('Test message with two commands',[new Command('MOVE',97382098),new Command('STATUS_CHECK')])).results[1].roverStatus.position).toBe(97382098);
  });   

  // 7 tests here!

});
