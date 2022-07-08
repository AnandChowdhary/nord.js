import { IsNotEmpty, IsString, MinLength } from "@nordjs/validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  /** First name of the users */
  firstName: string;
}
