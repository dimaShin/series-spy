export default class ScheduleController {
  constructor($injector) {
    'ngInject';
    this.user = $injector.get('user');
    this.schedule = this.user.schedule;
  }

  save() {
    if (this.schedule._id) {
      return this.schedule.$save();
    }

    return this.user.scheduleResourse.add({ time: this.schedule.time });
  }
}
