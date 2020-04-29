import React from 'react';
import { Row, Col, Typography, Divider } from 'antd';
import {Sensors} from './Sensors';


function App() {
  return (
    <Row justify='center' style={{marginTop: '40px'}}>
      <Col span={16}>
        <Row>
          <Typography.Title>
            Estação monitoramento - Vacatronics
          </Typography.Title>
        </Row>

        <Row>
          <Divider />
        </Row>

        <Row>
          <Sensors />
        </Row>
      </Col>
    </Row>
  );
}

export default App;
