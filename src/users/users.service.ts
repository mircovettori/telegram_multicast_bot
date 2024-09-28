import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [];

  findOne(username: string): User | undefined {
    return this.users.find(user => user.username === username);
  }

  insertOne(username: string, password: string): User | undefined {
    let newUser = {userId: randomUUID.toString(), username, password  }
    this.users.push(newUser);
    return newUser
  }
}