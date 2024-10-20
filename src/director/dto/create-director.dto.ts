export class CreateDirectorDto {
  readonly name: string;
  readonly surname: string;
  readonly description?: string;
  readonly birthday: string;
  readonly dateOfDeath?: string;
  readonly imgUrl: string;
  readonly placeOfBirth: string;
}
