export default class ScheduleController {
  constructor($injector) {
    'ngInject';
    this.user = $injector.get('user');
  }

  addJob() {
    const job = this.user.jobsResourse.add({
      weekdays: true,
      weekend: true,
      time: '2:12'
    });
    this.user.jobs.push(job);
  }
}
