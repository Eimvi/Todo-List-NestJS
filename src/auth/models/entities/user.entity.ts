import { BaseEntityDefault } from 'src/config/base.entity';

import { Column, Entity, OneToMany } from 'typeorm';
import { ListEntity } from '../../../list/models/list/entities/list.entity';

@Entity({ name: 'user'})
export class UserEntity extends BaseEntityDefault {

    @Column({length: 20})
    username: string;

    @Column({length: 40})
    email: string;
    
    @Column({length: 100})
    password: string;

    @Column({nullable: true})
    active: boolean;

    @OneToMany(() => ListEntity, (list) => list.user)
    notes!: ListEntity[];
}