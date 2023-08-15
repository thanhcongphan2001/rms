import { Button, Col, Row } from 'antd'
import React, { useState } from 'react'
import { FormControl, MenuItem, TextField, Select } from '@mui/material'
import DatePickerCus from 'src/components/DatePicker/DatePicker'
import { styled } from '@mui/material/styles'
import TextArea from 'antd/es/input/TextArea'
import { useParams } from 'react-router-dom'
const CustomTextField = styled(TextField)({
  width: '90%',
  '& .MuiInputBase-root': {
    fontSize: '16px',
    backgroundColor: 'white',
    transition: '0.3s',
    '&:hover': {
      borderColor: '#888'
    },
    '&.Mui-focused': {
      borderColor: '#1890ff'
    },
    '&:disabled': {
      backgroundColor: 'red',
      borderColor: '#1890ff',
      fontSize: '32px',
      pointerEvents: 'none'
    }

  },
  '& .Mui-focused .MuiInputLabel-root': {
    top: '-20px',
    fontSize: '22px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    padding: '0 4px'
  }
})
export default function ProjectInformation({ ListProjectManagerDetail }: any) {
  const [selectedOption, setSelectedOption] = useState('option1')
  console.log(ListProjectManagerDetail);


  const handleChange = (event: any) => {
    setSelectedOption(event.target.value)
  }
  if (!ListProjectManagerDetail) {
    return null
  }
  return (
    <>
      <Row className='mt-4'>
        <Col span={24}>
          <div className='text-lg font-bold text-gray-800'>Thông tin chung</div>
        </Col>
      </Row>

      <Row className='mt-4'>
        <Col span={4}>
          <CustomTextField id='outlined-basic' label='Mã dự án' variant='outlined' size='small' name='cc' defaultValue={ListProjectManagerDetail?.data?.id} disabled />
        </Col>
        <Col span={4}>
          <CustomTextField id='outlined-basic' label='Tên dự án' variant='outlined' size='small' defaultValue={ListProjectManagerDetail?.data?.name} disabled />
        </Col>
        <Col span={4}>
          {/* <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
            <Select value={selectedOption} onChange={handleChange}>
              <MenuItem value='option1' className='pb-2'>
                Loại dự án
              </MenuItem>
            </Select>
          </FormControl> */}
          <CustomTextField id='outlined-basic' label='Loại dự án' variant='outlined' size='small' defaultValue={ListProjectManagerDetail?.data?.projectType} disabled />

        </Col>
        <Col span={4}>
          {/* <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
            <Select value={selectedOption} onChange={handleChange}>
              <MenuItem value='option1' className='pb-2'>
                Trạng thái dự án
              </MenuItem>
            </Select>
          </FormControl> */}
          <CustomTextField id='outlined-basic' label='Trạng thái dự án' variant='outlined' size='small' defaultValue={ListProjectManagerDetail?.data?.status} disabled />

        </Col>
        <Col span={4}>
          <CustomTextField id='outlined-basic' label='Xác suất' variant='outlined' size='small' defaultValue={ListProjectManagerDetail?.data?.probability + '%'} disabled />
        </Col>
        <Col span={4}>
          <DatePickerCus Title='Ngày Tạo' />
        </Col>
      </Row>

      <Row className='mt-4'>
        <Col span={4}>
          <CustomTextField id='outlined-basic' label='Khách hàng' variant='outlined' size='small' name='cc' defaultValue={ListProjectManagerDetail?.data?.customer} disabled />
        </Col>

        <Col span={4}>
          {/* <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
            <Select value={selectedOption} onChange={handleChange}>
              <MenuItem value='option1' className='pb-2'>
                Lĩnh vực
              </MenuItem>
            </Select>
          </FormControl> */}
          <CustomTextField id='outlined-basic' label='Lĩnh vực' variant='outlined' size='small' name='cc' defaultValue={ListProjectManagerDetail?.data?.domain} disabled />

        </Col>
        <Col span={4}>
          {/* <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
            <Select value={selectedOption} onChange={handleChange}>
              <MenuItem value='option1' className='pb-2'>
                Thị trường
              </MenuItem>
            </Select>
          </FormControl> */}
          <CustomTextField id='outlined-basic' label='Lĩnh vực' variant='outlined' size='small' name='cc' defaultValue={ListProjectManagerDetail?.data?.market} disabled />

        </Col>
        <Col span={4}>
          {/* <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
            <Select value={selectedOption} onChange={handleChange}>
              <MenuItem value='option1' className='pb-2'>
                Hình thức thực hiện
              </MenuItem>
            </Select>
          </FormControl> */}
          <CustomTextField id='outlined-basic' label='Lĩnh vực' variant='outlined' size='small' name='cc' defaultValue={ListProjectManagerDetail?.data?.method} disabled />

        </Col>
        <Col span={4}>
          <DatePickerCus Title='Ngày bắt đầu' />
        </Col>
        <Col span={4}>
          <DatePickerCus Title='Ngày kết thúc' />
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col span={24}>
          <TextArea rows={4} placeholder='Mô tả ' style={{ width: '98.5%' }} defaultValue={ListProjectManagerDetail?.data?.description} disabled />
        </Col>
      </Row>
      <Row className='mt-8'>
        <Col span={24}>
          <div className='text-lg font-bold text-gray-800'  >Thông tin công nghệ</div>
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col span={24}>
          <TextArea rows={4} placeholder='Mô tả ' style={{ width: '98.5%' }} defaultValue={ListProjectManagerDetail?.data?.devTechStack} disabled />
        </Col>
      </Row>
      <Row className='mt-8'>
        <Col span={24}>
          <div className='text-lg font-bold text-gray-800'>Tài liệu dự án</div>
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col span={4}>
          <Button size={'large'} className='w-11/12 bg-yellow-500 text-white'>
            Tài liệu liên quan
          </Button>
        </Col>
      </Row>
      <Row className='mt-8'>
        <Col span={5}>
          <Button size={'large'} className='w-11/12 bg-yellow-500 text-white'>
            Tạo Phiếu yêu cầu nguồn lực
          </Button>
        </Col>
      </Row>
    </>
  )
}
