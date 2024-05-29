import React from 'react';
import { Card, Form, Input, Select, Button, Row, Col } from 'antd';
import './TopBox.css';

const { TextArea } = Input;
const { Option } = Select;

const TopBox = () => {
  return (
    <Card className="top-box" bordered>
      <Form layout="vertical">
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
            {/* <Form.Item label="Zip Code" name="zips" className="top-box-form-item">
              <Input placeholder="zip/zip list (,) comma sep" />
            </Form.Item>
            <Form.Item label="Exp Date" name="exp" className="top-box-form-item">
              <Input placeholder="YYMM" />
            </Form.Item> */}
          </Col>
          {/* <Col span={4}>
            <Form.Item label="Brand" name="brand" className="top-box-form-item">
              <Select placeholder="all brands">
                <Option value="">all brands</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Type" name="type" className="top-box-form-item">
              <Select placeholder="all types">
                <Option value="">all types</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Level" name="level" className="top-box-form-item">
              <Select placeholder="all levels">
                <Option value="">all levels</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Country" name="country" className="top-box-form-item">
              <Select placeholder="all country">
                <Option value="">all country</Option>
              </Select>
            </Form.Item>
            <Form.Item label="State" name="state" className="top-box-form-item">
              <Select placeholder="all states" disabled>
                <Option value="">all states</Option>
              </Select>
            </Form.Item>
            <Form.Item label="City" name="city" className="top-box-form-item">
              <Input placeholder="city" />
            </Form.Item>
          </Col> */}
          <Col span={4}>
            <Form.Item className="top-box-form-item">
              <Button type="danger" block>
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
