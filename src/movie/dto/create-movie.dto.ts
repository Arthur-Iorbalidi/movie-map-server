export class CreateMovieDto {
  readonly tittle: string;
  readonly description?: string;
  readonly creationDate: string;
  readonly genre: string;
  readonly logoUrl?: string;
  readonly budget: string;
}
