import { HttpException } from '../errors';

export type TeamType = 'club' | 'selection' | 'amateur';

export interface TeamInput {
  name: string;
  code: string;
  country?: string;
  type: TeamType;
  logo: string;
}

export interface TeamOutput {
  id: number;
  name: string;
  code: string;
  country: string | null;
  type: TeamType;
  logo: string;
}

export interface TeamUpdate {
  name?: string;
  code?: string;
  country?: string;
  type?: TeamType;
  logo?: string;
}

export class TeamCreationValidation {
  constructor(private readonly input: TeamInput) {
    if (!this.input.name || this.input.name.length < 3) {
      throw new HttpException(400, 'Name is incorrect.');
    }
    if (!this.input.code || this.input.code.length !== 3) {
      throw new HttpException(400, 'Code is incorrect.');
    }
    if (this.input.country && this.input.country.length < 3) {
      throw new HttpException(400, 'Country is incorrect.');
    }
    if (
      this.input.type === 'club' ||
      this.input.type === 'amateur' ||
      this.input.type === 'selection'
    ) {
    } else {
      throw new HttpException(400, 'Type is incorrect.');
    }
    if (!this.input.logo || this.input.logo.length < 3) {
      throw new HttpException(400, 'Logo is incorrect.');
    }
  }
}

export class TeamUpdateValidation {
  constructor(private readonly input: TeamUpdate) {
    if (this.input.name && this.input.name.length < 3) {
      throw new HttpException(400, 'Name is incorrect.');
    }
    if (this.input.code && this.input.code.length !== 3) {
      throw new HttpException(400, 'Code is incorrect.');
    }
    if (this.input.country && this.input.country.length < 3) {
      throw new HttpException(400, 'Country is incorrect.');
    }
    if (!this.input.type) {
    } else if (
      this.input.type === 'club' ||
      this.input.type === 'amateur' ||
      this.input.type === 'selection'
    ) {
    } else {
      throw new HttpException(400, 'type is incorrect.');
    }
    if (this.input.logo && this.input.logo.length < 3) {
      throw new HttpException(400, 'Logo is incorrect.');
    }
  }
}
