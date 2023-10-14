import { Request, Response, NextFunction } from 'express';
import { TeamUseCase } from '../use-cases';
import { Team, TeamQueries } from '../entities';
import { Validator } from '../errors';

export class TeamController {
  constructor(private teamUseCase: TeamUseCase) {}

  async add(req: Request, res: Response, next: NextFunction) {
    const param: Team = req.body;
    try {
      new Validator<Team>(param).blank().missing();
      const team = await this.teamUseCase.add(param);
      return res.status(201).json(team);
    } catch (error) {
      next(error);
    }
  }

  async search(req: Request, res: Response, next: NextFunction) {
    const { name, code }: TeamQueries = req.query;
    try {
      const teams = await this.teamUseCase.search({
        name,
        code,
      });
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const team = await this.teamUseCase.findOne(id);
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }

  async findByLeague(req: Request, res: Response, next: NextFunction) {
    const { leagueId } = req.params;
    try {
      const teams = await this.teamUseCase.findByLeague(leagueId);
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }
}
