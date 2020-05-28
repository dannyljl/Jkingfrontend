import {User} from './User';

export class Guild {
  id: number;
  users: User[];
  name: string;
  averageScore: number;
  leader: User;
}
