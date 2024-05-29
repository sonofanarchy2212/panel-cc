import React from 'react';
import { Card, Form, Input, Button, Row, Col, message } from 'antd';
import axios from 'axios';
import './TopBox.css';

const { TextArea } = Input;

const TopBox = ({ setResults }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const bins = values.bins.split('\n').join(',');
      const response = await axios.get(`http://localhost:3001/information/checkbin/${bins}`);
      setResults(response.data);
    } catch (error) {
      message.error('Failed to fetch data');
    }
  };

  return (
    <Card className="top-box" bordered>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16} justify="center">
          <Col span={6}>
            <Form.Item label="BIN/BIN List" name="bins" className="top-box-form-item">
              <TextArea
                rows={5}
                placeholder="BIN / BIN List. Comma (,) separated. i.e. 123456, 789098..."
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Bank" name="bank" className="top-box-form-item">
              <Input placeholder="bank name" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item className="top-box-form-item">
              <Button type="danger" block onClick={() => form.resetFields()}>
                Reset
              </Button>
            </Form.Item>
            <Form.Item className="top-box-form-item">
              <Button type="primary" htmlType="submit" block>
                <span>Search</span>
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default TopBox;
