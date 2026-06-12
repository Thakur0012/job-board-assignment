import {
  IsString,
  Length,
  IsIn,
} from 'class-validator';

export class CreateJobDto {
  @IsString()
  @Length(3, 80)
  title: string;

  @IsString()
  @Length(2, 60)
  location: string;

  @IsString()
  @IsIn([
    'Full-Time',
    'Part-Time',
    'Contract',
  ])
  type: string;
}