import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString } from "class-validator"

export class CreateLinkDto {
    @ApiProperty({ example: 'https://alexkattwn.github.io/css-base/' })
    @IsNotEmpty()
    @IsString({ message: 'Username must be a string' })
    readonly original_link: string
}
