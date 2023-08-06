// ** React Imports
import { useState, ReactNode, useEffect } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Components

import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import MuiFormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel'
import { Modal } from '@mui/material'
import { useRouter } from 'next/router'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useAuth } from 'src/hooks/useAuth'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(({ theme }) => ({
  '& .MuiFormControlLabel-label': {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary
  }
}))

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('The field is required.'),
  password: yup
    .string()
    .required('Password must include 8 characters, 1 special character and 1 uppercase letter and 1 number')
    .min(8, 'Password must include 8 characters, 1 special character and 1 uppercase letter and 1 number.')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g,
      'Password must include 8 characters, 1 special character and 1 uppercase letter and 1 number.'
    )
})

const defaultValues = {
  password: '',
  email: ''
}

interface FormData {
  email: string
  password: string
}

const LoginPage = () => {
  const [rememberMe, setRememberMe] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  // ** Hooks
  const auth = useAuth()

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = async (data: FormData) => {
    fnDisable()
    const { email, password } = data

    auth.login({ email, password, rememberMe }, () => {
      setError('email', {
        type: 'manual',
        message: 'Email or Password is invalid'
      })
    })
  }

  const [disBtnLogin, setDisBtnLogin] = useState<boolean>(false)
  function fnDisable() {
    setDisBtnLogin(true)
    setTimeout(() => {
      setDisBtnLogin(false)
    }, 1000)
  }

  const stylesButtonLogin = {}

  const styleTagP = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#212121',
    fontFamily: 'Roboto'
  }

  const styleModalEmail = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 350,
    borderRadius: '5px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    pt: 8,
    px: 5,
    pb: 8,
    '.MuiBox-root': {
      width: '100%'
    }
  }

  const router = useRouter()
  const [openModalEmail, setOpenModalEmail] = useState(false)
  const handleOpenModalEmail = () => setOpenModalEmail(true)
  const handleCloseModalEmail = () => setOpenModalEmail(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          height: `${window.innerHeight}px`
        }}
      >
        <h1
          style={{
            fontSize: '2rem',
            textAlign: 'center',
            marginTop: 0
          }}
        >
          Sign In to Kaap
        </h1>

        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <button style={stylesButtonLogin} className='btn-login-kaap' onClick={handleOpenModalEmail}>
            <div style={{ width: '40px', display: 'flex', justifyContent: 'flex-start' }}>
              <img
                style={{ width: '32px', height: '32px' }}
                src='/images/icons/project-icons/icon-mail-v1.png'
                alt=''
              />
            </div>
            <p style={styleTagP}>Sign in with Email</p>
          </button>
        </div>
      </Box>

      {/* MODAL LOGIN EMAIL */}
      <Modal
        open={openModalEmail}
        onClose={handleCloseModalEmail}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styleModalEmail}>
          <Box sx={{ fontSize: '14px' }}></Box>

          <form noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Controller
                name='email'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    label='Email'
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.email)}
                    placeholder='admin@gmail.com'
                  />
                )}
              />
              {errors.email && (
                <FormHelperText sx={{ color: 'error.main', fontStyle: 'italic' }}>
                  {errors.email.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth>
              <InputLabel htmlFor='auth-login-v2-password' error={Boolean(errors.password)}>
                Password
              </InputLabel>
              <Controller
                name='password'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <OutlinedInput
                    value={value}
                    onBlur={onBlur}
                    label='Password'
                    onChange={onChange}
                    id='auth-login-v2-password'
                    error={Boolean(errors.password)}
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          edge='end'
                          onMouseDown={e => e.preventDefault()}
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <Icon icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} fontSize={20} />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                )}
              />
              {errors.password && (
                <FormHelperText sx={{ color: 'error.main', fontStyle: 'italic' }} id=''>
                  {errors.password.message}
                </FormHelperText>
              )}
            </FormControl>
            <Box
              sx={{ mb: 4, display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}
            >
              <FormControlLabel
                label='Remember Me'
                control={<Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />}
              />
              <Typography
                variant='body2'
                component={Link}
                href='/forgot-password'
                sx={{ color: '#FF74A6', textDecoration: 'none' }}
              >
                Forgot Password?
              </Typography>
            </Box>
            <Button
              disabled={disBtnLogin}
              sx={{ mb: 7, background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)', textTransform: 'none' }}
              type='submit'
              fullWidth
              size='large'
              variant='contained'
            >
              Sign In
            </Button>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Typography sx={{ mr: 2, color: 'text.secondary' }}>New on our platform?</Typography>
              <Typography
                onClick={() => router.push(`/sign-up`)}
                sx={{ cursor: 'pointer', color: '#FF74A6', textDecoration: 'none' }}
              >
                Create an account
              </Typography>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
