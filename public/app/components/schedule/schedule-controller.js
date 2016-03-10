export default class ScheduleController {
  constructor($injector) {
    'ngInject';
    this.user = $injector.get('user');
  }

  addJob() {
    const job = this.user.jobsResourse.add({});
    this.user.jobs.push(job);
  }
}
