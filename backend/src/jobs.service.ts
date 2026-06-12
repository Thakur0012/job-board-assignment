import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  private jobs = [
    {
      id: 1,
      title: 'Frontend Developer',
      location: 'Pune',
      type: 'Full-Time',
      postedAt: '2026-06-01',
    },
    {
      id: 2,
      title: 'Backend Developer',
      location: 'Mumbai',
      type: 'Contract',
      postedAt: '2026-06-02',
    },
    {
      id: 3,
      title: 'React Developer',
      location: 'Bangalore',
      type: 'Part-Time',
      postedAt: '2026-06-03',
    },
    {
      id: 4,
      title: 'Node.js Developer',
      location: 'Delhi',
      type: 'Full-Time',
      postedAt: '2026-06-04',
    },
    {
      id: 5,
      title: 'Full Stack Developer',
      location: 'Hyderabad',
      type: 'Contract',
      postedAt: '2026-06-05',
    },
  ];

  getJobs() {
    return this.jobs;
  }

  createJob(createJobDto: CreateJobDto) {
    const newJob = {
      id: Date.now(),
      postedAt: new Date()
        .toISOString()
        .split('T')[0],
      ...createJobDto,
    };

    this.jobs.unshift(newJob);

    return newJob;
  }
}