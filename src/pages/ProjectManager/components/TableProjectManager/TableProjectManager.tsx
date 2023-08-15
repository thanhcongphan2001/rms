import React, { useState } from 'react'
import { Table, Row, Col } from 'antd'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import projectManager from 'src/apis/projectManager.api'
import { Divider, Space, Tag } from 'antd';
const TableProjectManager = () => {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(1)
  const [pageSize, setpageSize] = useState(5)
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()
  const { data: List, refetch } = useQuery({
    queryKey: ['ListProjectManager ', { current, pageSize }],
    queryFn: () => {
      const query = { current, pageSize }
      return projectManager.getprojectManager(query)
    },
    keepPreviousData: true,
    // staleTime: 3 * 60 * 1000,
    onSuccess: (data: any) => {
      console.log(data);

      setTotal(data.paging.total)
    }
  })
  const columns = [

    {
      title: 'Mã dự án',
      dataIndex: 'projectcode',
      sorter: true,
      render: (text, record) => (
        <button
          className='text-blue-600'
          onClick={() => {
            navigate(`/ProjectManager/${text}`)
          }}
        >
          {text}
        </button>
      )
    },
    {
      title: 'Tên dự án',
      dataIndex: 'projectname',
      sorter: true

    },
    {
      title: 'Loại dự án',
      dataIndex: 'projectype',
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
      sorter: true,
      render: (text, record) => (
        <Space size={[2, 'large']} wrap>
          <Tag bordered={false} color="processing">
            {text}
          </Tag>
        </Space>
      )
    }
  ]

  const data = List?.data.map((data) => {
    return {
      key: data.id,

      projectname: data.name,
      projectype: data.projectType,
      projectcode: data.id,
      time: data.startDate + ' - ' + data.endDate,
      price: data.biddingPackagePrice + ' tỷ',
      probability: data.probability + ' %',
      status: data.status
    }
  }
  )

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current)
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setpageSize(pagination.pageSize)
    }
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
          <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            rowSelection={rowSelection}
            pagination={{
              current: current,
              pageSize: pageSize,
              showSizeChanger: true,
              total: total
            }}
          />        </Col>
      </Row>
    </>
  )
}

export default TableProjectManager
