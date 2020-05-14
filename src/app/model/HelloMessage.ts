import {User} from './User';
import {Guild} from './Guild';

export class HelloMessage {
  id: number;
  guildId: Guild;
  messageOwner: User;
  message: string;
}
