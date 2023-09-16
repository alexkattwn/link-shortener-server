import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as argon2 from 'argon2'

import { IUser } from 'src/types/types'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findOne(username)
        const passwordIsMatch = await argon2.verify(user.password, password)
        if (user && passwordIsMatch) {
            return user
        }
        throw new UnauthorizedException('User or password are incorrect!')
    }

    async login(user: IUser) {
        const { id, username } = user
        return {
            id,
            username,
            token: this.jwtService.sign({
                id: user.id,
                username: user.username
            })
        }
    }
}