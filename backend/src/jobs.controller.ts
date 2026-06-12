import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';

import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
  ) {}

  @Get()
  getJobs() {
    return this.jobsService.getJobs();
  }

  @Post()
  createJob(
    @Body() createJobDto: CreateJobDto,
  ) {
    return this.jobsService.createJob(
      createJobDto,
    );
  }
}