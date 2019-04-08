import React, { PureComponent } from 'react';
import { helpers } from '../common';

export default class TimetableTemplate extends PureComponent {
  render() {
    const timetable = [];
    for (let time = this.props.startTime; time < this.props.endTime; time += 100) {
      timetable.push(
        <div key={time} className={helpers.classNames(this.props.styles['row'], time % 100 === 0 ? this.props.styles['startHour'] : this.props.styles['endHour'])}>
          <div className={this.props.styles.time}>
            {helpers.integerToTime(time)}
          </div>
          
          <div className={this.props.styles['innerRow']}>
            
            <div className={this.props.styles['columnContainer']}>
              <div className={this.props.styles.column}/>
              <div className={this.props.styles.column}/>
              <div className={this.props.styles.column}/>
              <div className={this.props.styles.column}/>
              <div className={this.props.styles.column}/>
            </div>
            <div className={this.props.styles['columnContainer']}>
              <div className={this.props.styles.column}/>
              <div className={this.props.styles.column}/>
              <div className={this.props.styles.column}/>
              <div className={this.props.styles.column}/>
              <div className={this.props.styles.column}/>
            </div>
          
          </div>
        </div>
      );
    }
    return (<span>{timetable}</span>);
  }
};
