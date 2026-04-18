import { IsNotEmpty, IsInt } from "class-validator";

export class FollowDto {
  @IsNotEmpty()
  @IsInt()
  followedid!: number;
}