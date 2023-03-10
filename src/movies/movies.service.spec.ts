import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    service.create({
      title: 'Test',
      genres: ['test'],
      year: 2000,
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Get All', () => {
    it('Return All Data', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });
  describe('Get One', () => {
    it('Return a Movie with Given Id', () => {
      const movie = service.getByMovieId(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('Return an Error', () => {
      try {
        service.getByMovieId(99);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Delete One', () => {
    it('Deletes a Movie', () => {
      const allMovies = service.getAll();
      service.deleteOne(1);
      const afterDelete = service.getAll();
      expect(afterDelete.length).toBeLessThan(allMovies.length);
    });

    it('Should Return 404', () => {
      try {
        service.deleteOne(99);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('Create a Movie', () => {
    it('Create a Movie', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test2',
        genres: ['test'],
        year: 2001,
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('Update a Movie', () => {
    it('Should Update a Movie', () => {
      service.update(1, { title: 'Updated' });
      const movie = service.getByMovieId(1);
      expect(movie.title).toEqual('Updated');
    });

    it('Should Return 404', () => {
      try {
        service.update(99, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
