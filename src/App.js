import React from 'react';
import { Button, Row, Col } from 'antd';


function App() {
  return (
    <Row justify='center' style={{marginTop: '40px'}}>
      <Col span={8} style={{textAlign: 'center'}}>
        <div>
          Olá, mundo!
        </div>

        <div>
          <Button type='primary'>Clique em mim!</Button>
        </div>
      </Col>
    </Row>
  );
}

export default App;
