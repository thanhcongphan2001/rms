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
import { Button, Checkbox, Form, Input, Radio, Select } from 'antd';
import { useState } from 'react'
import { FormControl, MenuItem } from '@mui/material'
import { FcGoogle } from 'react-icons/fc'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BiLogoFacebook } from 'react-icons/bi'
type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

export default function Login() {
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



  const handleRegister = () => {
    navigate('/Register')
  }
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <div className=''>
      <Helmet>
        <title>Đăng nhập | Shopee Clone</title>
        <meta name='description' content='Đăng nhập vào dự án Shopee Clone' />
      </Helmet>
      <div className=''>
        <div className='grid grid-cols-1 lg:grid-cols-2 h-screen bg-yellow-500'>
          <div className='lg:col-span-1 bg-white pt-12 px-48 '>

            <Form
              layout={'vertical'}
              style={{
                maxWidth: 600,
              }}
            >
              <p className='mb-4 text-3xl'>Login</p>
              <p className='text-gray-500 mb-8'>Please fill your detaill to access your account</p>

              <Form.Item label="Email" className=''>
                <Input placeholder="Debra.holt@example.com" />
              </Form.Item>

              <Form.Item label="Password" >
                <Input.Password placeholder="Input password" />
              </Form.Item >
              <div className='flex text-yellow-500 flex justify-between mb-4'>
                <Checkbox onChange={onChange}><p className='text-yellow-500'>Keep me signed in</p></Checkbox>
                <button className='text-yellow-500'>Forgot Password?</button>
              </div>
              <Form.Item className=' mb-8'>
                <Button size={'large'} className='bg-yellow-500 text-white w-100 ' block>
                  Sign in
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p className='text-center mb-8'>Or login with</p>
            </div>
            <div className="flex justify-center gap-8 mb-4">
              <i className=' p-2  border rounded-full'>   <FcGoogle size={24} /></i>

              <i className='text-blue-600 p-2  border rounded-full'>
                <BiLogoFacebook size={24} />
              </i>

            </div>
            <div className='flex justify-center mb-12 '>
              <p>Don’t have an account ?
              </p>
              <button onClick={handleRegister} className='ml-1 text-yellow-500'>Register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}