import React, { useState } from 'react'
import { Table, Row, Col } from 'antd'
import ModalCus from '../Modal/Modal'
import resourceManagementSystem from 'src/apis/resourceManagementSystem.api'
import { useMutation, useQuery } from '@tanstack/react-query'

import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai'
import { Button, Popconfirm } from 'antd';
import { toast } from 'react-toastify'
// https://stackblitz.com/run?file=demo.tsx
const TableCus = () => {
  const [hasFetchedTotal, setHasFetchedTotal] = useState(false);
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState(1)
  const [pageSize, setpageSize] = useState(5)
  const [total, setTotal] = useState(0)
  const { data: List, refetch } = useQuery({
    queryKey: ['List ', { current, pageSize }],
    queryFn: () => {
      const query = { current, pageSize }
      return resourceManagementSystem.getList(query)
    },
    keepPreviousData: true,
    // staleTime: 3 * 60 * 1000,
    onSuccess: (data: any) => {

      if (!hasFetchedTotal) {
        setTotal(data.paging.total);
        setHasFetchedTotal(true);
      }
    }
  })
  console.log('render');

  const deleteUser = useMutation({
    mutationFn: resourceManagementSystem.deleteUser,
    onSuccess: (data: any) => {
      refetch()
      toast.success(data.message, {
        position: 'top-center',
        autoClose: 1000
      })


    }
  })
  const handleDeleteUser = (id: any) => {

    deleteUser.mutate(id)
  }
  const columns: any = [
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
      render: (text: any, record: any, index: any) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid

        <button
          className='text-blue-600'
          onClick={() => {
            console.log(record.id)

            handleRowClick(record)
            setOpen(true)
          }}
        >
          {text}
        </button>
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
    },
    {
      title: 'Action',
      render: (text: any, record: any, index: any) => (
        <div className='flex'>

          <Popconfirm
            placement='leftTop'
            title="Xác nhận xóa User"
            description={`Bạn có chắc muốn xóa user có ID là ${record.id} ?`}
            okText={
              <p className='text-blue-500 hover:text-white'>Xác nhận</p>
            }
            onConfirm={() => handleDeleteUser(record.id)}
            cancelText="Hủy"
          >
            <AiTwotoneDelete
              className='mr-2 cursor-pointer text-red-500'
              onClick={() => {
                console.log('hello')
              }}
            />
          </Popconfirm>

          <AiTwotoneEdit className='mr-2 cursor-pointer text-yellow-500' />
        </div>
      )
    }
  ]
  const data = List?.data.map((data) => {
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
  const onSelectChange = (newSelectedRowKeys: any) => {
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
        onSelect: (changeableRowKeys: any) => {
          let newSelectedRowKeys = []
          newSelectedRowKeys = changeableRowKeys.filter((_: any, index: any) => {
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
                dataSource={data}
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
