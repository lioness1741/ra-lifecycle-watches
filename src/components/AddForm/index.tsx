import React from 'react';
import { Button, Input, Row, Col } from 'antd';
import styles from './index.module.scss';

interface AppFormProps {
  onSetName(name: string): void;
  onSetTimezone(tz: number): void;
  onAdd(): void;
  nameValue: string;
  timezoneValue: number;
}
export const AddForm: React.FC<AppFormProps> = ({ onAdd, onSetName, onSetTimezone, nameValue, timezoneValue }) => {
  const nameChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.value;
    onSetName(name);
  };
  const timezoneChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const tz = Number.parseInt(evt.target.value, 10);
    onSetTimezone(tz);
  };
  const addHandler = () => {
    onAdd();
  };
  return (
    <Row className={styles.add_form_wrapper}>
      <Col span={9}>
        <Input type='text' value={nameValue} onChange={nameChangeHandler} />
      </Col>
      <Col span={9} offset={1}>
        <Input type='number' max={14} min={-12} value={timezoneValue} onChange={timezoneChangeHandler} />
      </Col>
      <Col span={4} offset={1}>
        <Button type='primary' htmlType='button' onClick={addHandler}>
          Add
        </Button>
      </Col>
    </Row>
  );
};
