import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import { CreateLinkDto } from './dto/create-link.dto'
import { Link } from './entities/link.entity'

@Injectable()
export class LinkService {
    constructor(@InjectRepository(Link) private readonly linkRepository: Repository<Link>) { }

    async create(createLinkDto: CreateLinkDto, id: number) {
        const link = await this.linkRepository.save({
            original_link: createLinkDto.original_link,
            short_link: uuidv4(),
            user: { id }
        })

        return link
    }

    async findAllWithPagination(id: number, page: number, limit: number) {
        const links = await this.linkRepository.find({
            where: {
                user: { id }
            },
            relations: {
                user: true
            },
            order: {
                id: 'DESC'
            },
            take: limit,
            skip: (page - 1) * limit
        })

        const allLinks = await this.linkRepository.find({
            where: {
                user: { id }
            }
        })

        return { count: allLinks.length, rows: links }
    }

    async increment(id: number, count: number) {
        await this.findOne(id)

        await this.linkRepository.update(id, { count })

        return { msg: 'Quantity updated' }
    }

    async findOne(id: number) {
        const link = await this.linkRepository.findOne({
            where: { id },
            relations: {
                user: true
            }
        })

        if (!link) throw new NotFoundException('Link not found')

        return link
    }

    async findOneByShortLink(link: string) {
        const obj = await this.linkRepository.findOne({
            where: { short_link: link }
        })

        if (!obj) throw new NotFoundException('There is no such link')

        return obj
    }
}
