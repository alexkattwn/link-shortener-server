import {
    Controller,
    Get,
    Post,
    UseGuards,
    Request,
    HttpCode,
    HttpStatus
} from '@nestjs/common'
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import {
    LoginUserRequest,
    LoginUserResponse,
    ProfileResponse
} from './types'

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @ApiOperation({ summary: 'Логин' })
    @ApiOkResponse({ type: LoginUserResponse })
    @ApiBody({ type: LoginUserRequest })
    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return await this.authService.login(req.user)
    }

    @ApiOperation({ summary: 'Получение профиля' })
    @ApiOkResponse({ type: ProfileResponse })
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
        return req.user
    }
}
