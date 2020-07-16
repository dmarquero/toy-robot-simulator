import * as readline from 'readline';
import { COMMAND, MESSAGE, DIRECTION } from './Constants';
import RobotMovementService from './RobotMovementService';
import { Console } from 'console';

class RobotService {

    /**
    * Initial method called by main
    */
    async init() {
        let exit = false;
        console.log(MESSAGE.WELCOME);

        do {
            await this.getUserInput(MESSAGE.INIT_QUESTION)
                .then((answer: string) => {
                    if (answer.indexOf(COMMAND.PLACE) >= 0) {
                        let validPlaceCommand = this.validatePlaceCommand(answer);
                        // if place command is valid go to simulator
                        if (validPlaceCommand) {
                            exit = true;
                            console.log(MESSAGE.MOVE_ROBOT);
                            this.simulateToyRobot(validPlaceCommand);

                        } else {
                            console.log(MESSAGE.ERROR.PLACE.INVALID_COMMAND);
                        }
                    } else {
                        if (answer ===  COMMAND.EXIT) {
                            exit = true;
                            console.log(MESSAGE.THANK_YOU);
                            return;
                        }
                        console.log(MESSAGE.ERROR.PLACE.FIRST_COMMAND);
                    }
                });
        } while (!exit) // loop through the question if invalid input
    }

    /**
* Processes the commands for the robot
* @param {any} direction place command input.
*/
    async simulateToyRobot(direction: any) {

        try {

            let newDirection = direction;
            let exit = false;

            do {
                await this.getUserInput('')
                    .then((answer: string) => {
                        let command = answer.indexOf(COMMAND.PLACE) >=0 ? COMMAND.PLACE : answer;
                        switch (command) {
                            case COMMAND.MOVE: newDirection = RobotMovementService.move(newDirection)
                                               break;
                            case COMMAND.LEFT:
                            case COMMAND.RIGHT: newDirection = RobotMovementService.changeFace(newDirection, answer);
                                                break;
                            case COMMAND.PLACE: newDirection = this.validatePlaceCommand(answer,newDirection);
                                                break;
                            case COMMAND.REPORT: newDirection.fall = false; console.log(`Output: ${newDirection.x},${newDirection.y},${newDirection.face}`)
                                                break;
                            case COMMAND.EXIT: exit = true; console.log(MESSAGE.THANK_YOU); break;
                            default: break;

                        }
                        if (newDirection.fall) {
                            console.log(MESSAGE.ROBOT_FALL);
                        }
                    });
            } while (!exit)
        } catch(error){
            console.log(error)
        }
}
    /**
    * Validates the place command input
    * @param {string} answer place command.
    * @returns true or false
    */
    validatePlaceCommand = (answer: any, location? : any) => {
        try {
            let command = answer.split(" ");
            let direction = command[1].split(",");
            let x = +direction[0];
            let y = +direction[1];
            let face = direction[2];

            if (isNaN(x) || isNaN(y) || [DIRECTION.NORTH, DIRECTION.SOUTH, DIRECTION.EAST, DIRECTION.WEST].indexOf(face) === -1) {
                location.fall = false;
                return location ? location : null;
            }

            if ( x > 4 || y > 4) {
                location.fall = true
                return location ? location : null;
            }

            return {
                x: x,
                y: y,
                face: face,
                fall: false
            }
        }
        catch (error) {
            return location ? location : null;
        }

    };

    /**
   * reader for user input
   * @param {string} question question for the input;
   */
    getUserInput = (question: string) => {
        let response = '';

        const reader = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        reader.setPrompt(question);
        reader.prompt();

        return new Promise((resolve, reject) => {
            reader.on('line', (userInput) => {
                response = userInput;
                reader.close();
            });

            reader.on('close', () => {
                resolve(response);
            });
        });
    }
}

export default new RobotService();
