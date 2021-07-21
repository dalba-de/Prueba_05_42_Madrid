import { Controller, Get, Post,Put, Delete, Body, Param } from '@nestjs/common';
import { Injectable, Inject } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from "typeorm";
import { Users } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from "../auth/create-user.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {

    constructor(private usersService: UserService) {}

    @Get()
    read(): Promise<Users[]> {
      return this.usersService.readAll();
    }

    @Get(':login')
    findLogin(@Param('login') login): Promise<Users[]> {
      return this.usersService.findByLogin(login);
    }

    @Post('create')
    async create(@Body() user: CreateUserDto): Promise<any> {
      return this.usersService.create(user);
    }
    
    @Put(':id/update')
    async update(@Param('id') id, @Body() user: Users): Promise<any> {
        user.id = Number(id);
        return this.usersService.update(user);
    }  
    
    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
      return this.usersService.delete(id);
    }
}
