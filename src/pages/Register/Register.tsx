import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema, Schema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import authApi from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
// import Input from 'src/components/Input'
import { useContext } from 'react'
import { AppContext } from 'src/contexts/app.context'

// import Button from 'src/components/Button'
import { Helmet } from 'react-helmet-async'
import { Button, Form, Input, Radio, Select } from 'antd';
import { useState } from 'react'
import { FormControl, MenuItem } from '@mui/material'
type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const [passwordVisible, setPasswordVisible] = useState(false);
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => authApi.login(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  const handleLogin = () => {
    navigate('/login')
  }
  return (
    <div className=''>
      <Helmet>
        <title>Đăng nhập | Shopee Clone</title>
        <meta name='description' content='Đăng nhập vào dự án Shopee Clone' />
      </Helmet>
      <div className=''>
        <div className='grid grid-cols-1 lg:grid-cols-2 h-screen bg-yellow-500'>
          <div className='lg:col-span-1 bg-white pt-6 px-48'>
            <Form
              layout={'vertical'}
              style={{
                maxWidth: 600,
              }}
            >
              <p className='mb-4 text-3xl'>Sign Up</p>
              <Form.Item label="Full name" className='mb-3'>
                <Input placeholder="Full name" />
              </Form.Item>
              <Form.Item label="Email" className='mb-3'>
                <Input placeholder="Debra.holt@example.com" status="" />
              </Form.Item>
              <Form.Item label="Phone number" className='mb-3'>
                <Input placeholder="Phone number" />
              </Form.Item>
              <Form.Item label="Password" className='mb-3'>
                <Input.Password placeholder="Input password" />
              </Form.Item >
              <Form.Item label=" Select your role" className='mb-12'>
                <FormControl sx={{ minWidth: '100%' }} size='small' className='bg-white'>
                  <Select value={""}>
                    <MenuItem value='' className='pb-2'>
                      Select your role
                    </MenuItem>
                    <MenuItem value='option2' className='pb-2'>
                      Admin
                    </MenuItem>
                    <MenuItem value='option3' className='pb-2'>
                      User
                    </MenuItem>
                  </Select>
                </FormControl>
              </Form.Item>
              <Form.Item>
                <Button size={'large'} className='bg-yellow-500 text-white w-100' block>
                  Sign in
                </Button>
              </Form.Item>
            </Form>
            <div className='flex'>
              <p>Have an account ?  </p>
              <button onClick={handleLogin} className='ml-1 text-yellow-500'>Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}