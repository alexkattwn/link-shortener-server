import {
    CanActivate,
    ExecutionContext,
    Injectable
} from "@nestjs/common"
import { LinkService } from "src/link/link.service"

@Injectable()
export class AuthorGuard implements CanActivate {
    constructor(
        private readonly linkService: LinkService,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const { id } = request.params

        const user = request.user

        const link = await this.linkService.findOne(id)

        if (link && user && link.user.id === user.id) {
            return true
        }

        return false
    }
}