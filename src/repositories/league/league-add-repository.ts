import { prisma } from '../../infra';
import { League } from '../../entities';
import { LeagueAddInterface } from '../../interfaces/league';
import { HttpException } from '../../errors';

export class LeagueAddRepository implements LeagueAddInterface {
  async add(lgParam: League): Promise<League> {
    try {
      if (lgParam.countryId) {
        const countryExists = await prisma.team.findUnique({
          where: {
            id: lgParam.countryId!,
          },
        });
        if (!countryExists) {
          throw new HttpException(404, 'country id not valid.');
        }
      }

      const league = await prisma.league.create({
        data: {
          name: lgParam.name,
          logo: lgParam.logo,
          season: lgParam.season,
          type: lgParam.type,
          numberOfRounds: lgParam.numberOfRounds,
          rounds: lgParam.rounds,
          countryId: lgParam.countryId,
        },
      });
      return league;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
