/* istanbul ignore file */

import React, { Component } from 'react';
import {
  DayPilotCalendar,
  DayPilotNavigator,
} from '@daypilot/daypilot-lite-react';
import { config } from '../../Constants';

const styles = {
  left: {
    marginRight: '10px',
  },
  main: {
    flexGrow: '1',
  },
};

class EventCalendar extends Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
    this.state = {
      viewType: 'Week',
      durationBarVisible: false,
    };
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  getUpdatedEvents = () => {
    fetch(config.url + '/api/user', {
      method: 'PATCH',
      body: JSON.stringify(this.props.user.user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
        throw new Error('failed to fetch events');
      })
      .then((responseJson) => {
        const events = responseJson?.events.map((event, idx) => {
          return {
            id: idx,
            text: event[0],
            start: event[1],
            end: event[2],
          };
        });
        console.log(events);
        this.calendar.update({ events });
      });
  };

  componentDidMount() {
    setTimeout(() => {
      if (this.props.user?.authenticated) {
        this.getUpdatedEvents();
      }
      if (this.props.groups) {
        const events = this.props.events;
        this.calendar.update({ events });
      }
    }, 500);
  }

  render() {
    const { ...config } = this.state;
    return (
      <div
        style={{
          display: 'flex',
          marginTop: this.props.groups ? null : '2vh',
          marginLeft: !this.props.groups ? null : '2vw',
        }}
      >
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={'week'}
            showMonths={2}
            skipMonths={2}
            onTimeRangeSelected={(args) => {
              this.calendar.update({
                startDate: args.day,
              });
            }}
          />
        </div>
        <div style={styles.main}>
          <DayPilotCalendar
            eventMoveHandling="Disabled"
            {...config}
            ref={this.calendarRef}
          />
        </div>
      </div>
    );
  }
}

export default EventCalendar;
