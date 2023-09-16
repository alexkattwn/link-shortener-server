import { ApiProperty } from "@nestjs/swagger"
import { CreateLinkDto } from "../dto/create-link.dto"

export class CreateLinkResponse {
    @ApiProperty({ example: 'https://alexkattwn.github.io/css-base/' })
    original_link: string

    @ApiProperty({ example: '19666b2e-5ab9-4c6d-82ef-486c901e23b2' })
    short_link: string

    @ApiProperty({
        example: {
            id: 1
        }
    })
    user: {
        id: number
    }

    @ApiProperty({ example: 1 })
    id: number

    @ApiProperty({ example: 0 })
    count: number
}

export class CreateLinkRequest extends CreateLinkDto { }

export class UpdateCountResponse {
    @ApiProperty({ example: 'Quantity updated' })
    msg: string
}

export class UpdateCountRequest {
    @ApiProperty({ example: 1 })
    count: number
}

export class LinkItem {
    @ApiProperty({ example: 1 })
    id: number

    @ApiProperty({ example: 'https://alexkattwn.github.io/css-base/' })
    original_link: string

    @ApiProperty({ example: '19666b2e-5ab9-4c6d-82ef-486c901e23b2' })
    short_link: string

    @ApiProperty({ example: 0 })
    count: number
}

class User {
    @ApiProperty({ example: 1 })
    id: number

    @ApiProperty({ example: 'ivan' })
    username: string

    @ApiProperty({ example: '$argon2id$v=19$m=65536,t=3,p=4$Q6OGEPKM8Dm6ye0yGaVXVQ$Lyz7MvikB9WlpG+0PX7PelCsgF7tFx6fDVzC9JFz8d8' })
    password: string
}

export class LinkItemPagination extends LinkItem {
    user: User
}

export class FindAllResponse {
    @ApiProperty({ example: 5 })
    count: number

    @ApiProperty({
        example: [
            {
                id: 6,
                original_link: "sdfaffsdgsdgs",
                short_link: "19666b2e-5ab9-4c6d-82ef-486c901e23b2",
                count: 0,
                user: {
                    id: 1,
                    username: "petr",
                    password: "$argon2id$v=19$m=65536,t=3,p=4$Q6OGEPKM8Dm6ye0yGaVXVQ$Lyz7MvikB9WlpG+0PX7PelCsgF7tFx6fDVzC9JFz8d8"
                }
            }
        ]
    })
    rows: LinkItemPagination[]
}

export class FindOneResponse extends LinkItem { }