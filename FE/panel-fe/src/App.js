import React from 'react';
import { Layout, Row, Col } from 'antd';
import TopBox from './component/TopBox';
import BottomBox from './component/BottomBox';

const { Header, Content } = Layout;

const App = () => {
  return (
    <Layout style={{ background: '#f0f0f0' }}> {/* Set the background color of the Layout */}
      <Header style={{ color: 'white', textAlign: 'center', fontSize: '24px' }}>
        NESONLAKE PANEL
      </Header>
      <Content style={{ padding: '20px', height: '100vh', margin: '30px', background: '#f0f0f0' }}> {/* Set the background color of the Content */}
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
