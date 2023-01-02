import { Controller, Delete, Get, Param, Patch, Post, Body, Query} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
    
    @Get()
    getAll(){
        return 'This will give you All Movies'
    }

    @Get("Search")
    searchMovie(@Query("year") searchingYear:string){
        return `We are searching for a movie made after:${searchingYear}`
    }

    //if you want something, you have to ask for it 
    @Get('/:id')
    getByMovieId(@Param('id') movieId:string){
        return `This will show you a movie with Movie id ${movieId}`
    }

    @Post()
    createMovie(@Body() movieData){
        console.log(movieData)
        return `This will produce a movie called ${movieData}`
    }

    @Delete('/:id')
    deleteMovie(@Param("id") moiveId:string){
        return `This will delete a movie with Movie id ${moiveId}`
    }

    @Patch('/:id')
    patchMovie(@Param('id') movieId:string, @Body() updateData){
        return {
            "updatedMovie":movieId,
            ...updateData
        }
    }

}
