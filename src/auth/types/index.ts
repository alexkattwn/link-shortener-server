import { ApiProperty } from "@nestjs/swagger"

export class LoginUserResponse {
    @ApiProperty({ example: 1 })
    id: number

    @ApiProperty({ example: 'petr' })
    username: string

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJZXRyIiwiaWF0IjoxNjk0MzYxNDgzCJleHAiOjE2OTY5NTM0ODN9.D6Z4hNRWhzK7z31KEN_hMLGr-tZC2Fy0Wl8n9FPZOo' })
    token: string
}

export class LoginUserRequest {
    @ApiProperty({ example: 'petr' })
    username: string

    @ApiProperty({ example: 'petr123' })
    password: string
}

export class ProfileResponse {
    @ApiProperty({ example: 1 })
    id: number

    @ApiProperty({ example: 'petr' })
    username: string
}