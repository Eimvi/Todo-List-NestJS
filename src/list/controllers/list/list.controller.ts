import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ListService } from '../../services/list/list.service';
import { CreateNoteDto } from '../../models/dto/create-note.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { UserEntity } from '../../../auth/models/entities/user.entity';

@UseGuards(AuthGuard())
@Controller('list')
export class ListController {
    constructor(private listService: ListService){}

    @Get()
    getNotes(@GetUser() user: UserEntity, @Query('filter') filter?: string){
        return this.listService.getNotes(user, filter);
    }

    @Post('/create')
    createNote(@GetUser() user: UserEntity, @Body() note: CreateNoteDto){
        return this.listService.createNote(note, user);
    }

    @Delete('/delete/:id')
    deleteNote(@GetUser() user: UserEntity, @Param('id')id: number){
        return this.listService.deleteNote(user, id);
    }
}
