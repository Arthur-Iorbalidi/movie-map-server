export class CreateDirectorDto {
  readonly name: string;
  readonly surname: string;
  readonly description?: string;
  readonly birthday: string;
  readonly dateOfDeath?: string;
  readonly image?: string;
  readonly placeOfBirth: string;
}
