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
                        className={helpers.classNames(this.props.styles['classBlock'], this.props.pinned ? this.props.styles['pinned'] : '')}
                        onClick={() => this.props.togglePinClass(this.props.class)}
                        style={{
                          top: `${((stInt - this.props.startTime) / 100) * 6}vh`,
                          left: `${(10 + 18 * (constants.days[day] || 0))}%`,
                          height: `${((etInt - stInt) / 100) * 6}vh`
                        }}>
              <span>
              {this.props.class['subject']}{this.props.class['catalog_number']}
              </span>
              <span>
              {this.props.class['section']}
              </span>
            </div>
          })
        })}
      </span>
    );
  }
};
