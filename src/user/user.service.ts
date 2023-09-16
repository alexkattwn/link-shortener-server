import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'

import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) { }

    async create(createUserDto: CreateUserDto) {
        const existUser = await this.userRepository.findOne({
            where: {
                username: createUserDto.username
            }
        })

        if (existUser) throw new BadRequestException('This username already exist')

        const user = await this.userRepository.save({
            username: createUserDto.username,
            password: await argon2.hash(createUserDto.password)
        })

        const token = this.jwtService.sign({ username: createUserDto.username })

        delete user.password

        return { user, token }
    }

    async findOne(username: string) {
        const user = await this.userRepository.findOne({ where: { username } })
        if (!user) throw new BadRequestException('There is no user with this username!')
        return user
    }
}
