import React, { useRef, useState } from 'react'
import { Button, Modal, Row, Col } from 'antd'
import DatePickerCus from '../DatePicker'
import { TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Select, MenuItem } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { AiOutlinePlusSquare } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
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
const ModalCus = ({ open, setOpen }: any) => {
  const [selectedOption, setSelectedOption] = useState('option1')
  const dataChildDefault = { url: '', description: '', isValidUrl: true }

  const [listChilds, setListChilds] = useState({
    child1: dataChildDefault
  })
  const handleChangeInput = (name: any, value: any, key: any) => {
    const _listChilds = _.cloneDeep(listChilds)
    _listChilds[key][name] = value
    if (value && name === 'url') {
      _listChilds[key]['isValidUrl'] = true
    }
    setListChilds(_listChilds)
  }
  const handleAddNewInput = () => {
    const _listChilds = _.cloneDeep(listChilds)
    _listChilds[`child-${uuidv4()}`] = dataChildDefault

    setListChilds(_listChilds)
  }
  const handleDeleteInput = (key: any) => {
    const _listChilds = _.cloneDeep(listChilds)
    delete _listChilds[key]
    setListChilds(_listChilds)
  }
  return (
    <>
      {/* <Button type='primary' onClick={() => setOpen(true)}>
        Open Modal of 1000px width
      </Button> */}

      <Modal
        title={<h1 className='text-3xl font-bold text-gray-800'>Thông tin chi tiết</h1>}
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={'100%'}
        style={{ top: 20 }}
        footer={[]}
      >
        <div className=' bg-neutral-100'>
          <Row className='mt-4'>
            <Col span={24}>
              <div className='text-lg font-bold text-gray-800'>Thông tin cơ bản</div>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col span={4}>
              <img
                src={
                  'data:image/jpeg;base64,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'
                }
                alt=''
                className='h-full w-11/12 object-cover'
              />
              <span>ID:0589314788</span>
            </Col>
            <Col span={20}>
              <Row>
                <Col span={4}>
                  <CustomTextField id='outlined-basic' label='Họ tên' variant='outlined' size='small' />
                </Col>
                <Col span={5}>
                  <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
                    <Select
                      value={selectedOption}
                      onChange={() => {
                        console.log('hell')
                      }}
                    >
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
                <Col span={5}>
                  <DatePickerCus Title='Ngày sinh' />
                </Col>
                <Col span={5}>
                  <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
                    <Select
                      value={selectedOption}
                      onChange={() => {
                        console.log('hell')
                      }}
                    >
                      <MenuItem value='option1' className='pb-2'>
                        Quốc tịch
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Col>
                <Col span={5}>
                  <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
                    <Select
                      value={selectedOption}
                      onChange={() => {
                        console.log('hell')
                      }}
                    >
                      <MenuItem value='option1' className='pb-2'>
                        Tình trạng hôn nhân
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Col>
              </Row>
              <Row className='mt-4'>
                <Col span={4}>
                  <CustomTextField id='outlined-basic' label='Số điện thoại' variant='outlined' size='small' />
                </Col>
                <Col span={5}>
                  <CustomTextField id='outlined-basic' label='Email' variant='outlined' size='small' />
                </Col>
                <Col span={5}>
                  <DatePickerCus Title='Ngày onboard' />
                </Col>
                <Col span={5}>
                  <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
                    <Select
                      value={selectedOption}
                      onChange={() => {
                        console.log('hell')
                      }}
                    >
                      <MenuItem value='option1' className='pb-2'>
                        Loại hợp đồng
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Col>
                <Col span={5}>
                  <CustomTextField id='outlined-basic' label='Mức lương' variant='outlined' size='small' />
                </Col>
              </Row>
              <Row className='mt-4'>
                <Col span={4}>
                  <CustomTextField id='outlined-basic' label='Số BHXH' variant='outlined' size='small' />
                </Col>

                <Col span={5}>
                  <DatePickerCus Title='Ngày Cấp' />
                </Col>
                <Col span={5}>
                  <DatePickerCus Title='Ngày Cấp' />
                </Col>
                <Col span={5}>
                  <CustomTextField id='outlined-basic' label='Nơi cấp' variant='outlined' size='small' />
                </Col>
              </Row>
              <Row className='mt-4'>
                <Col span={4}>
                  <CustomTextField id='outlined-basic' label='CMND/CCCD' variant='outlined' size='small' />
                </Col>

                <Col span={5}>
                  <DatePickerCus Title='Ngày Cấp' />
                </Col>
                <Col span={5}>
                  <DatePickerCus Title='Ngày Cấp' />
                </Col>
                <Col span={5}>
                  <CustomTextField id='outlined-basic' label='Nơi cấp' variant='outlined' size='small' />
                </Col>
              </Row>
              <Row className='mt-4'>
                <Col span={4}>
                  <CustomTextField id='outlined-basic' label='Mã số thuế' variant='outlined' size='small' />
                </Col>

                <Col span={5}>
                  <DatePickerCus Title='Ngày Cấp' />
                </Col>
                <Col span={5}>
                  <DatePickerCus Title='Ngày Cấp' />
                </Col>
                <Col span={5}>
                  <CustomTextField id='outlined-basic' label='Nơi cấp' variant='outlined' size='small' />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col span={24}>
              <div className='text-lg font-bold text-gray-800'>Địa chỉ cư trú</div>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col span={12}>
              <CustomTextField id='outlined-basic' label='Địa chỉ' variant='outlined' size='small' />
            </Col>
            <Col span={4}>
              <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
                <Select
                  value={selectedOption}
                  onChange={() => {
                    console.log('hell')
                  }}
                >
                  <MenuItem value='option1' className='pb-2'>
                    Xã/Phường
                  </MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col span={4}>
              <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
                <Select
                  value={selectedOption}
                  onChange={() => {
                    console.log('hell')
                  }}
                >
                  <MenuItem value='option1' className='pb-2'>
                    Quận / Huyện
                  </MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col span={4}>
              <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
                <Select
                  value={selectedOption}
                  onChange={() => {
                    console.log('hell')
                  }}
                >
                  <MenuItem value='option1' className='pb-2'>
                    Tỉnh / Thành
                  </MenuItem>
                </Select>
              </FormControl>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col span={24}>
              <div className='text-lg font-bold text-gray-800'>Thông tin nhân thân</div>
            </Col>
          </Row>
          <div>
            {Object.entries(listChilds).map(([key, child], index) => {
              return (
                <Row key={`child-${key}`} className='mt-4'>
                  <Col span={4}>
                    <CustomTextField id='outlined-basic' label='Họ tên' variant='outlined' size='small' />
                  </Col>
                  <Col span={4}>
                    <CustomTextField id='outlined-basic' label='Mối quan hệ' variant='outlined' size='small' />
                  </Col>
                  <Col span={4}>
                    <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
                      <Select
                        value={selectedOption}
                        onChange={() => {
                          console.log('hell')
                        }}
                      >
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
                    <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
                      <Select
                        value={selectedOption}
                        onChange={() => {
                          console.log('hell')
                        }}
                      >
                        <MenuItem value='option1' className='pb-2'>
                          Quốc tịch
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Col>
                  <Col span={3}>
                    <CustomTextField id='outlined-basic' label='Số điện thoại' variant='outlined' size='small' />
                  </Col>
                  <Col span={1}>
                    <div className='d-flex'>
                      {index == 0 && (
                        <i onClick={handleAddNewInput} className='cursor-pointer bg-green-500 text-3xl text-green-500'>
                          <AiOutlinePlusSquare />
                        </i>
                      )}

                      {index >= 1 && (
                        <i className='cursor-pointer text-3xl text-red-500' onClick={() => handleDeleteInput(key)}>
                          <BsTrash />
                        </i>
                      )}
                    </div>
                  </Col>
                </Row>
              )
            })}
          </div>
          <Row className='mt-4'>
            <Col span={24}>
              <div className='text-lg font-bold text-gray-800'>Trình độ học vấn</div>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col span={24}>
              <Row>
                <Col span={4}>
                  <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
                    <Select
                      value={selectedOption}
                      onChange={() => {
                        console.log('hell')
                      }}
                    >
                      <MenuItem value='option1' className='pb-2'>
                        Trình độ
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col span={4}>
              <CustomTextField id='outlined-basic' label='Tên trường' variant='outlined' size='small' />
            </Col>
            <Col span={4}>
              <CustomTextField id='outlined-basic' label='Nghành học' variant='outlined' size='small' />
            </Col>
            <Col span={4}>
              <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
                <Select
                  value={selectedOption}
                  onChange={() => {
                    console.log('hell')
                  }}
                >
                  <MenuItem value='option1' className='pb-2'>
                    Bằng cấp
                  </MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col span={4}>
              <CustomTextField id='outlined-basic' label='Năm tốt nghiệp' variant='outlined' size='small' />
            </Col>
            <Col span={3} offset={4}>
              <Button size={'middle'} className='bg-yellow-500 text-white'>
                Upload bằng cấp
              </Button>
            </Col>
            <Col span={1}>
              <i className='cursor-pointer bg-green-500 text-3xl text-green-500'>
                <AiOutlinePlusSquare />
              </i>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col span={4} offset={8}>
              <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
                <Select
                  value={selectedOption}
                  onChange={() => {
                    console.log('hell')
                  }}
                >
                  <MenuItem value='option1' className='pb-2'>
                    Ngoại ngữ
                  </MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col span={4}>
              <CustomTextField id='outlined-basic' label='Bằng cấp' variant='outlined' size='small' />
            </Col>
            <Col span={3} offset={4}>
              <Button size={'middle'} className='bg-yellow-500 text-white'>
                Upload bằng cấp
              </Button>
            </Col>
            <Col span={1}>
              <i className='cursor-pointer bg-green-500 text-3xl text-green-500'>
                <AiOutlinePlusSquare />
              </i>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col span={24}>
              <div className='text-lg font-bold text-gray-800'>Trình độ chuyên môn</div>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col span={4}>
              <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
                <Select
                  value={selectedOption}
                  onChange={() => {
                    console.log('hell')
                  }}
                >
                  <MenuItem value='option1' className='pb-2'>
                    Vị trí
                  </MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col span={4}>
              <FormControl sx={{ minWidth: '90%' }} size='small' className='bg-white'>
                <Select
                  value={selectedOption}
                  onChange={() => {
                    console.log('hell')
                  }}
                >
                  <MenuItem value='option1' className='pb-2'>
                    Cấp bậc
                  </MenuItem>
                </Select>
              </FormControl>
            </Col>
            <Col span={4}>
              <CustomTextField id='outlined-basic' label='Năm kinh nghiệm' variant='outlined' size='small' />
            </Col>
            <Col span={12}>
              <CustomTextField id='outlined-basic' label='Bộ kĩ năng' variant='outlined' size='small' />
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col span={3} offset={20}>
              <Button size={'middle'} className='w-11/12 bg-yellow-500 text-white'>
                Upload CV
              </Button>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col span={3} offset={20}>
              <Button size={'middle'} className='w-11/12 bg-yellow-500 text-white'>
                Lưu
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
    </>
  )
}

export default ModalCus
