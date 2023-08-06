import {
  Link,
  Typography,
  Box,
  Avatar,
  Button,
  Modal,
  TextField,
  Divider,
  Tab,
  Tabs,
  Fade,
  MenuItem,
  Menu,
  Snackbar,
  Alert,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getUser, postUser, changePasswordApi, changeAvatarApi } from '../../service/user'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Icon from 'src/@core/components/icon'
import { styled } from '@mui/material/styles'

import { useDispatch } from 'react-redux'
import { updateDataAvatarSlice } from 'src/store/apps/avatar'
import { updateDataUsernameSlice } from 'src/store/apps/nameAccount'

import Spinner from 'src/@core/components/spinner'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}
let nameRef = ''
function SettingsView() {
  const dispatch = useDispatch()
  const [dataProfile, setDataProfile] = useState<any>()

  const [firstName, setFirstName] = useState<any>(localStorage.getItem('user-name'))
  const [avatar, setAvatar] = useState<any>('')
  const [email, setEmail] = useState<any>('')

  const [avatarTemp, setAvatarTemp] = useState<any>('')

  const fnGetProfileUser = async () => {
    try {
      const res = await getUser()
      await setDataProfile(res.data.data)
      nameRef = res.data.data.name
      setFirstName(res.data.data.name)
      setAvatar(res.data.data.avatar)
      setEmail(res.data.data.email)

      return res
    } catch (error) {}
  }

  const [openModalCamera, setOpenModalCamera] = useState(false)
  const handleCloseModalCamera = () => setOpenModalCamera(false)

  const styleModalAddCamera = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '350px',
    borderRadius: '5px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 5,
    px: 5,
    pb: 5
  }

  const StyleLabelNewPs = styled(InputLabel)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary
  }))

  const fnPostProfileUser = async () => {
    try {
      localStorage.setItem('user-name', firstName)
      const data = {
        username: firstName ? firstName : localStorage.getItem('user-name'),
        name: firstName ? firstName : localStorage.getItem('user-name'),
        avatar: avatar ? avatar : localStorage.getItem('avatar-img')
      }
      const res = await postUser(data)
      if (res?.status === 200) {
        const updateUsername = {
          name: firstName
        }

        dispatch(updateDataUsernameSlice(updateUsername))
        setSnackColor('success')
        setSnackTextContent('Update Success')
        setStateSnackBar({
          openSnackBar: true,
          vertical: 'top',
          horizontal: 'center'
        })
        setTimeout(() => {
          handleCloseSnackBar()
        }, 1500)
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        setSnackColor('error')
        setSnackTextContent('Update Failed')
        setStateSnackBar({
          openSnackBar: true,
          vertical: 'top',
          horizontal: 'center'
        })
        setTimeout(() => {
          handleCloseSnackBar()
        }, 1500)
      }
    }

    fnGetProfileUser().then(r => r)
    setDataProfile(dataProfile)
  }

  const handleOnKeyPressUpdateUserName = (event: any) => {
    if (event.key === 'Enter') {
      if (firstName !== '') {
        fnPostProfileUser()
        event.target.blur()
      }
    }
  }

  const changePassword = async () => {
    try {
      const data = {
        passwordCurrent: updatePasswordCurrent,
        passwordNew: updatePasswordRepeat
      }
      const res = await changePasswordApi(data)

      if (res?.status === 200) {
        setSnackColor('success')
        setSnackTextContent('Update Password Success')
        setStateSnackBar({
          openSnackBar: true,
          vertical: 'top',
          horizontal: 'center'
        })
        setTimeout(() => {
          handleCloseSnackBar()
        }, 1000)
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        setSnackColor('error')
        setSnackTextContent('Update Password Failed')
        setStateSnackBar({
          openSnackBar: true,
          vertical: 'top',
          horizontal: 'center'
        })
        setTimeout(() => {
          handleCloseSnackBar()
        }, 1000)
      }
    }
  }

  const handleOnkeyPressChangePassword = (event: any) => {
    if (event.key === 'Enter') {
      handlesErrorPassword()
      if (accessError && accessErrorCurrent && accessErrorConfirm) {
        changePassword()
        event.target.blur()
      }
    }
  }

  const [valueTab, setValueTab] = useState(0)

  function isValidatorPassword(val: string) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g

    return regex.test(val)
  }

  const handleChange = (event: any, newValue: number) => {
    setValueTab(newValue)
  }

  const [anchorElLanguage, setAnchorElLanguage] = useState<any>(null)
  const openModalLanguage = Boolean(anchorElLanguage)
  const handleClickLanguage = (event: any) => {
    setAnchorElLanguage(event.currentTarget)
  }
  const handleCloseLanguage = () => {
    setAnchorElLanguage(null)
  }

  const [snackColor, setSnackColor] = useState<any>('success')
  const [snackTextContent, setSnackTextContent] = useState<string>('')

  const [stateSnackBar, setStateSnackBar] = React.useState<any>({
    open: false,
    vertical: 'top',
    horizontal: 'center'
  })
  const { vertical, horizontal, openSnackBar } = stateSnackBar

  const handleCloseSnackBar = () => {
    setStateSnackBar({ ...stateSnackBar, openSnackBar: false })
  }

  const [showSpinner, setShowSpinner] = useState<boolean>(false)
  async function convertBase64(e: any) {
    try {
      setShowSpinner(true)
      const file = e && e.target.files[0]
      const data = new FormData()
      data.append('file', file)
      await changeAvatarApi(data)
      const res = await fnGetProfileUser()
      if (res?.status === 200) {
        setShowSpinner(false)
        const dataUpdateAvatar = {
          avatar: res.data.data.avatar
        }
        localStorage.setItem('avatar-img', res.data.data.avatar)
        dispatch(updateDataAvatarSlice(dataUpdateAvatar))
      }
    } catch (error: any) {}

    localStorage.setItem('avatar-upload', e.target.files[0]?.name)
  }

  const [updatePasswordCurrent, setUpdatePasswordCurrent] = useState('')
  const [updatePassword, setUpdatePassword] = useState('')
  const [updatePasswordRepeat, setUpdatePasswordRepeat] = useState('')

  const [focusInputPassword, setFocusInputPassword] = useState(false)
  useEffect(() => {
    setFocusInputPassword(false)
  }, [])

  const [focusInputPasswordCurrent, setFocusInputPasswordCurrent] = useState(false)
  useEffect(() => {
    setFocusInputPasswordCurrent(false)
  }, [])

  const [focusInputPasswordRepeat, setFocusInputPasswordRepeat] = useState(false)
  useEffect(() => {
    setFocusInputPasswordRepeat(false)
  }, [])

  const [showPasswordCurrent, setShowPasswordCurrent] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const handleClickShowPasswordRepeat = () => setShowPasswordRepeat(show => !show)
  const handleClickShowPasswordCurrent = () => setShowPasswordCurrent(show => !show)

  const [accessError, setAccessError] = useState<boolean>(false)
  const [accessErrorConfirm, setAccessErrorConfirm] = useState<boolean>(false)
  const [accessErrorCurrent, setAccessErrorCurrent] = useState<boolean>(false)
  function handlesErrorPassword() {
    if (isValidatorPassword(updatePasswordCurrent) == true) {
      setFocusInputPasswordCurrent(false)
    } else {
      setFocusInputPasswordCurrent(true)
    }

    if (isValidatorPassword(updatePassword) == true) {
      setFocusInputPassword(false)
    } else {
      setFocusInputPassword(true)
    }

    if (isValidatorPassword(updatePasswordRepeat) == true) {
      setFocusInputPasswordRepeat(false)
    } else {
      setFocusInputPasswordRepeat(true)
    }
  }

  function handlesAccessError(updatePs: string, updatePsRe: string) {
    if (isValidatorPassword(updatePs) == true && isValidatorPassword(updatePsRe) == true) {
      setAccessError(true)
    } else {
      setAccessError(false)
    }
    if (isValidatorPassword(updatePsRe) == true) {
      if (updatePs !== updatePsRe) {
        setFocusInputPasswordRepeat(true)
        setAccessErrorConfirm(false)
      } else {
        setFocusInputPasswordRepeat(false)
        setAccessErrorConfirm(true)
      }
    }
  }

  function handlesAccessErrorCurrent(currentPs: string) {
    if (isValidatorPassword(currentPs)) {
      setAccessErrorCurrent(true)
    } else {
      setAccessErrorCurrent(false)
    }
  }

  const imgAvatar = localStorage.getItem('avatar-img')

  return (
    <div>
      {showSpinner && <Spinner></Spinner>}
      {!showSpinner && (
        <Box sx={{ width: '100%' }}>
          <Box
              className='underline'
              sx={{
                width: '100%',
                height: '1px',
                backgroundColor: 'rgba(76, 78, 100, 0.12)',
              }}
            ></Box>
          <Box
            sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '5px' ,border:'none' }}
            className='wrapper-tabs hidden__scrollbar'
          >
            <Tabs
              className='scrollbar'
              TabIndicatorProps={{
                style: {
                  backgroundColor: '#FF74A6'
                }
              }}
              sx={{
                '.Mui-selected': {
                  color: '#FF74A6 !important',
                  fontWeight: 'bold'
                },
                '.css-1inte0n-MuiButtonBase-root-MuiTab-root.Mui-selected': {
                  color: '#FF74A6'
                }
              }}
              value={valueTab}
              onChange={handleChange}
              aria-label='basic tabs example'
            >
              <Tab sx={{ textTransform: 'none', fontSize: '16px' }} label='My account' {...chooseTab(0)} />
              {/* <Tab sx={{ textTransform: 'none', fontSize: '16px' }} label='Contact info' {...chooseTab(1)} /> */}
              <Tab sx={{ textTransform: 'none', fontSize: '16px' }} label='Password' {...chooseTab(1)} />
              <Tab sx={{ textTransform: 'none', fontSize: '16px' }} {...chooseTab(2)} />
            </Tabs>
          </Box>
          <TabPanel value={valueTab} index={0}>
            {/*My account*/}

            <div className={'my-account'}>
              <Typography sx={{ lineHeight: '26px', fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>
                Name and photos
              </Typography>
              <Typography sx={{ lineHeight: '22px', fontSize: '14px', fontWeight: 400, marginBottom: '20px' }}>
                Changing your name below will update your name on your profile.{' '}
                <Link
                  sx={{
                    lineHeight: '22px',
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#FF74A6',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                >
                  View your profile
                </Link>
              </Typography>

              {/*Avatar*/}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', width: 272 }}>
                <Avatar
                  alt='Avatar Sharp'
                  src={imgAvatar ? imgAvatar : dataProfile.avatar}
                  sx={{ width: 128, height: 128, marginRight: '20px' }}
                />
                <div
                  className='image-upload'
                  style={{
                    border: '3px solid #6c668533',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '50%',
                    width: '128px',
                    height: '128px'
                  }}
                >
                  <label
                    style={{
                      width: '128px',
                      height: '128px',
                      justifyContent: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                    htmlFor='file-input'
                  >
                    <img
                      style={{ width: '40px', height: '40px' }}
                      src='/images/icons/project-icons/add_camera.png'
                      alt={'alt'}
                    />
                  </label>
                  <input onChange={convertBase64} id={'file-input'} style={{ display: 'none' }} type='file' />

                  {/* <AddAPhotoIcon sx={{ transform: 'scale(1.4)' }} onClick={handleOpenModalCamera}></AddAPhotoIcon> */}
                  <Modal
                    open={openModalCamera}
                    onClose={handleCloseModalCamera}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                  >
                    <Box sx={styleModalAddCamera}>
                      <TextField
                        sx={{ width: '100%' }}
                        onChange={(event: any) => {
                          setAvatar(event.target.value)
                          setAvatarTemp(event.target.value)
                        }}
                        id='outlined-basic'
                        label='Link avatar'
                        variant='outlined'
                      />
                      <br />
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: '20px',
                          width: '100%'
                        }}
                      >
                        <Button
                          disabled={avatarTemp === ''}
                          sx={{
                            borderRadius: '20px',
                            padding: '8px 26px',
                            fontWeight: 'bold',
                            margin: '0 15px',
                            background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
                            color: 'white',
                            ':disabled': {
                              background: 'none',
                              color: 'gray'
                            }
                          }}
                          onClick={() => {
                            handleCloseModalCamera()
                            fnPostProfileUser().then(r => r)
                          }}
                        >
                          <span style={{ fontSize: '11px' }}>Save</span>
                        </Button>
                        <Button
                          variant='text'
                          sx={{
                            borderRadius: '20px',
                            padding: '8px 26px',
                            fontWeight: 'bold',
                            margin: '0 15px'
                          }}
                          onClick={() => {
                            handleCloseModalCamera()
                            setAvatar('')
                          }}
                        >
                          <span style={{ fontSize: '11px', color: '#212121' }}>Cancel</span>
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                </div>
              </Box>

              {/* Name*/}
              <Box sx={{ width: 272 }}>
                <p style={{ margin: '5px', fontSize: '14px' }}>Name</p>
                <TextField
                  sx={{
                    input: {
                      padding: '7px 10px',
                      width: '100%',
                      fontSize: '14px'
                    },
                    '.MuiOutlinedInput-root': {
                      borderRadius: '20px',
                      width: '100%'
                    },
                    '.MuiFormControl-root': {
                      width: '100%'
                    }
                  }}
                  id='filled-search'
                  label=''
                  type='search'
                  variant='outlined'
                  value={firstName}
                  onKeyPress={(event: any) => handleOnKeyPressUpdateUserName(event)}
                  onChange={(event: any) => setFirstName(event.target.value)}
                />
              </Box>

              <Box sx={{ marginTop: '20px' }}>
                <Button
                  disabled={firstName === ''}
                  sx={{
                    borderRadius: '20px',
                    padding: '8px 26px',
                    fontWeight: 'bold',
                    marginRight: '20px',
                    background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
                    color: 'white',
                    ':disabled': {
                      background: 'none',
                      color: 'gray'
                    }
                  }}
                  onClick={fnPostProfileUser}
                >
                  <span style={{ fontSize: '11px', textTransform: 'none' }}>Save</span>
                </Button>
                <Button
                  variant='text'
                  sx={{
                    borderRadius: '20px',
                    padding: '8px 26px',
                    fontWeight: 'bold',
                    marginRight: '20px'
                  }}
                  onClick={() => {
                    setFirstName(nameRef)
                  }}
                >
                  <span style={{ fontSize: '11px', textTransform: 'none' }}>Cancel</span>
                </Button>
              </Box>
            </div>
          </TabPanel>

          {/*Contact info*/}
          <TabPanel value={valueTab} index={3}>
            <div>
              <Typography
                sx={{
                  lineHeight: '26px',
                  fontSize: '18px',
                  fontWeight: 700,
                  marginBottom: '10px',
                  marginTop: '0px'
                }}
              >
                Contact Info
              </Typography>
              <Typography sx={{ lineHeight: '22px', fontSize: '14px', fontWeight: 400, marginBottom: '20px' }}>
                Access your Kaap Workspaces with any email address, or by connecting an account.
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap',

                  flexDirection: 'row',
                  '@media (max-width: 600px)': { flexDirection: 'column' }
                }}
              >
                <Box
                  sx={{
                    marginRight: '5rem'
                  }}
                >
                  <p style={{ margin: '5px', fontSize: '14px' }}>Email</p>
                  <TextField
                    sx={{
                      width: '100%',
                      input: {
                        padding: '10px 10px',
                        width: '100%',
                        fontSize: '14px'
                      },
                      '.MuiOutlinedInput-root': {
                        borderRadius: '20px',
                        width: '100%'
                      },
                      '.MuiFormControl-root': {
                        width: '100%'
                      }
                    }}
                    id='filled-search'
                    label=''
                    type='search'
                    variant='outlined'
                    value={email}
                    disabled
                  />

                  <Box sx={{ marginTop: '20px' }}>
                    <Button
                      size={'small'}
                      sx={{
                        textTransform: 'none',
                        borderRadius: '20px',
                        padding: '8px 26px',
                        fontWeight: 'bold',
                        marginRight: '20px',
                        background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
                        color: 'white',
                        ':disabled': {
                          background: 'none',
                          color: 'gray'
                        }
                      }}
                    >
                      <span style={{ fontSize: '11px' }}>Save</span>
                    </Button>
                    <Button
                      variant='text'
                      sx={{
                        borderRadius: '20px',
                        padding: '8px 26px',
                        fontWeight: 'bold',
                        marginRight: '20px',
                        textTransform: 'none'
                      }}
                    >
                      <span style={{ fontSize: '11px' }}>Cancel</span>
                    </Button>
                  </Box>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      margin: '5px',
                      fontSize: '14px',
                      '@media (max-width: 600px)': { marginTop: '50px' }
                    }}
                  >
                    Connected accounts
                  </Typography>
                  <button
                    className='btn-connect-slack'
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '1px solid #6c668540',
                      borderRadius: '30px',
                      height: '40px',
                      backgroundColor: 'white',
                      width: '210px',
                      marginBottom: '8px',
                      cursor: 'pointer',
                      padding: '0 13px'
                    }}
                  >
                    <Typography sx={{ fontSize: '14px', marginRight: '10px', fontWeight: 'bold', color: '#212121' }}>
                      Connect with Slack
                    </Typography>
                    <img
                      style={{ width: '18px', height: '24px' }}
                      src='/images/icons/project-icons/icon_slack.png'
                      alt=''
                    />
                  </button>

                  <button
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '1px solid #6c668540',
                      borderRadius: '30px',
                      height: '40px',
                      backgroundColor: 'white',
                      width: '210px',
                      cursor: 'pointer',
                      padding: '0 13px'
                    }}
                  >
                    <Typography sx={{ fontSize: '14px', marginRight: '10px', fontWeight: 'bold', color: '#212121' }}>
                      Connect with Google
                    </Typography>
                    <img
                      style={{ width: '24px', height: '24px' }}
                      src='/images/icons/project-icons/icon-google-v1.png'
                      alt=''
                    />
                  </button>
                </Box>
              </Box>

              {/*Password*/}
            </div>
          </TabPanel>

          {/*Password*/}
          <TabPanel value={valueTab} index={1}>
            <div>
              {/*Password*/}
              <Typography
                sx={{
                  lineHeight: '26px',
                  fontSize: '18px',
                  fontWeight: 700,
                  marginBottom: '10px',
                  marginTop: 'px'
                }}
              >
                Password
              </Typography>
              <Typography sx={{ lineHeight: '22px', fontSize: '14px', fontWeight: 400, marginBottom: '20px' }}>
                Note that if you signed in with a connected account, you are using that account's login information and
                we cannot change or reset those passwords here.
              </Typography>

              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <FormControl
                  sx={{
                    marginRight: '5rem',
                    width: '300px',
                    label: { fontSize: '12px', top: '0px' },
                    '.Mui-error': { fontStyle: 'italic' }
                  }}
                  variant='outlined'
                >
                  <StyleLabelNewPs sx={{ width: '110px', marginLeft: '0px' }} htmlFor='outlined-adornment-password'>
                    {!focusInputPasswordCurrent && <div style={{}}>Current Password</div>}
                    {focusInputPasswordCurrent && <div style={{ color: '#FF4D49' }}>Current Password</div>}
                  </StyleLabelNewPs>
                  <OutlinedInput
                    id='outlined-adornment-password'
                    type={showPasswordCurrent ? 'text' : 'password'}
                    onFocus={() => setFocusInputPasswordCurrent(false)}
                    error={focusInputPasswordCurrent}
                    onChange={(event: any) => {
                      setUpdatePasswordCurrent(event.target.value)
                      handlesAccessErrorCurrent(event.target.value)
                    }}
                    onKeyPress={(event: any) => handleOnkeyPressChangePassword(event)}
                    value={updatePasswordCurrent}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          onClick={handleClickShowPasswordCurrent}
                          aria-label='toggle password visibility'
                          edge='end'
                        >
                          {showPasswordCurrent ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label='Current Password'
                    sx={{
                      width: '100%',
                      borderRadius: '30px',
                      fontSize: '14px',
                      height: '50px',
                      mb: 4,
                      '.Mui-error': { fontStyle: 'italic' }
                    }}
                  />
                  {focusInputPasswordCurrent && (
                    <FormHelperText sx={{ '.Mui-error': { fontStyle: 'italic' } }} error id='accountId-error'>
                      {focusInputPasswordCurrent
                        ? 'Password must include 8 characters, 1 special character and 1 uppercase letter and 1 number'
                        : ''}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                <FormControl
                  sx={{
                    marginRight: '5rem',
                    width: '300px',
                    label: { fontSize: '12px', top: '0px' },
                    '.Mui-error': { fontStyle: 'italic' }
                  }}
                  variant='outlined'
                >
                  <StyleLabelNewPs sx={{ width: '100px', marginLeft: '0px' }} htmlFor='outlined-adornment-password'>
                    {!focusInputPassword && <div style={{}}>New Password</div>}
                    {focusInputPassword && <div style={{ color: '#FF4D49' }}>New Password</div>}
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
                    onKeyPress={(event: any) => handleOnkeyPressChangePassword(event)}
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
                    label='New Password'
                    sx={{
                      width: '100%',
                      borderRadius: '30px',
                      fontSize: '14px',
                      height: '50px',
                      mb: 4,
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
                  sx={{
                    marginRight: '5rem',
                    width: '300px',
                    label: { fontSize: '12px', top: '0px' },
                    '.Mui-error': { fontStyle: 'italic' }
                  }}
                  variant='outlined'
                >
                  <StyleLabelNewPs
                    sx={{
                      width: '155px',
                      marginLeft: '0px',
                      background: ''
                    }}
                    htmlFor='outlined-adornment-password'
                  >
                    {!focusInputPasswordRepeat && <div style={{}}>Confirm New Password</div>}
                    {focusInputPasswordRepeat && <div style={{ color: '#FF4D49' }}>Confirm New Password</div>}
                  </StyleLabelNewPs>
                  <OutlinedInput
                    id='outlined-adornment-password'
                    type={showPasswordRepeat ? 'text' : 'password'}
                    onFocus={() => setFocusInputPasswordRepeat(false)}
                    error={focusInputPasswordRepeat}
                    onChange={(event: any) => {
                      setUpdatePasswordRepeat(event.target.value)
                      handlesAccessError(updatePassword, event.target.value)
                    }}
                    onKeyPress={(event: any) => handleOnkeyPressChangePassword(event)}
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
                    label='Confirm Password'
                    sx={{
                      width: '100% !important',
                      borderRadius: '30px',
                      fontSize: '14px',
                      height: '50px',
                      mb: 4,
                      '.Mui-error': { fontStyle: 'italic' }
                    }}
                  />
                  {focusInputPasswordRepeat && (
                    <FormHelperText sx={{ '.Mui-error': { fontStyle: 'italic' } }} error id='accountId-error'>
                      {focusInputPasswordRepeat ? 'Confirm password does not match' : ''}
                    </FormHelperText>
                  )}
                </FormControl>
              </div>

              <Box sx={{ marginTop: '20px' }}>
                <Button
                  variant='contained'
                  sx={{
                    textTransform: 'none',
                    borderRadius: '20px',
                    padding: '8px 26px',
                    fontWeight: 'bold',
                    marginRight: '20px',
                    background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
                    color: 'white',
                    ':disabled': {
                      background: '#48494c96',
                      color: 'white'
                    }
                  }}
                  onClick={() => {
                    handlesErrorPassword()
                    if (accessError && accessErrorCurrent && accessErrorConfirm) {
                      changePassword()
                    }
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px'
                    }}
                  >
                    Save
                  </span>
                </Button>
                <Button
                  variant='text'
                  sx={{
                    borderRadius: '20px',
                    padding: '8px 26px',
                    fontWeight: 'bold',
                    marginRight: '20px',
                    textTransform: 'none'
                  }}
                >
                  <span style={{ fontSize: '11px', textTransform: 'none' }}>Cancel</span>
                </Button>
              </Box>
            </div>
          </TabPanel>

          {/*Language*/}
          <TabPanel value={valueTab} index={2}>
            <Box
              className='tab-language'
              sx={{
                width: '65%',
                border: '1px solid #4c4e641f',
                borderRadius: '10px',
                padding: '20px',
                marginTop: '30px'
              }}
            >
              <Typography sx={{ lineHeight: '22px', fontSize: '14px', fontWeight: 500, marginBottom: '20px' }}>
                Preferred language
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <Typography sx={{ lineHeight: '22px', fontSize: '14px', fontWeight: 500 }}>English</Typography>
                  <Typography sx={{ lineHeight: '22px', fontSize: '14px', fontWeight: 500 }}>United States</Typography>
                </div>
                <div>
                  <Icon
                    icon={'mdi:dots-vertical'}
                    id='fade-button'
                    aria-controls={openModalLanguage ? 'fade-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={openModalLanguage ? 'true' : undefined}
                    onClick={handleClickLanguage}
                  >
                    Dashboard
                  </Icon>
                  <Menu
                    id='fade-menu'
                    MenuListProps={{
                      'aria-labelledby': 'fade-button'
                    }}
                    anchorEl={anchorElLanguage}
                    open={openModalLanguage}
                    onClose={handleCloseLanguage}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={handleCloseLanguage}>Set as primary language</MenuItem>
                  </Menu>
                </div>
              </div>

              <Divider sx={{ paddingTop: '24px' }} />

              <Typography sx={{ lineHeight: '22px', fontSize: '14px', fontWeight: 500, marginBottom: '20px' }}>
                Other language
              </Typography>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <Typography sx={{ lineHeight: '22px', fontSize: '14px', fontWeight: 500 }}>Vietnamese</Typography>
                  <Typography sx={{ lineHeight: '22px', fontSize: '14px', fontWeight: 500 }}>Viet Nam</Typography>
                </div>
                <div>
                  <Icon
                    icon={'mdi:dots-vertical'}
                    id='fade-button'
                    aria-controls={openModalLanguage ? 'fade-menu' : undefined}
                    aria-haspopup='true'
                    aria-expanded={openModalLanguage ? 'true' : undefined}
                    onClick={handleClickLanguage}
                  >
                    Dashboard
                  </Icon>
                  <Menu
                    id='fade-menu'
                    MenuListProps={{
                      'aria-labelledby': 'fade-button'
                    }}
                    anchorEl={anchorElLanguage}
                    open={openModalLanguage}
                    onClose={handleCloseLanguage}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={handleCloseLanguage}>Set as primary language</MenuItem>
                  </Menu>
                </div>
              </div>

              <Button
                sx={{
                  textTransform: 'none',
                  borderRadius: '20px',
                  padding: '8px 26px',
                  fontWeight: 'bold',
                  marginRight: '20px',
                  marginTop: '20px',
                  background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
                  color: 'white',
                  ':disabled': {
                    background: 'none',
                    color: 'gray'
                  },
                  button: {
                    hover: {
                      background: '#666cff'
                    }
                  }
                }}
              >
                <span style={{ fontSize: '11px' }}>Save</span>
              </Button>
            </Box>
          </TabPanel>
        </Box>
      )}

      {snackColor === 'success' && (
        <Snackbar
          open={openSnackBar}
          autoHideDuration={1000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert sx={{ background: 'green' }} severity='success'>
            {snackTextContent}
          </Alert>
        </Snackbar>
      )}

      {snackColor === 'error' && (
        <Snackbar
          open={openSnackBar}
          autoHideDuration={1000}
          onClose={handleCloseSnackBar}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert sx={{ background: 'red', color: 'white' }} severity='error'>
            {snackTextContent}
          </Alert>
        </Snackbar>
      )}
    </div>
  )
}

function chooseTab(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children} </Typography>
        </Box>
      )}
    </div>
  )
}

export default SettingsView
