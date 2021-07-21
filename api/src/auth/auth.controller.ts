import { Body, Controller, Get, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request } from "express";
import * as fetch from 'node-fetch'
import { Any } from 'typeorm';
import { Users } from "../user/user.entity";
import { UserService } from '../user/user.service'
import { CreateUserDto } from "./create-user.dto";

@Controller('auth')
export class AuthController {

    constructor(private usersService: UserService) {}

    @Get()
	@Redirect('http://localhost:3000/api', 302)
	login() {
		return {url: process.env.FORTYTWO_GET_CODE_URI, statusCode: 302};
	}

    @Get('callback')
	async logined(@Query('code') code, @Res() response) {
		const requestURI =  process.env.FORTYTWO_GET_TOKEN_URI;
        
		let queryString : string = "" 
			+ "grant_type=" + "authorization_code" + "&"
			+ "client_id=" + process.env.FORTYTWO_CLIENT_ID + "&" 
			+ "client_secret=" + process.env.FORTYTWO_CLIENT_SECRET + "&" 
			+ "code=" + code + "&"
			+ "redirect_uri=" + process.env.FORTYTWO_REDIRECT_URI + "&"
			+ "scope=public";

		const token:any =  await fetch(requestURI + queryString, {
			method: 'POST',
			headers: {
				'Content-Type':'application/x-www-form-urlencoded',
				"X-Mobile":"false",
			}
		})
		.then((res) => res.json())
		.then((data) => data);

		const data =  await fetch("https://api.intra.42.fr/v2/me", {
			method: 'GET',
			headers: {
				'Content-Type':'application/x-www-form-urlencoded',
				"Authorization":"Bearer " + token.access_token,
			}
		})
		.then((res) => res.json());

        const user = await this.usersService.findByLogin(data.login)

        let new_user: CreateUserDto;
        new_user = {
            login: data.login,
            token: token.access_token
        }

        if (user.length === 0)
        {
            this.usersService.create(new_user);
            console.log("Usuario creado");
        }
            
        else
            console.log("Este usuario ya existe");

        response.send(token);
	}

}

