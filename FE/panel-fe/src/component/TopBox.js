import React from 'react';
import { Card, Form, Input, Select, Button, Row, Col } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

const TopBox = () => {
  return (
    <Card className="top-box" bordered>
      <Form layout="vertical">
        <Row gutter={16} justify="center">
          <Col span={6}>
            <Form.Item label="BIN/BIN List" name="bins">
              <TextArea
                rows={5}
                placeholder="BIN / BIN List. Comma (,) separated. i.e. 123456, 789098..."
              />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Bank" name="bank">
              <Input placeholder="bank name" />
            </Form.Item>
            <Form.Item label="Zip Code" name="zips">
              <Input placeholder="zip/zip list (,) comma sep" />
            </Form.Item>
            <Form.Item label="Exp Date" name="exp">
              <Input placeholder="YYMM" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Brand" name="brand">
              <Select placeholder="all brands">
                <Option value="">all brands</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Type" name="type">
              <Select placeholder="all types">
                <Option value="">all types</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Level" name="level">
              <Select placeholder="all levels">
                <Option value="">all levels</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Country" name="country">
              <Select placeholder="all country">
                <Option value="">all country</Option>
              </Select>
            </Form.Item>
            <Form.Item label="State" name="state">
              <Select placeholder="all states" disabled>
                <Option value="">all states</Option>
              </Select>
            </Form.Item>
            <Form.Item label="City" name="city">
              <Input placeholder="city" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Button type="danger" block>
                Reset
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="bi bi-search"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
                  </svg>
                  Search
                </span>
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default TopBox;
