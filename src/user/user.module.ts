import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { User } from './entities/user.entity'
import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get('JWT_SECRET'),
                signOptions: { expiresIn: '30d' }
            }),
            inject: [ConfigService]
        })
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule { }
