import { prisma } from '../../infra';
import { FixturesFindByTeamInterface } from '../../interfaces/fixtures';
import { FixturesQueries, FixturesOutput } from '../../entities';
import { HttpException } from '../../errors';

export class FixturesFindByTeamRepository
  implements FixturesFindByTeamInterface
{
  async findByTeam({
    teamId,
    leagueId,
  }: FixturesQueries): Promise<FixturesOutput[]> {
    try {
      const fixtures = await prisma.fixtures.findMany({
        where: {
          OR: [{ homeId: teamId }, { awayId: teamId }],
          leagueId,
        },
        include: {
          home: true,
          away: true,
        },
        orderBy: [{ fullTime: 'asc' }, { startDate: 'asc' }],
      });
      if (fixtures.length === 0) {
        throw new HttpException(404, 'team id or round not valid.');
      }
      return fixtures;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new HttpException(error.status, error.message);
      }
      throw new HttpException(400, 'Database error.');
    }
  }
}
