export class CommandBase implements CommandBaseInterface {

  type:   BridgeCommandType;
  canBroadcast = false;

  constructor(type: BridgeCommandType) {
    this.type = type;
  }

  /**
   * This is called by the BleCommandCleaner. This takes care of checking if the handles match.
   * @param otherCommand
   */
  isDuplicate(otherCommand: CommandBaseInterface) : boolean {
    if (this.type == otherCommand.type) {
      return this.duplicateCheck(otherCommand);
    }
    return false;
  }

  duplicateCheck(otherCommand: CommandBaseInterface) : boolean {
    return true;
  }
}