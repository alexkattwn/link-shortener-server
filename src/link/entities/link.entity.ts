import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm"
import { User } from "src/user/entities/user.entity"

@Entity()
export class Link {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number

    @Column()
    original_link: string

    @Column()
    short_link: string

    @Column({ default: 0 })
    count: number

    @ManyToOne(() => User, (user) => user.links)
    @JoinColumn({ name: 'user_id' })
    user: User
}
