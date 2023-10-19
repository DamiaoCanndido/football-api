import { test, expect, describe, beforeEach } from 'vitest';
import { Team } from '../../src/entities';

describe('Team entity', () => {
  let data: Team;
  beforeEach(() => {
    data = {
      name: 'Brasil',
      code: 'BRA',
      isCountry: true,
      logo: 'brazil.png',
    };
  });

  test('should create only with team data', () => {
    const sut = new Team(data.name, data.code, data.isCountry, data.logo);
    expect(sut).toEqual(data);
  });

  test('should return an empty name exception', () => {
    data.name = '';
    function name(team: Team) {
      new Team(team.name, team.code, team.isCountry, team.logo);
    }
    expect(() => name(data)).toThrowError('Name is incorrect.');
  });

  test('should return an empty code exception', () => {
    data.code = '';
    function code(team: Team) {
      new Team(team.name, team.code, team.isCountry, team.logo);
    }
    expect(() => code(data)).toThrowError('Code is incorrect.');
  });

  test('should return an empty country exception', () => {
    const data = {
      name: 'Brasil',
      code: 'BRA',
      isCountry: null,
      logo: 'brazil.png',
    };
    function country(team: any) {
      new Team(team.name, team.code, team.isCountry, team.logo);
    }
    expect(() => country(data)).toThrowError('isCountry is incorrect.');
  });

  test('should return an empty logo exception', () => {
    data.logo = '';
    function logo(team: Team) {
      new Team(team.name, team.code, team.isCountry, team.logo);
    }
    expect(() => logo(data)).toThrowError('Logo is incorrect.');
  });
});