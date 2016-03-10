import _ from 'lodash';

export default class JobController {
  constructor($injector) {
    'ngInject';

    this.user = $injector.get('user');

    this.job.all = true;
    this.job.weekend = true;
    this.job.weekdays = true;
    this.weekend = [ 'sat', 'sun' ];
    this.weekdays = [ 'mon', 'tue', 'wed', 'thu', 'fri' ];
    this.selectAll();
    this.modal = $injector.get('modal');
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

  selectDay(day) {
    this.job.save();
  }

  save(job) {
    return job.$save();
  }

  delete() {

    this.modal.open({
      plain: true,
      template: '<confirm-modal ' +
      'dismiss="this.dismiss"' +
      'close="this.close"' +
      'message="this.message"' +
      '></confirm-modal>',
      message: `Are you sure you want to delete this job?`
    }).then(() => {

      this.user.jobsResourse.delete(this.job);
      _.remove(this.user.jobs, { _id: this.job._id });
    }).catch(() => {
      console.log('modal dismissed');
    });
  }
}
