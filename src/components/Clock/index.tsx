import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import CSS from 'csstype';
import { Row, Col, Button } from 'antd';

import { calcOfsetDate } from '../../utils/calcOfsetDate';
import styles from './index.module.scss';

interface ClockProps {
  name: string;
  timezone: number;
  id: string;
  onDelete(id: string): void;
}

export const Clock: React.FC<ClockProps> = ({ name, timezone, id, onDelete }) => {
  const [date, setDate] = useState<Date>(calcOfsetDate(timezone));

  const secondsRatio = date.getSeconds() / 60;
  const minutesRatio = (secondsRatio + date.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + date.getHours()) / 12;

  const secondsStyle: CSS.Properties = {
    transform: `translateX(-50%) rotate(${secondsRatio * 360}deg)`,
  };
  const minutesStyle: CSS.Properties = {
    transform: `translateX(-50%) rotate(${minutesRatio * 360}deg)`,
  };
  const hourStyle: CSS.Properties = {
    transform: `translateX(-50%) rotate(${hoursRatio * 360}deg)`,
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(calcOfsetDate(timezone));
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  });

  return (
    <div className={classNames(styles.clock__wrapper)}>
      <Row>
        <Col span={12}>
          <h2>{name || `UTC + ${timezone}`}</h2>
        </Col>
        <Col span={12} className={styles.dell__btn}>
          <Button
            type='primary'
            shape='circle'
            onClick={() => {
              onDelete(id);
            }}>
            X
          </Button>
        </Col>
      </Row>

      <div className={classNames(styles.clock)}>
        <div className={classNames(styles.hand, styles.hour)} style={hourStyle}></div>
        <div className={classNames(styles.hand, styles.minute)} style={minutesStyle}></div>
        <div className={classNames(styles.hand, styles.second)} style={secondsStyle}></div>
        {[...Array(12)].map((_, i) => (
          <div key={i} className={classNames(styles.number, styles[`number${i + 1}`])}>
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};