import {
    Controller,
    Get,
    Post,
    Body,
    UsePipes,
    ValidationPipe,
    Req,
    UseGuards,
    Query,
    ParseIntPipe,
    Param,
    Patch,
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
import { LinkService } from './link.service'
import { CreateLinkDto } from './dto/create-link.dto'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import {
    CreateLinkRequest,
    CreateLinkResponse,
    FindAllResponse,
    FindOneResponse,
    UpdateCountRequest,
    UpdateCountResponse
} from './types'

@ApiTags('Ссылки')
@Controller('link')
export class LinkController {
    constructor(private readonly linkService: LinkService) { }

    @ApiOperation({ summary: 'Создание ссылки' })
    @ApiOkResponse({ type: CreateLinkResponse })
    @ApiBody({ type: CreateLinkRequest })
    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.CREATED)
    @Header('Content-type', 'application/json')
    create(@Body() createLinkDto: CreateLinkDto, @Req() req) {
        return this.linkService.create(createLinkDto, +req.user.id)
    }

    @ApiOperation({ summary: 'Получить все ссылки пользователя' })
    @ApiOkResponse({ type: FindAllResponse })
    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(
        @Req() req,
        @Query('page', ParseIntPipe) page: number = 1,
        @Query('limit', ParseIntPipe) limit: number = 3
    ) {
        return this.linkService.findAllWithPagination(+req.user.id, page, limit)
    }

    @ApiOperation({ summary: 'Получить одну ссылку' })
    @ApiOkResponse({ type: FindOneResponse })
    @Get(':link')
    findOne(@Param('link') link: string,) {
        return this.linkService.findOneByShortLink(link)
    }

    @ApiOperation({ summary: 'Обновление кол-ва заходов на страницу' })
    @ApiOkResponse({ type: UpdateCountResponse })
    @ApiBody({ type: UpdateCountRequest })
    @Patch(':id')
    increment(
        @Param('id', ParseIntPipe) id: number,
        @Body() { count }: UpdateCountRequest
    ) {
        return this.linkService.increment(id, count)
    }
}
