import { Button, Col, Row } from 'antd'
import React, { useState } from 'react'
import { FormControl, MenuItem, TextField, Select } from '@mui/material'
import DatePickerCus from 'src/components/DatePicker/DatePicker'
import { styled } from '@mui/material/styles'
import TextArea from 'antd/es/input/TextArea'
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
export default function ProjectInformation() {
  const [selectedOption, setSelectedOption] = useState('option1')

  const handleChange = (event: any) => {
    setSelectedOption(event.target.value)
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
          <CustomTextField id='outlined-basic' label='Mã dự án' variant='outlined' size='small' name='cc' />
        </Col>
        <Col span={4}>
          <CustomTextField id='outlined-basic' label='Tên dự án' variant='outlined' size='small' />
        </Col>
        <Col span={4}>
          <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
            <Select value={selectedOption} onChange={handleChange}>
              <MenuItem value='option1' className='pb-2'>
                Loại dự án
              </MenuItem>
            </Select>
          </FormControl>
        </Col>
        <Col span={4}>
          <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
            <Select value={selectedOption} onChange={handleChange}>
              <MenuItem value='option1' className='pb-2'>
                Trạng thái dự án
              </MenuItem>
            </Select>
          </FormControl>
        </Col>
        <Col span={4}>
          <CustomTextField id='outlined-basic' label='Xác suất' variant='outlined' size='small' />
        </Col>
        <Col span={4}>
          <DatePickerCus Title='Ngày Tạo' />
        </Col>
      </Row>

      <Row className='mt-4'>
        <Col span={4}>
          <CustomTextField id='outlined-basic' label='Khách hàng' variant='outlined' size='small' name='cc' />
        </Col>

        <Col span={4}>
          <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
            <Select value={selectedOption} onChange={handleChange}>
              <MenuItem value='option1' className='pb-2'>
                Lĩnh vực
              </MenuItem>
            </Select>
          </FormControl>
        </Col>
        <Col span={4}>
          <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
            <Select value={selectedOption} onChange={handleChange}>
              <MenuItem value='option1' className='pb-2'>
                Thị trường
              </MenuItem>
            </Select>
          </FormControl>
        </Col>
        <Col span={4}>
          <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
            <Select value={selectedOption} onChange={handleChange}>
              <MenuItem value='option1' className='pb-2'>
                Hình thức thực hiện
              </MenuItem>
            </Select>
          </FormControl>
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
          <TextArea rows={4} placeholder='Mô tả ' style={{ width: '98.5%' }} />
        </Col>
      </Row>
      <Row className='mt-8'>
        <Col span={24}>
          <div className='text-lg font-bold text-gray-800'>Thông tin công nghệ</div>
        </Col>
      </Row>
      <Row className='mt-4'>
        <Col span={24}>
          <TextArea rows={4} placeholder='Mô tả ' style={{ width: '98.5%' }} />
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
