export const COMMAND = {
  PLACE: 'PLACE',
  MOVE: 'MOVE',
  REPORT: 'REPORT',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  EXIT: 'EXIT'
};

export const DIRECTION = {
  NORTH :'NORTH',
  EAST :'EAST',
  WEST :'WEST',
  SOUTH :'SOUTH'
}

export const MESSAGE = {
WELCOME : `Welcome to your robot toy simulator!\nJust type 'EXIT' if you got tired of playing\n`,
INIT_QUESTION : `Where do you want to place your robot? `,
MOVE_ROBOT : `You can now move your toy robot!\n`,
THANK_YOU : `Thank you for playing!!`,
ROBOT_FALL :`Oops..the robot will fall`,
 ERROR:{
  PLACE :{
      FIRST_COMMAND :`First command should be 'PLACE'`,
      INVALID_COMMAND :`Invalid 'PLACE' command`
  }
}

}