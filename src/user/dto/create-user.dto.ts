import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class CreateUserDto {
    @ApiProperty({ example: 'ivan' })
    @IsNotEmpty()
    @IsString({ message: 'Username must be a string' })
    readonly username: string

    @ApiProperty({ example: 'ivan123' })
    @IsNotEmpty()
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be more then 6 symbols' })
    readonly password: string
}