import React, { useState } from 'react'
import { Table, Row, Col } from 'antd'
import { createSearchParams, useNavigate } from 'react-router-dom'
const TableProjectManager = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
      render: (text, record) => (
        <a
          className='text-blue-600'
          onClick={() => {
            navigate(`/ProjectManager/${text}`)
          }}
        >
          {text}
        </a>
      )
    },
    {
      title: 'Mã dự án',
      dataIndex: 'projectcode',
      sorter: true
    },
    {
      title: 'Tên dự án',
      dataIndex: 'projectname',
      sorter: true
    },
    {
      title: 'Loại dự án',
      dataIndex: 'projecttype',
      sorter: true
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      sorter: true
    },
    {
      title: 'Gía gói thầu',
      dataIndex: 'price',
      sorter: true
    },
    {
      title: 'Xác suất thầu',
      dataIndex: 'probability',
      sorter: true
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      sorter: true
    }
  ]

  const data = [
    {
      key: '1',
      id: '1',
      projectcode: 1,
      projectname: 'RMS',
      projecttype: 'web',
      time: '20-11-2021 - 20/11-2023',
      price: '1 tỷ',
      probability: '90%',
      status: 'chưa có'
    },
    {
      key: '2',
      id: '2',
      projectcode: '1',
      projectname: 'RMS',
      projecttype: 'web',
      time: '20-11-2021 - 20/11-2023',
      price: '1 tỷ',
      probability: '90%',
      status: 'chưa có'
    },
    {
      key: '3',
      id: '3',
      projectcode: '1',
      projectname: 'RMS',
      projecttype: 'web',
      time: '20-11-2021 - 20/11-2023',
      price: '1 tỷ',
      probability: '90%',
      status: 'chưa có'
    }
  ]

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys)
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = []
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false
            }
            return true
          })
          setSelectedRowKeys(newSelectedRowKeys)
        }
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = []
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true
            }
            return false
          })
          setSelectedRowKeys(newSelectedRowKeys)
        }
      }
    ]
  }
  const handleRowClick = (record) => {
    // Xử lý sự kiện onClick trên từng hàng ở đây
    console.log('Row clicked:', record)
  }
  return (
    <>
      <Row gutter={[20, 20]} className='mt-4'>
        <Col span={24}>
          <Table columns={columns} dataSource={data} onChange={onChange} rowSelection={rowSelection} />
        </Col>
      </Row>
    </>
  )
}

export default TableProjectManager
