import { BaseEntityDefault } from 'src/config/base.entity';

import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../../../auth/models/entities/user.entity';

@Entity({ name: 'list'})
export class ListEntity extends BaseEntityDefault {
    @Column({length: 50})
    title: string;
    
    @Column({length: 200})
    note: string;

    @Column()
    filter: string;

    @Column({nullable: true})
    status: boolean;

    @ManyToOne(() => UserEntity, (user) => user.notes)
    @JoinColumn({ name: 'user_id' })
    user!: UserEntity;
}