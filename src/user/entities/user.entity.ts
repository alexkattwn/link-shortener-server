import {
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm"
import { Link } from "src/link/entities/link.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @OneToMany(() => Link, (link) => link.user, { onDelete: 'CASCADE' })
    links: Link[]
}
