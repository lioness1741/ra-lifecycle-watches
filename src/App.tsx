import React, { useState } from 'react';
import { Layout, Typography, Row, Col } from 'antd';
import { nanoid } from 'nanoid';

import { AddForm } from './components/AddForm';
import { Clock } from './components/Clock';

import { DATA } from './data';
import './app.scss';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

interface IClock {
  id: string;
  name: string;
  timezone: number;
}

export const App: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [timezone, setTimezone] = useState<number>(0);
  const [clocks, setClocks] = useState<IClock[]>([]);

  const setTimezoneHandler = (tz: number) => {
    if (tz < -4) return;
    setTimezone(tz);
  };
  const setNameHandler = (name: string) => {
    setName(name);
  };
  const addHandler = () => {
    const newClock: IClock = {
      id: nanoid(),
      name,
      timezone,
    };
    setClocks((prevState) => [...prevState, newClock]);
    setName('');
    setTimezone(0);
  };
  const deleteHandler = (id: string) => {
    setClocks((prevState) => prevState.filter((clock) => clock.id !== id));
  };
  return (
    <Layout>
      <Header className='app-header'>
        <Title level={4}>
          <Text type='secondary'>{DATA.task.title}</Text>
        </Title>
      </Header>
      <Content className='app-content'>
        <Row className='app-form'>
          <Col span={12} offset={6}>
            <AddForm onAdd={addHandler} nameValue={name} timezoneValue={timezone} onSetTimezone={setTimezoneHandler} onSetName={setNameHandler} />
          </Col>
        </Row>
        <Row className='container'>
          {clocks.map((clock) => (
            <Col key={clock.id} span={6} className='mb-3'>
              <Clock id={clock.id} name={clock.name} timezone={clock.timezone} onDelete={deleteHandler} />
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};
