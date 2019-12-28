
const db = require('./connect')
function Procuct(procuct) {
  this.id = procuct.id;
  this.add_time = procuct.add_time;
  this.work_date = procuct.work_date;
  this.content = procuct.content;
  this.plane = procuct.plane;
  this.commit_id = procuct.commit_id;
  this.low_id = procuct.low_id;
  this.next_id = procuct.next_id;
  this.state = procuct.state;

}


module.exports = Procuct;
