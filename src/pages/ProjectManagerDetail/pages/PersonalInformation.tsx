import React, { useState } from 'react'
import { Table, Row, Col } from 'antd'
import { createSearchParams, useNavigate } from 'react-router-dom'
const PersonalInformation = () => {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
      render: (text: any, record: any) => (
        <a className='text-blue-600' href=''>
          {text}
        </a>
      )
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      sorter: true
    },
    {
      title: 'YOE',
      dataIndex: 'yoe',
      sorter: true
    },
    {
      title: 'Cấp bậc',
      dataIndex: 'rank',
      sorter: true
    },
    {
      title: 'Vị trí',
      dataIndex: 'location',
      sorter: true
    },
    {
      title: 'Ngôn ngữ lập trình',
      dataIndex: 'programmingLanguage',
      sorter: true
    },
    {
      title: 'Kỹ năng',
      dataIndex: 'skill',
      sorter: true
    }
  ]

  const data = [
    {
      key: '1',
      id: '1',
      name: 'Nguyễn Văn A',
      yoe: 2,
      rank: 'senior',
      location: 'dev',
      programmingLanguage: 'Reactjs',
      skill: 'teamwork'
    },
    {
      key: '2',
      id: '2',
      name: 'Nguyễn Văn A',
      yoe: 2,
      rank: 'senior',
      location: 'dev',
      programmingLanguage: 'Reactjs',
      skill: 'teamwork'
    },
    {
      key: '3',
      id: '3',
      name: 'Nguyễn Văn A',
      yoe: 2,
      rank: 'senior',
      location: 'dev',
      programmingLanguage: 'Reactjs',
      skill: 'teamwork'
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

export default PersonalInformation
