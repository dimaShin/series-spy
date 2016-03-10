export default class JobController {
  constructor($injector) {
    'ngInject';
    this.job.all = true;
    this.job.weekend = true;
    this.job.weekdays = true;
    this.weekend = [ 'sat', 'sun' ];
    this.weekdays = [ 'mon', 'tue', 'wed', 'thu', 'fri' ];
    this.selectAll();
  }

  selectAll() {
    this.selectWeekDays(this.job.all);
    this.selectWeekend(this.job.all);

    this.job.weekend = this.job.weekdays = this.job.all;
  }

  selectWeekend(state) {
    this.weekend.forEach(day => this.job[day] = state);

    if (state && this.job.weekdays) {
      this.job.all = true;
    } else if (!state) {
      this.job.all = false;
    }
  }

  selectWeekDays(state) {
    this.weekdays.forEach(day => this.job[day] = state);

    if (state && this.job.weekend) {
      this.job.all = true;
    } else if (!state) {
      this.job.all = false;
    }
  }
}
