import { GetNotesDto } from "../dto/get-note.dto"
import { ListEntity } from '../list/entities/list.entity';

export const notesMapper = (notes: ListEntity[]) => {
    const notesDTO: GetNotesDto[] = notes.map(note => {
        return {
            id: note.id,
            title: note.title,
            note: note.note,
            filter: note.filter,
            status: note.status
        }
    })

    return notesDTO;
}