import { COMMAND, DIRECTION } from './Constants';

class RobotMovementService {
    /**
   * process the movement of the robot
   * @param {any} direction current direction and location of the robot;
   * @returns new location if applicable
   */
    move = (direction: any) => {

        let x = +direction.x;
        let y = +direction.y;
        let face = direction.face;

        switch (face) {
            case DIRECTION.NORTH: {
                                    if ((y + 1 <= 4)) {
                                        direction.y = y + 1;
                                        direction.fall = false
                                    } else {direction.fall = true;}
                                    break;
                                }
            case DIRECTION.EAST: {
                                    if ((x + 1 <= 4)) {
                                        direction.x = x + 1;
                                        direction.fall = false
                                    } else {direction.fall = true;}
                                    break;
                                }
            case DIRECTION.WEST: {
                                    if ((x - 1 >= 0)) {
                                        direction.x = x - 1;
                                        direction.fall = false
                                    } else {direction.fall = true;}
                                    break;
                                 }
            case DIRECTION.SOUTH:{
                                    if ((y - 1 >= 0)) {
                                        direction.y = y - 1;
                                        direction.fall = false
                                    } else {direction.fall = true;}
                                    break;
                                }
            default: break;

        }
        return direction;
    }
    
    /**
   * process which direction the robot will face after a LEFT or RIGHT command
   * @param {string} direction current direction where the robot is faced;
   * @param {string} reawayer movement command
   * @returns new direction
   */
  changeFace = (direction: any, way: string) => {
    switch (direction.face) {
        case DIRECTION.NORTH: direction.face = way === COMMAND.LEFT ? DIRECTION.WEST :DIRECTION.EAST
                              break;
        case DIRECTION.EAST: direction.face = way === COMMAND.LEFT ? DIRECTION.NORTH :DIRECTION.SOUTH
                              break;
        case DIRECTION.WEST: direction.face = way === COMMAND.LEFT ? DIRECTION.SOUTH :DIRECTION.NORTH
                              break;
        case DIRECTION.SOUTH: direction.face = way === COMMAND.LEFT ? DIRECTION.EAST :DIRECTION.WEST
                              break;
        default: break;

    }
    direction.fall = false;
    return direction;
}
}

export default new RobotMovementService();
