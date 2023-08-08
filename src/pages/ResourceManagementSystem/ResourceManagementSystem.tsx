import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
// Không có tính năng tree-shaking
// import { omit } from 'lodash'

// Import chỉ mỗi function omit
import omit from 'lodash/omit'
import { TextField } from '@mui/material'
import { schema, Schema } from 'src/utils/rules'
import Input from 'src/components/Input'
import authApi from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { useContext, useState } from 'react'
import { AppContext } from 'src/contexts/app.context'
import { Button } from 'antd'
import InputLabel from '@mui/material/InputLabel'
import { Helmet } from 'react-helmet-async'
import { Row, Col } from 'antd'
import { styled } from '@mui/material/styles'
import DatePickerCus from 'src/components/DatePicker'
import { Select, MenuItem } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import TableCus from 'src/components/Table'
import Icon, { HomeOutlined } from '@ant-design/icons'
type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])
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

export default function ResourceManagementSystem() {
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
          <h1 className='text-3xl font-bold text-gray-800'>Quản lý nhân sự</h1>
        </Col>
      </Row>
      <div className='bg-neutral-100'>
        <div className='container'>
          <Row className='mt-4'>
            <Col span={24}>
              <div className='text-lg font-bold text-gray-800'>Thông tin cơ bản</div>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col span={4}>
              <CustomTextField id='outlined-basic' label='ID' variant='outlined' size='small' />
            </Col>
            <Col span={4}>
              <CustomTextField id='outlined-basic' label='Họ tên' variant='outlined' size='small' />
            </Col>
            <Col span={4}>
              <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
                <Select value={selectedOption} onChange={handleChange}>
                  <MenuItem value='option1' className='pb-2'>
                    Giới tính
                  </MenuItem>
                  <MenuItem value='option12' className='pb-2'>
                    Nam
                  </MenuItem>
                  <MenuItem value='option2' className='pb-2'>
                    Nữ
                  </MenuItem>
                  <MenuItem value='option3' className='pb-2'>
                    Khác
                  </MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col span={4}>
              <DatePickerCus Title='Ngày sinh' />
            </Col>
            <Col span={4}>
              <CustomTextField id='outlined-basic' label='Số điện thoại' variant='outlined' size='small' />
            </Col>
            <Col span={4}>
              <CustomTextField id='outlined-basic' label='Email' variant='outlined' size='small' />
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col span={4}>
              <DatePickerCus Title='Ngày onboard' />
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col span={24}>
              <div className='text-lg font-bold text-gray-800'>Thông tin chuyên môn</div>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col span={4}>
              <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
                <Select value={selectedOption} onChange={handleChange}>
                  <MenuItem value='option1' className='pb-2'>
                    Vị trí
                  </MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col span={4}>
              <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
                <Select value={selectedOption} onChange={handleChange}>
                  <MenuItem value='option1' className='pb-2'>
                    Cấp bậc
                  </MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col span={4}>
              <CustomTextField id='outlined-basic' label='Năm kinh nghiệm' variant='outlined' size='small' />
            </Col>

            <Col span={4}>
              <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
                <Select value={selectedOption} onChange={handleChange}>
                  <MenuItem value='option1' className='pb-2'>
                    ngoại ngữ
                  </MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col span={4}>
              <CustomTextField id='outlined-basic' label='Ngôn ngữ lập trình' variant='outlined' size='small' />
            </Col>
            <Col span={4}>
              <CustomTextField id='outlined-basic' label='Bộ kỹ năng' variant='outlined' size='small' />
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col span={24}>
              <Button size={'large'} className='bg-yellow-500 text-white'>
                Upload CV
              </Button>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col span={4} offset={16}>
              <Button size={'large'} className='w-11/12 bg-yellow-500 text-white'>
                tìm kiếm
              </Button>
            </Col>
            <Col span={4}>
              <Button size={'large'} className='w-11/12 bg-yellow-500 text-white'>
                thêm mới
              </Button>
            </Col>
          </Row>
          <TableCus />
        </div>
      </div>
    </div>
  )
}
