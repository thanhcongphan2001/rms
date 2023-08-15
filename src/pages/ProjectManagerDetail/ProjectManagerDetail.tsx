import React from 'react'
import { Col, Row, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import PersonalInformation from './pages/PersonalInformation'
import ProjectInformation from './pages/ProjectInformation'
import Text from './pages/Text'
import { useQuery } from '@tanstack/react-query'
import projectManager from 'src/apis/projectManager.api'
import { useParams } from 'react-router-dom'
const onChange = (key: string) => {
  console.log(key)
}


export default function ProjectManagerDetail() {
  const { id } = useParams();
  console.log(id);
  const { data: ListProjectManagerDetail, refetch } = useQuery({
    queryKey: ['ListProjectManagerDetail ', id],
    queryFn: () => {

      return projectManager.getprojectManagerDetail(id)
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
    onSuccess: (data: any) => {
      console.log(data);


    }
  })
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Thông tin dự án`,
      children: <ProjectInformation ListProjectManagerDetail={ListProjectManagerDetail} />
    },
    {
      key: '2',
      label: `Thông tin nhân sự`,
      children: <PersonalInformation />
    }
  ]
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
