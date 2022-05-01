import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { notesMapper } from 'src/list/models/mappers/get-message.mapper';
import { ListRepository } from '../../repository/list.repository';
import { CreateNoteDto } from '../../models/dto/create-note.dto';
import { UserEntity } from 'src/auth/models/entities/user.entity';

@Injectable()
export class ListService {
    constructor(
        @InjectRepository(ListRepository) private listRepository: ListRepository
    ) {}

    async getNotes(user: UserEntity, filter?: string){
        const notes = await this.listRepository.getMessages(user, filter);
        return notesMapper(notes);
    }

    async createNote(note: CreateNoteDto, user: UserEntity){
        await this.listRepository.createNote(note, user);
    }

    async deleteNote(user: UserEntity, id: number){
        await this.listRepository.deleteNote(user, id);
    }
}
