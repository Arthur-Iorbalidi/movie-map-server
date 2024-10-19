export class CreateActorDto {
  readonly name: string;
  readonly surname: string;
  readonly description?: string;
  readonly height: number;
  readonly birthday: string;
  readonly dateOfDeath?: string;
  readonly imgUrl: string;
  readonly placeOfBirth: string;
}
