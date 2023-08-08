import React from 'react'
import { Col, Row, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import PersonalInformation from './pages/PersonalInformation'
import ProjectInformation from './pages/ProjectInformation'
import Text from './pages/Text'
const onChange = (key: string) => {
  console.log(key)
}

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Thông tin dự án`,
    children: <ProjectInformation />
  },
  {
    key: '2',
    label: `Thông tin nhân sự`,
    children: <PersonalInformation />
  }
]
export default function ProjectManagerDetail() {
  return (
    <>
      <Row className='container'>
        <Col span={24}>
          <h1 className='text-3xl font-bold text-gray-800'>Thông tin dự án</h1>
        </Col>
      </Row>
      <div className='bg-neutral-100'>
        <div className='container'>
          <Row className='mt-4'>
            <Col span={24}>
              <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
            </Col>
          </Row>
        </div>
      </div>
    </>
  )
}
