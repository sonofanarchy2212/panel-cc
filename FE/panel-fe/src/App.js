import React from 'react';
import { Layout, Row, Col } from 'antd';
import TopBox from './component/TopBox';
import BottomBox from './component/BottomBox';

const { Header, Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Header style={{ color: 'white', textAlign: 'center', fontSize: '24px' }}>
        Dashboard
      </Header>
      <Content style={{ padding: '20px', height: '100vh' }}>
        <Row gutter={[16, 16]} style={{ height: '100%' }}>
          <Col span={24} style={{ height: '30%' }}>
            <TopBox />
          </Col>
          <Col span={24} style={{ height: '70%' }}>
            <BottomBox />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default App;
