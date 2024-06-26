import { Request, Response, NextFunction } from 'express';
import { TeamUseCase } from '../use-cases';
import {
  TeamCreationValidation,
  TeamUpdateValidation,
  TeamInput,
  TeamQueries,
  TeamUpdate,
} from '../entities';

export class TeamController {
  constructor(private teamUseCase: TeamUseCase) {}

  // POST: /team
  async add(req: Request, res: Response, next: NextFunction) {
    const param: TeamInput = req.body;
    try {
      new TeamCreationValidation(param);
      const team = await this.teamUseCase.add(param);
      return res.status(201).json(team);
    } catch (error) {
      next(error);
    }
  }

  // GET: /team?name=&country=%type=
  async search(req: Request, res: Response, next: NextFunction) {
    const { name, type, country, p }: TeamQueries = req.query;
    try {
      const teams = await this.teamUseCase.search({
        name,
        type,
        country,
        p,
      });
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  // GET: /team/:id
  async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const team = await this.teamUseCase.findOne(Number(id));
      return res.status(200).json(team);
    } catch (error) {
      next(error);
    }
  }

  // GET: /team/:leagueId/league
  async findByLeague(req: Request, res: Response, next: NextFunction) {
    const { leagueId } = req.params;
    try {
      const teams = await this.teamUseCase.findByLeague(Number(leagueId));
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  // PUT: /team/:id
  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const params: TeamUpdate = req.body;
    try {
      new TeamUpdateValidation(params);
      const teams = await this.teamUseCase.update(Number(id), params);
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }

  // DELETE: /team/:id
  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const teams = await this.teamUseCase.delete(Number(id));
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  }
}
