import { Request, Response, NextFunction } from 'express';
import { LeagueUseCase } from '../use-cases';
import { League, LeagueQueries } from '../entities';
import { Validator } from '../errors';

export class LeagueController {
  constructor(private leagueUseCase: LeagueUseCase) {}

  async add(req: Request, res: Response, next: NextFunction) {
    const lg: League = req.body;

    const league = new League(
      lg.name,
      lg.type,
      lg.logo,
      lg.season,
      lg.numberOfRounds,
      lg.rounds,
      lg.countryId
    );

    try {
      new Validator<League>(league).blank().missing();
      const country = await this.leagueUseCase.add({
        ...league,
      });
      return res.status(201).json(country);
    } catch (error) {
      next(error);
    }
  }

  async search(req: Request, res: Response, next: NextFunction) {
    const { name }: LeagueQueries = req.query;
    try {
      const leagues = await this.leagueUseCase.search({
        name,
      });
      return res.status(200).json(leagues);
    } catch (error) {
      next(error);
    }
  }
}
