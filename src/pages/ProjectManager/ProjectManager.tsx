// Không có tính năng tree-shaking
// import { omit } from 'lodash'

// Import chỉ mỗi function omit

import { Helmet } from 'react-helmet-async'
import { Row, Col } from 'antd'

import TableProjectManager from './components/TableProjectManager'
import { useState } from 'react'

export default function ProjectManager() {
  const [selectedOption, setSelectedOption] = useState('option1')

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value)
  }
  console.log(selectedOption)

  return (
    <div className=''>
      <Helmet>
        <title>ResourceManagementSystem</title>
        <meta name='description' content='Đăng ký tài khoản vào dự án Shopee Clone' />
      </Helmet>
      <Row className='container'>
        <Col span={24}>
          <h1 className='text-3xl font-bold text-gray-800'>Danh sách dự án</h1>
        </Col>
      </Row>
      <div className='bg-neutral-100'>
        <div className='container'>
          <TableProjectManager />
        </div>
      </div>
    </div>
  )
}
