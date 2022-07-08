import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsOptional()
  readonly lastViewedArticleId?: string;
}
