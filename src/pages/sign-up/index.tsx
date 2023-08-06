// ** React Imports
import { ReactNode, SyntheticEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box, { BoxProps } from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { styled, useTheme } from '@mui/material/styles'
import Typography, { TypographyProps } from '@mui/material/Typography'
import { sendOtpApi, verityOtpApi } from '../../service/user'
import { postSignUp } from '../../service/auth'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Hooks
import { useSettings } from 'src/@core/hooks/useSettings'

// ** Demo Imports
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FormHelperText from '@mui/material/FormHelperText'
import { Modal } from '@mui/material'

// Styled Components
const ForgotPasswordIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: '0 !important',
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(10)
  }
}))

const ForgotPasswordIllustration = styled('img')(({ theme }) => ({
  maxWidth: '48rem',
  [theme.breakpoints.down('xl')]: {
    maxWidth: '38rem'
  },
  [theme.breakpoints.down('lg')]: {
    maxWidth: '30rem'
  }
}))

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: 400
  },
  [theme.breakpoints.up('lg')]: {
    maxWidth: 450
  }
}))

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('md')]: {
    maxWidth: 400
  }
}))

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const LinkStyled = styled(Link)(({ theme }) => ({
  display: 'flex',
  '& svg': { mr: 1.5 },
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'center',
  color: theme.palette.primary.main
}))
const styleModalSuccess = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  borderRadius: '5px',
  bgcolor: '#28a745',
  backgroundColor: '#28a745',
  boxShadow: 24,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  pt: 5,
  px: 4,
  pb: 5
}

const styleModalFail = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  borderRadius: '5px',
  bgcolor: '#5f2120',
  backgroundColor: '#5f2120',
  boxShadow: 24,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  pt: 5,
  px: 4,
  pb: 5
}
const SignUp = () => {
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()

  // ** Vars
  const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const imageSource =
    skin === 'bordered' ? 'auth-v2-forgot-password-illustration-bordered' : 'auth-v2-forgot-password-illustration'

  // write new code
  const router = useRouter()
  const [email, setEmail] = useState<any>('')
  const [showEmail, setShowEmail] = useState(true)

  const [verificationCodes, setVerificationCodes] = useState('')
  const [showVerificationCodes, setShowVerificationCodes] = useState(false)
  const [errorVerificationCodes, setErrorVerificationCodes] = useState(false)
  const handleSubmitAccuracy = async (e: any) => {
    e.preventDefault()
    const data = { email: email, otp: verificationCodes }
    try {
      const res = await verityOtpApi(data)
      if (res.status === 200) {
        setShowVerificationCodes(true)
        setShowEmail(false)

        setOpenModalFail(true)
        setTimeout(() => {
          handleCloseModalFail()
        }, 1500)
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      }
    } catch (error: any) {
      if (error && error?.response && error?.response.data.message.includes('Otp is not correct or expired')) {
        setErrorVerificationCodes(true)
      }
    }
  }
  useEffect(() => {
    setVerificationCodes(verificationCodes)
  }, [verificationCodes])

  const backToEmail = () => {
    setShowVerificationCodes(false)
    setShowEmail(true)
  }

  function isValidatorPassword(val: string) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g

    return regex.test(val)
  }

  function handelsValidatorEmail() {
    if (email !== '' && String(email).includes('@gmail.com')) {
      return false
    } else {
      return true
    }
  }

  const [name, setName] = useState<any>('')
  const [username, setUsername] = useState<any>('')
  const [password, setPassword] = useState<any>('')
  const [passwordRepeat, setPasswordRepeat] = useState<any>('')
  const [showIconPassword, setShowIconPassword] = useState<boolean>(false)
  const [showIconPasswordRepeat, setShowIconPasswordRepeat] = useState<boolean>(false)

  const [errorEmail, setErrorEmail] = useState<boolean>(false)
  const [errorName, setErrorName] = useState<boolean>(false)
  const [errorUsername, setErrorUsername] = useState<boolean>(false)
  const [errorPassword, setErrorPassword] = useState<boolean>(false)
  const [errorPasswordRepeat, setErrorPasswordRepeat] = useState<boolean>(false)

  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false)
  const [openModalFail, setOpenModalFail] = useState<boolean>(false)
  const handleCloseModalSuccess = () => setOpenModalSuccess(false)
  const handleCloseModalFail = () => setOpenModalFail(false)

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    let check1 = true
    let check2 = true
    let check3 = true
    let check4 = true
    let check5 = true
    if (handelsValidatorEmail()) {
      setErrorEmail(true)
      check1 = false
    } else {
      check1 = true
    }
    if (name === '') {
      setErrorName(true)
      check2 = false
    } else {
      check2 = true
    }
    if (username === '') {
      setErrorUsername(true)
      check3 = false
    } else {
      check3 = true
    }
    if (password === '' || isValidatorPassword(password) === false) {
      setErrorPassword(true)
      check4 = false
    } else {
      check4 = true
    }
    if (String(password) !== String(passwordRepeat) || passwordRepeat === '') {
      setErrorPasswordRepeat(true)
      check5 = false
    } else {
      check5 = true
    }

    if (check1 && check2 && check3 && check4 && check5) {
      const dataRegister = {
        username: username,
        name: name,
        password: password,
        email: email,
        avatar: 'https://i.postimg.cc/Bv2nscWb/icon-default-avatar.png'
      }
      try {
        await postSignUp(dataRegister)
        setShowVerificationCodes(true)
        setShowEmail(false)

        const data = { email: email }
        try {
          const res = await sendOtpApi(data)
          if (res.status === 200) {
            setShowVerificationCodes(true)
            setShowEmail(false)
          }
        } catch (error: any) {}
      } catch (error: any) {
        if (error && error?.response && error?.response.data.message.includes('Duplicate entry')) {
          setOpenModalSuccess(true)
          setTimeout(() => {
            handleCloseModalSuccess()
          }, 2000)
          setShowEmail(true)
          setShowVerificationCodes(false)
        }
      }
    }

    // setDisableBtnOtp(true)
  }

  return (
    <Box className='content-right'>
      {!hidden ? (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
          <ForgotPasswordIllustrationWrapper>
            <ForgotPasswordIllustration
              alt='forgot-password-illustration'
              src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
            />
          </ForgotPasswordIllustrationWrapper>
          <FooterIllustrationsV2 image={`/images/pages/auth-v2-forgot-password-mask-${theme.palette.mode}.png`} />
        </Box>
      ) : null}
      <RightWrapper sx={skin === 'bordered' && !hidden ? { borderLeft: `1px solid ${theme.palette.divider}` } : {}}>
        <Box
          sx={{
            p: 7,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <BoxWrapper>
            <Box
              sx={{
                top: 30,
                left: 40,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <img src='../images/Vector.svg' alt='' />
              <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
                {themeConfig.templateName}
              </Typography>
            </Box>
            <Box sx={{ mb: 6 }}>
              <TypographyStyled variant='h5'>Sign up </TypographyStyled>
              <Typography variant='body2'>Enter your information to sign up</Typography>
            </Box>

            {showEmail && (
              <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                <TextField
                  error={errorEmail}
                  helperText={errorEmail ? 'Please fill your email and format email.' : ''}
                  onFocus={() => setErrorEmail(false)}
                  onChange={(event: any) => setEmail(event.target.value)}
                  value={email}
                  type='email'
                  label='Email'
                  sx={{ display: 'flex', mb: 4 }}
                />
                <TextField
                  error={errorName}
                  helperText={errorName ? 'Please fill your name.' : ''}
                  onFocus={() => setErrorName(false)}
                  onChange={(event: any) => setName(event.target.value)}
                  value={name}
                  type='text'
                  label='Name'
                  sx={{ display: 'flex', mb: 4 }}
                />
                <TextField
                  error={errorUsername}
                  helperText={errorUsername ? 'Please fill your user name.' : ''}
                  onFocus={() => setErrorUsername(false)}
                  onChange={(event: any) => setUsername(event.target.value)}
                  value={username}
                  type='text'
                  label='Username'
                  sx={{ display: 'flex', mb: 4 }}
                />

                <FormControl sx={{ m: 1, width: '100%' }} variant='outlined'>
                  <InputLabel htmlFor='outlined-adornment-password'>Password</InputLabel>

                  <OutlinedInput
                    error={errorPassword}
                    value={password}
                    onFocus={() => setErrorPassword(false)}
                    onChange={(event: any) => setPassword(event.target && event.target.value)}
                    id='outlined-adornment-password'
                    type={showIconPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={() => setShowIconPassword(!showIconPassword)}
                          edge='end'
                        >
                          {showIconPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Password'
                  />
                  {errorPassword && (
                    <FormHelperText error id='component-helper-text'>
                      Please fill your password
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl sx={{ m: 1, width: '100%', marginTop: '15px', marginBottom: '20px' }} variant='outlined'>
                  <InputLabel sx={{ width: '200px' }} htmlFor='outlined-adornment-password'>
                    Repeat Password
                  </InputLabel>
                  <OutlinedInput
                    error={errorPasswordRepeat}
                    value={passwordRepeat}
                    onFocus={() => setErrorPasswordRepeat(false)}
                    onChange={(event: any) => setPasswordRepeat(event.target && event.target.value)}
                    id='outlined-adornment-password'
                    type={showIconPasswordRepeat ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={() => setShowIconPasswordRepeat(!showIconPasswordRepeat)}
                          edge='end'
                        >
                          {showIconPasswordRepeat ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Password'
                  />
                  {errorPasswordRepeat && (
                    <FormHelperText error id='component-helper-text'>
                      Please fill your repeat password
                    </FormHelperText>
                  )}
                </FormControl>

                {/* {JSON.stringify(handelsValidatorEmail())}
                {JSON.stringify(disableBtnOtp)} */}
                <Button
                  sx={{ background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)', mb: 5.25 }}
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                >
                  Send otp
                </Button>
                <Typography sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                  <LinkStyled sx={{ color: '#FF74A6' }} href='/login'>
                    <Icon icon='mdi:chevron-left' fontSize='2rem' />
                    <span style={{ color: '#FF74A6' }}>Back to login</span>
                  </LinkStyled>
                </Typography>
              </form>
            )}

            {showVerificationCodes && (
              <form noValidate autoComplete='off' onSubmit={handleSubmitAccuracy}>
                <p style={{ marginTop: '-12px', fontSize: '14px', fontStyle: 'italic' }}>OTP will expire after 60s!</p>
                <TextField
                  error={errorVerificationCodes}
                  onFocus={() => setErrorVerificationCodes(false)}
                  helperText={errorVerificationCodes ? 'OTP is not correct or expired !' : ''}
                  onChange={(event: any) => setVerificationCodes(event.target.value)}
                  value={verificationCodes}
                  autoFocus
                  type='text'
                  label='Verification Codes'
                  sx={{ display: 'flex', mb: 4 }}
                />

                <Button
                  sx={{ background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)', mb: 5.25 }}
                  disabled={verificationCodes === ''}
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                >
                  Send verification codes
                </Button>
                <Button onClick={backToEmail} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon style={{ color: '#FF74A6' }} icon='mdi:chevron-left' fontSize='2rem' />
                  <span style={{ color: '#FF74A6' }}>Back to register</span>
                </Button>
              </form>
            )}
          </BoxWrapper>
        </Box>
      </RightWrapper>

      {/*MODAL SUCCESS*/}
      <Modal
        open={openModalSuccess}
        onClose={handleCloseModalSuccess}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styleModalFail}>
          <Icon style={{ marginRight: 5, color: 'white' }} icon={'mdi:check'} />
          <Typography sx={{ fontSize: '15px', fontWeight: '500', color: 'white' }}>Registered email</Typography>
        </Box>
      </Modal>

      {/*MODAL SUCCESS*/}
      <Modal
        open={openModalFail}
        onClose={handleCloseModalFail}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styleModalSuccess}>
          <Icon style={{ marginRight: 5, color: 'white' }} icon={'mdi:check'} />
          <Typography sx={{ fontSize: '15px', fontWeight: '500', color: 'white' }}>Register success</Typography>
        </Box>
      </Modal>
    </Box>
  )
}

SignUp.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

SignUp.guestGuard = true

export default SignUp
