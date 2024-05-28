import React from 'react';
import { Card, Table, Tag, Space, Pagination } from 'antd';

const { Column } = Table;

const BottomBox = () => {
  const dataSource = [
    {
      key: '1',
      BIN: '523914',
      EXP: '05/2024',
      Holder: 'Esrher',
      City: 'Woodstock',
      State: 'GA',
      ZIP: '30188-3757',
      Country: 'United States',
      Bank: 'CAPITAL ONE, NATIONAL ASSOCIATION',
      Price: '$27',
    },
    {
      key: '2',
      BIN: '440393',
      EXP: '11/2024',
      Holder: 'Marisa',
      City: 'Marrero',
      State: 'Louisiana',
      ZIP: '70072',
      Country: 'United States',
      Bank: 'SUTTON BANK',
      Price: '$27',
    },
    // Add more data objects here...
  ];

  return (
    <Card>
      <Table dataSource={dataSource} pagination={false}>
        <Column title="BIN" dataIndex="BIN" key="BIN" />
        <Column title="EXP" dataIndex="EXP" key="EXP" />
        <Column title="Holder" dataIndex="Holder" key="Holder" />
        <Column title="City" dataIndex="City" key="City" />
        <Column title="State" dataIndex="State" key="State" />
        <Column title="ZIP" dataIndex="ZIP" key="ZIP" />
        <Column title="Country" dataIndex="Country" key="Country" />
        <Column title="Bank" dataIndex="Bank" key="Bank" />
        <Column
          title="Price"
          dataIndex="Price"
          key="Price"
          render={(text, record) => (
            <Space size="middle">
              {text}
              <a href="#">Buy</a>
            </Space>
          )}
        />
      </Table>
      <Pagination
        className="mt-2"
        defaultCurrent={1}
        total={30}
        showQuickJumper
      />
    </Card>
  );
};

export default BottomBox;
