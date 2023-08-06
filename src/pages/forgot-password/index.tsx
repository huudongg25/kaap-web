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
import { sendOtpApi, verityOtpApi, updatePassApi } from '../../service/user'
import Spinner from 'src/@core/components/spinner'
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput
} from '@mui/material'

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
import { VisibilityOff, Visibility } from '@mui/icons-material'

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

// modal success
const styleModalSuccess = {
  position: 'absolute' as const,
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

const StyleLabelNewPs = styled(InputLabel)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary
}))

const ForgotPassword = () => {
  // ** Hooks
  const theme = useTheme()
  const { settings } = useSettings()

  // ** Vars
  const { skin } = settings
  const hidden = useMediaQuery(theme.breakpoints.down('md'))

  const imageSource =
    skin === 'bordered' ? 'auth-v2-forgot-password-illustration-bordered' : 'auth-v2-forgot-password-illustration'

  // write new code
  const [openModalSuccess, setOpenModalSuccess] = useState(false)
  const handleCloseModalSuccess = () => setOpenModalSuccess(false)

  const router = useRouter()
  const [email, setEmail] = useState<any>('')
  const [showEmail, setShowEmail] = useState(true)
  const [disableBtnOtp, setDisableBtnOtp] = useState(false)

  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    setShowSpinner(true)
    setDisableBtnOtp(true)

    const data = { email: email }
    try {
      setDisableBtnOtp(true)
      const res = await sendOtpApi(data)
      if (res.status === 200) {
        setShowVerificationCodes(true)
        setShowEmail(false)
        setShowUpdatePassword(false)
        setShowSpinner(false)
      }
    } catch (error) {
      setShowSpinner(false)
    }
  }

  const [verificationCodes, setVerificationCodes] = useState('')
  const [showVerificationCodes, setShowVerificationCodes] = useState(false)
  const [errorVerificationCodes, setErrorVerificationCodes] = useState(false)
  const handleSubmitAccuracy = async (e: any) => {
    e.preventDefault()
    setShowSpinner(true)
    const data = { email: email, otp: verificationCodes }
    try {
      const res = await verityOtpApi(data)
      if (res.status === 200) {
        setShowUpdatePassword(true)
        setShowVerificationCodes(false)
        setShowEmail(false)

        setShowSpinner(false)
      }
    } catch (error) {
      setErrorVerificationCodes(true)
      setShowSpinner(false)
    }
  }
  useEffect(() => {
    setVerificationCodes(verificationCodes)
  }, [verificationCodes])

  const backToEmail = () => {
    setShowUpdatePassword(false)
    setShowVerificationCodes(false)
    setShowEmail(true)
    setDisableBtnOtp(false)
  }

  const backOtpCode = () => {
    setShowUpdatePassword(false)
    setShowVerificationCodes(true)
    setShowEmail(false)
    setDisableBtnOtp(false)
  }

  const [updatePassword, setUpdatePassword] = useState('')
  const [updatePasswordRepeat, setUpdatePasswordRepeat] = useState('')
  const [showUpdatePassword, setShowUpdatePassword] = useState(false)
  const [, setErrorTextPassword] = useState(false)
  useEffect(() => {
    if (updatePassword !== updatePasswordRepeat) {
      setErrorTextPassword(true)
    } else {
      setErrorTextPassword(false)
    }
  }, [updatePassword, updatePasswordRepeat])
  function isValidatorPassword(val: string) {
    // true format password ==> return true
    // false format password ==> return false

    if (val && (!val.includes(' ') || val != '')) {
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g

      return regex.test(val)
    } else {
      return false
    }
  }

  const handleSubmitPassword = async () => {
    setShowSpinner(true)
    const data = { email: email, password: updatePassword }
    try {
      const res = await updatePassApi(data)
      setShowSpinner(false)
      if (res.status === 200) {
        setOpenModalSuccess(true)
        setTimeout(() => {
          setOpenModalSuccess(false)
        }, 500)
        router.push('/login')
      }
    } catch (error) {
      setShowSpinner(false)
    }
  }

  const handleOnkeyPressUpdatePassword = (event: any) => {
    if (event.key === 'Enter') {
      handlesErrorPassword()
      if (accessError) {
        handleSubmitPassword()
        event.target.blur()
      }
    }
  }

  const [focusInputPassword, setFocusInputPassword] = useState(false)
  useEffect(() => {
    setFocusInputPassword(false)
  }, [])

  const [focusInputPasswordRepeat, setFocusInputPasswordRepeat] = useState(false)
  useEffect(() => {
    setFocusInputPasswordRepeat(false)
  }, [])

  function handelsValidatorEmail() {
    if (email !== '' && String(email).includes('@gmail.com')) {
      return false
    } else {
      return true
    }
  }

  const [accessError, setAccessError] = useState<boolean>(false)
  function handlesErrorPassword() {
    if (isValidatorPassword(updatePassword) == true) {
      setFocusInputPassword(false)
    } else {
      setFocusInputPassword(true)
    }
    if (updatePassword == updatePasswordRepeat) {
      setFocusInputPasswordRepeat(false)
    } else {
      setFocusInputPasswordRepeat(true)
    }
  }

  function handlesAccessError(updatePs: string, updatePsRe: string) {
    if (isValidatorPassword(updatePs) == true && updatePs == updatePsRe) {
      setAccessError(true)
    } else {
      setAccessError(false)
    }
  }

  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleClickShowPasswordRepeat = () => setShowPasswordRepeat(show => !show)

  return (
    <div>
      {/* errorVerificationCodes: {JSON.stringify(errorVerificationCodes)} */}
      {showSpinner && <Spinner></Spinner>}
      {!showSpinner && (
        <Box className='content-right'>
          {!hidden ? (
            <Box
              sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}
            >
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
                  <Typography
                    variant='h6'
                    sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}
                  >
                    {themeConfig.templateName}
                  </Typography>
                </Box>
                <Box sx={{ mb: 6 }}>
                  <TypographyStyled variant='h5'>Forgot Password? 🔒</TypographyStyled>
                  <Typography variant='body2'>
                    Enter your email and we&prime;ll send you instructions to reset your password
                  </Typography>
                </Box>
                {showEmail && (
                  <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <TextField
                      onChange={(event: any) => setEmail(event.target.value)}
                      value={email}
                      autoFocus
                      type='email'
                      label='Email'
                      sx={{ display: 'flex', mb: 4 }}
                    />
                    {/* {JSON.stringify(handelsValidatorEmail())}
                {JSON.stringify(disableBtnOtp)} */}
                    <Button
                      sx={{
                        background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
                        mb: 5.25,
                        textTransform: 'none',
                        ':disabled': { background: '#4c4e6438' }
                      }}
                      disabled={
                        (handelsValidatorEmail() && !disableBtnOtp) ||
                        (handelsValidatorEmail() === false && disableBtnOtp === true)
                      }
                      fullWidth
                      size='large'
                      type='submit'
                      variant='contained'
                    >
                      Send
                    </Button>
                    <Typography
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingLeft: '0 !important',
                        marginLeft: '-10px'
                      }}
                    >
                      <LinkStyled href='/login'>
                        <Icon style={{ color: '#FF74A6' }} icon='mdi:chevron-left' fontSize='2rem' />
                        <span style={{ color: '#FF74A6' }}>Back to login</span>
                      </LinkStyled>
                    </Typography>
                  </form>
                )}
                {showVerificationCodes && (
                  <form noValidate autoComplete='off' onSubmit={handleSubmitAccuracy}>
                    <p style={{ marginTop: '-12px', fontSize: '14px', fontStyle: 'italic' }}>
                      OTP will expire after 60s!
                    </p>
                    <TextField
                      error={errorVerificationCodes}
                      onFocus={() => setErrorVerificationCodes(false)}
                      helperText={errorVerificationCodes ? 'OTP is not correct or expired !' : ''}
                      onChange={(event: any) => setVerificationCodes(event.target.value)}
                      value={verificationCodes}
                      type='text'
                      label='Verification Code'
                      sx={{ display: 'flex', mb: 4 }}
                    />

                    <Button
                      sx={{
                        background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
                        mb: 5.25,
                        textTransform: 'none',
                        ':disabled': { background: '#4c4e6438' }
                      }}
                      disabled={verificationCodes === ''}
                      fullWidth
                      size='large'
                      type='submit'
                      variant='contained'
                    >
                      Send verification code
                    </Button>
                    <Button
                      onClick={backToEmail}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textTransform: 'none',
                        paddingLeft: '0 !important',
                        marginLeft: '-10px'
                      }}
                    >
                      <Icon style={{ color: '#FF74A6' }} icon='mdi:chevron-left' fontSize='2rem' />
                      <span style={{ color: '#FF74A6' }}>Back to email</span>
                    </Button>
                  </form>
                )}
                {/* showUpdatePassword */}
                {/* onSubmit={handleSubmitPassword} */}
                {showUpdatePassword && (
                  <form noValidate autoComplete='off'>
                    <FormControl sx={{ width: '100%', '.Mui-error': { fontStyle: 'italic' } }} variant='outlined'>
                      <StyleLabelNewPs htmlFor='outlined-adornment-password'>
                        {!focusInputPassword && <div style={{}}>Password *</div>}
                        {focusInputPassword && <div style={{ color: '#FF4D49' }}>Password *</div>}
                      </StyleLabelNewPs>
                      <OutlinedInput
                        id='outlined-adornment-password'
                        type={showPassword ? 'text' : 'password'}
                        onFocus={() => setFocusInputPassword(false)}
                        error={focusInputPassword}
                        onChange={(event: any) => {
                          setUpdatePassword(event.target.value)
                          handlesAccessError(event.target.value, updatePasswordRepeat)
                        }}
                        onKeyPress={(event: any) => handleOnkeyPressUpdatePassword(event)}
                        value={updatePassword}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              onClick={handleClickShowPassword}
                              aria-label='toggle password visibility'
                              edge='end'
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label='Password*'
                        sx={{
                          mb: 4,
                          '::placeholder': { fontSize: '2px !important' },
                          label: { fontSize: '14px !important' },
                          '.Mui-error': { fontStyle: 'italic' }
                        }}
                      />
                      {focusInputPassword && (
                        <FormHelperText sx={{ '.Mui-error': { fontStyle: 'italic' } }} error id='accountId-error'>
                          {focusInputPassword
                            ? 'Password must include 8 characters, 1 special character and 1 uppercase letter and 1 number'
                            : ''}
                        </FormHelperText>
                      )}
                    </FormControl>

                    <FormControl
                      sx={{ mt: '8px', mb: '15px', width: '100%', '.Mui-error': { fontStyle: 'italic' } }}
                      variant='outlined'
                    >
                      <StyleLabelNewPs sx={{ width: '170px' }} htmlFor='outlined-adornment-password'>
                        {!focusInputPasswordRepeat && <div style={{}}> Confirm Password *</div>}
                        {focusInputPasswordRepeat && <div style={{ color: '#FF4D49' }}> Confirm Password *</div>}
                      </StyleLabelNewPs>
                      <OutlinedInput
                        id='outlined-adornment-password'
                        type={showPasswordRepeat ? 'text' : 'password'}
                        onFocus={() => setFocusInputPasswordRepeat(false)}
                        onKeyPress={(event: any) => handleOnkeyPressUpdatePassword(event)}
                        error={focusInputPasswordRepeat}
                        onChange={(event: any) => {
                          setUpdatePasswordRepeat(event.target.value)
                          handlesAccessError(updatePassword, event.target.value)
                        }}
                        value={updatePasswordRepeat}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              onClick={handleClickShowPasswordRepeat}
                              aria-label='toggle password visibility'
                              edge='end'
                            >
                              {showPasswordRepeat ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label='Confirm Password *'
                        sx={{
                          mb: 4,
                          '::placeholder': { fontSize: '2px !important' },
                          label: { fontSize: '14px !important' },
                          '.Mui-error': { fontStyle: 'italic' }
                        }}
                      />
                      {focusInputPasswordRepeat && (
                        <FormHelperText sx={{ '.Mui-error': { fontStyle: 'italic' } }} error id='accountId-error'>
                          {focusInputPasswordRepeat ? 'Confirm password does not match' : ''}
                        </FormHelperText>
                      )}
                    </FormControl>

                    <Button
                      onClick={() => {
                        handlesErrorPassword()
                        if (accessError) {
                          handleSubmitPassword()
                        }
                      }}
                      sx={{
                        background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
                        mb: 0.25,
                        mt: 0,
                        textTransform: 'none',
                        ':disabled': { background: '#4c4e6438' }
                      }}
                      fullWidth
                      size='large'
                      variant='contained'
                    >
                      Update Password
                    </Button>
                    <Button
                      sx={{ color: '#FF74A6', paddingLeft: 0, mt: 5, textTransform: 'none', marginLeft: '-10p' }}
                      onClick={backOtpCode}
                    >
                      <Icon style={{ color: '#FF74A6' }} icon='mdi:chevron-left' fontSize='2rem' />
                      <span style={{ color: '#FF74A6' }}>Back</span>
                    </Button>
                  </form>
                )}
              </BoxWrapper>
            </Box>
          </RightWrapper>
        </Box>
      )}

      {/*MODAL SUCCESS*/}
      <Modal
        open={openModalSuccess}
        onClose={handleCloseModalSuccess}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={styleModalSuccess}>
          <Icon style={{ marginRight: 5, color: 'white' }} icon={'mdi:check'} />
          <Typography sx={{ fontSize: '15px', fontWeight: '500', color: 'white' }}>Change success</Typography>
        </Box>
      </Modal>
    </div>
  )
}

ForgotPassword.guestGuard = true
ForgotPassword.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default ForgotPassword
