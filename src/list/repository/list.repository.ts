import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { ListEntity } from '../models/list/entities/list.entity';
import { CreateNoteDto } from '../models/dto/create-note.dto';
import { UserEntity } from "src/auth/models/entities/user.entity";

@EntityRepository(ListEntity)
export class ListRepository extends Repository<ListEntity> {

    async getMessages(user: UserEntity, filter?: string){
        try {
            let notes: ListEntity[] = []
            if(filter){
                notes = await this.find({ where: { user: { id: user.id }, filter } });
            }else{
                notes = await this.find({ where: { user: { id: user.id }} });
            }
            
            return notes;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
        
    }

    async createNote(noteDTO: CreateNoteDto, user: UserEntity){
        try {
            const { title, note, filter } = noteDTO;
            const noteCreated =  this.create({ title, note, filter, user: { id: user.id} });
            await this.save(noteCreated);
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async deleteNote(id_user: UserEntity, id: number){
        try {
            const note = await this.getNote(id, id_user.id);
            await this.remove(note);
        } catch (error) {
            console.log(error);
            if(error.status == 404){
                throw new NotFoundException('No existe la nota especificada.'); 
            }else{
                throw new InternalServerErrorException();
            }
        }
    }

    async getNote(id: number, id_user: number) {
            const note = await this.findOne({where: {id, user: {id: id_user}}});
            if(note){
                return note
            }else{
                throw new NotFoundException('No existe la nota especificada.');
            }        
    }
}