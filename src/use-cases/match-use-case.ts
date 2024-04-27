import {
  MatchAddInterface,
  MatchDeleteInterface,
  MatchFindByLeagueInterface,
  MatchFindByTeamInterface,
  MatchGroupByDatesInterface,
  MatchRescheduledInterface,
  MatchUpdateScoresInterface,
} from '../interfaces/match';
import { MatchInput, MatchQueries, MatchScores } from '../entities';

export class MatchUseCase
  implements
    MatchAddInterface,
    MatchFindByLeagueInterface,
    MatchFindByTeamInterface,
    MatchUpdateScoresInterface,
    MatchGroupByDatesInterface,
    MatchDeleteInterface,
    MatchRescheduledInterface
{
  constructor(
    private addFxRepo: MatchAddInterface,
    private findByLeagueRepo: MatchFindByLeagueInterface,
    private findByTeamRepo: MatchFindByTeamInterface,
    private updateScoresRepo: MatchUpdateScoresInterface,
    private groupByDateRepo: MatchGroupByDatesInterface,
    private deleteRepo: MatchDeleteInterface,
    private rescheduledRepo: MatchRescheduledInterface
  ) {}

  async add(fixture: MatchInput) {
    const result = await this.addFxRepo.add(fixture);
    return result;
  }

  async findByLeague(fxQuery: MatchQueries) {
    const result = await this.findByLeagueRepo.findByLeague(fxQuery);
    return result;
  }

  async findByTeam(fxQuery: MatchQueries) {
    const result = await this.findByTeamRepo.findByTeam(fxQuery);
    return result;
  }

  async updateScores(fxUpdateScores: MatchScores) {
    const result = await this.updateScoresRepo.updateScores(fxUpdateScores);
    return result;
  }

  async groupByDates() {
    const result = await this.groupByDateRepo.groupByDates();
    return result;
  }

  async delete(id: number) {
    const result = await this.deleteRepo.delete(id);
    return result;
  }

  async reschedule(id: number, startDate: string) {
    const result = await this.rescheduledRepo.reschedule(id, startDate);
    return result;
  }
}