import fs from 'fs';
import path from 'path';
import { User } from '../models/userModel';

const usersFilePath = path.join(__dirname, '..', 'DB', 'users.json');

export const getUserById = (id: number): User | undefined => {
    const usersData = fs.readFileSync(usersFilePath, 'utf8');
    const users: User[] = JSON.parse(usersData);
    const user = users.find(user => user.id === id);
    return user; // null을 undefined로 변환
};
