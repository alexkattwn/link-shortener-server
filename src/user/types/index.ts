import { ApiProperty } from "@nestjs/swagger"

export class RegistrationUserResponse {
    @ApiProperty({
        example: {
            username: 'ivan',
            id: 1
        }
    })
    user: {
        username: string
        id: number
    }

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InZhc2lhIiwiaF0IjoxNjk0MzU4MzAzLCJleHAiOjE2OY5NTAzMDN9.vS2w91i20l_hxmjd3mUXBopz64xDIabCq2SulqZdl9' })
    token: string
}

export class RegistrationUserRequest {
    @ApiProperty({ example: 'ivan' })
    username: string

    @ApiProperty({ example: 'ivan123' })
    password: string
}
