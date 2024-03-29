import { Router } from 'express';
import {
  LeagueAddRepository,
  LeagueSearchRepository,
  LeagueFindoneRepository,
  LeagueFindbyCountryRepository,
} from '../repositories/league';
import { LeagueUseCase } from '../use-cases';
import { LeagueController } from '../controllers';

export class LeagueRoutes {
  public router: Router;
  private leagueController: LeagueController;

  constructor() {
    this.router = Router();
    const leagueAddRepository = new LeagueAddRepository();
    const leagueSearchRepository = new LeagueSearchRepository();
    const leagueFindoneRepository = new LeagueFindoneRepository();
    const leagueFindbyCountryRepository = new LeagueFindbyCountryRepository();
    const leagueUseCase = new LeagueUseCase(
      leagueAddRepository,
      leagueSearchRepository,
      leagueFindoneRepository,
      leagueFindbyCountryRepository
    );
    this.leagueController = new LeagueController(leagueUseCase);
    this.initRoutes();
  }

  initRoutes() {
    this.router.post(
      '/',
      this.leagueController.add.bind(this.leagueController)
    );
    this.router.get(
      '/',
      this.leagueController.search.bind(this.leagueController)
    );
    this.router.get(
      '/:id',
      this.leagueController.findOne.bind(this.leagueController)
    );
    this.router.get(
      '/:countryId/country',
      this.leagueController.findbyCountry.bind(this.leagueController)
    );
  }
}
