import React, { useState } from 'react'
import { Table, Row, Col } from 'antd'
import ModalCus from '../Modal/Modal'
import resourceManagementSystem from 'src/apis/resourceManagementSystem.api'
import { useQuery } from '@tanstack/react-query'

// https://stackblitz.com/run?file=demo.tsx
const TableCus = () => {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(1)
  const [pageSize, setpageSize] = useState(5)
  const [total, setTotal] = useState(0)
  const { data: List } = useQuery({
    queryKey: ['List ', { current, pageSize, total }],
    queryFn: () => {
      const query = { current, pageSize }
      return resourceManagementSystem.getList(query)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
    onSuccess: (data) => {
      // Update the total value here based on the received data
      setTotal(data.paging.total)
    }
  })
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
      render: (text, record) => (
        <a
          className='text-blue-600'
          onClick={() => {
            console.log(record.id)

            handleRowClick(record)
            setOpen(true)
          }}
        >
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
  const dataa = List?.data.map((data) => {
    return {
      key: data.id,
      id: data.id,
      name: data.fullName,
      yoe: data?.specs.expYears,
      rank: data?.specs.level.title,
      location: data?.position,
      programmingLanguage: data?.specs?.codeLangs
        .map((data) => {
          return data.name
        })
        .join(' ,'),
      skill: data?.specs?.techStack
    }
  })

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
      {List && (
        <>
          <Row gutter={[20, 20]} className='mt-4'>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={dataa}
                onChange={onChange}
                rowSelection={rowSelection}
                pagination={{
                  current: current,
                  pageSize: pageSize,
                  showSizeChanger: true,
                  total: total
                }}
              />
            </Col>
          </Row>
          <ModalCus open={open} setOpen={setOpen} />
        </>
      )}
    </>
  )
}

export default TableCus
