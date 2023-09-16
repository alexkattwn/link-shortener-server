import {
    Controller,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    HttpCode,
    HttpStatus,
    Header
} from '@nestjs/common'
import {
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiTags
} from '@nestjs/swagger'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import {
    RegistrationUserRequest,
    RegistrationUserResponse
} from './types'

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Регистрация' })
    @ApiOkResponse({ type: RegistrationUserResponse })
    @ApiBody({ type: RegistrationUserRequest })
    @Post('signup')
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type', 'application/json')
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }
}
