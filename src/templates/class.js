import React, { PureComponent } from 'react';
import { helpers } from '../common';
import { constants } from '../config';

export default class ClassTemplate extends PureComponent {
  render() {
    
    return (
      <span>
        {this.props.class.classes.flatMap(info => {
          const stInt = helpers.timeToInteger(info.date['start_time']);
          const etInt = helpers.timeToInteger(info.date['end_time']);
          const days = helpers.splitDays(info.date['weekdays']);
          return days.map(day => {
            return <div key={info.date['start_time'] + info.date['end_time'] + day}
                        className={this.props.styles['classBlock']}
                        style={{
                          top: `${((stInt - this.props.startTime) / 100) * 6}vh`,
                          left: `${(10 + 18 * (constants.days[day] || 0))}%`,
                          height: `${((etInt - stInt) / 100) * 6}vh`
                        }}>
              {this.props.class['title']} - {this.props.class['class_number']}
            </div>
          })
        })}
      </span>
    );
  }
};
