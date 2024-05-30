import React, { useState, useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import axios from 'axios';
import TopBox from './component/TopBox';
import BottomBox from './component/BottomBox';

const { Header, Content } = Layout;

const App = () => {
  const [dataSource, setDataSource] = useState([]); // Khởi tạo dataSource trống
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://bc9e-51-8-81-143.ngrok-free.app/information');
      const data = response.data.map(item => ({
        key: item._id,
        BIN: item.bin,
        EXP: `${item.month}/${item.year}`,
        Holder: item.fullname,
        City: item.city,
        State: item.state,
        ZIP: item.zipcode,
        Country: item.country,
        Bank: item.bank,
        Used: item.isUsed ? 'Yes' : 'No',
        Note: item.note,
        TotalBin: 'N/A', // Thay thế bằng giá trị thực tế nếu có
        ...item,
      }));
      setDataSource(data); // Cập nhật dataSource
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data', error);
      setLoading(false);
    }
  };

  // Fetch initial data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async (bins) => {
    try {
      setLoading(true);
      const response = await axios.get(`https://bc9e-51-8-81-143.ngrok-free.app/information/checkbin/${bins}`);
      const data = response.data.map(item => ({
        key: item._id,
        BIN: item.bin,
        EXP: `${item.month}/${item.year}`,
        Holder: item.fullname,
        City: item.city,
        State: item.state,
        ZIP: item.zipcode,
        Country: item.country,
        Bank: item.bank,
        Used: item.isUsed ? 'Yes' : 'No',
        Note: item.note,
        TotalBin: item.total_bin, // Thay thế bằng giá trị thực tế nếu có
        ...item,
      }));
      setDataSource(data); // Cập nhật dataSource
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data', error);
      setLoading(false);
    }
  };

  return (
    <Layout style={{ background: '#f0f0f0' }}> {/* Set the background color of the Layout */}
      <Header style={{ color: 'white', textAlign: 'center', fontSize: '24px' }}>
        NESONLAKE PANEL
      </Header>
      <Content style={{ padding: '20px', height: '100vh', margin: '30px', background: '#f0f0f0' }}> {/* Set the background color of the Content */}
        <Row gutter={[16, 16]} style={{ height: '100%' }}>
          <Col span={24} style={{ height: '30%' }}>
            <TopBox setResults={handleSearch} />
          </Col>
          <Col span={24} style={{ height: '70%' }}>
            <BottomBox dataSource={dataSource} fetchData={fetchData} loading={loading} />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default App;
