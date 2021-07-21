import { Injectable, Inject } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from "typeorm";
import { Users } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from "../auth/create-user.dto";

@Injectable()
export class UserService {

    constructor(@InjectRepository(Users)
    private usersRepository: Repository<Users>) {}

    async create(user: CreateUserDto): Promise<Users> {
        return await this.usersRepository.save(user);
    }

    async readAll(): Promise<Users[]> {
        return await this.usersRepository.find();
    }

    async findByLogin(login): Promise<Users[]> {
        return await this.usersRepository.find({where: {login: login}});
    }

    async update(user: Users): Promise<UpdateResult> {

        return await this.usersRepository.update(user.id, user);
    }

    async delete(id): Promise<DeleteResult> {
        return await this.usersRepository.delete(id);
    }
}
