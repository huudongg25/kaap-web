import { Box, Modal, TextField } from '@mui/material'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import HttpsIcon from '@mui/icons-material/Https'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { postLogin } from '../../service/auth'

function LoginPageV1() {
  const router = useRouter()
  const stylesButtonLogin = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '448px',
    height: '56px',
    borderRadius: '56px',
    border: '1px solid #6c668540',
    cursor: 'pointer',
    marginTop: '10px',
    background: '#fff',
    '&:hover': {
      background: 'rgb(7, 177, 77, 0.42)'
    }
  }

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

  const [openModalEmail, setOpenModalEmail] = useState(false)
  const handleOpenModalEmail = () => setOpenModalEmail(true)
  const handleCloseModalEmail = () => setOpenModalEmail(false)

  const [showPass, setShowPass] = useState<boolean>(false)

  const [valueEmailAcc, setValueEmailAcc] = useState<any>('')
  const [valueEmailPass, setValueEmailPass] = useState<any>('')

  async function signInEmail() {
    //giapvancanh1997@gmail.com
    const data = {
      email: valueEmailAcc,
      password: valueEmailPass
    }

    try {
      const res = await postLogin(data)
      if (res.status === 200) {
        alert('Login is success.')
        localStorage.setItem('accessToken', res.data.data.accessToken)
        localStorage.setItem('refreshToken', res.data.data.refreshToken)
      }

      router.push('/home')
    } catch (error: any) {
      if (error && error.response.status === 404) {
        alert('Login is fail !')
      }
    }
  }

  return (
    <div>
      <Box sx={{}}>
        <h1 style={{ fontSize: '2rem', color: '#212121', textAlign: 'center' }}>Sign in to Loom</h1>

        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
          <button style={stylesButtonLogin}>
            <div style={{ marginRight: '5px' }}>
              <img
                style={{ width: '32px', height: '32px' }}
                src='/images/icons/project-icons/icon-google-v1.png'
                alt=''
              />
            </div>
            <p style={styleTagP}>Sign in with Google</p>
          </button>

          <button style={stylesButtonLogin}>
            <div style={{ marginRight: '5px' }}>
              <img
                style={{ width: '32px', height: '32px' }}
                src='/images/icons/project-icons/icon-slack-v1.png'
                alt=''
              />
            </div>
            <p style={styleTagP}>Sign in with Slack</p>
          </button>

          <button style={stylesButtonLogin}>
            <div style={{ marginRight: '5px' }}>
              <img
                style={{ width: '32px', height: '32px' }}
                src='/images/icons/project-icons/icon-apple-v1.png'
                alt=''
              />
            </div>
            <p style={styleTagP}>Sign in with Apple</p>
          </button>

          <button style={stylesButtonLogin}>
            <div style={{ marginRight: '5px' }}>
              <img
                style={{ width: '32px', height: '32px' }}
                src='/images/icons/project-icons/icon-outlook-v1.png'
                alt=''
              />
            </div>
            <p style={styleTagP}>Sign in with Outlook</p>
          </button>

          <button style={stylesButtonLogin}>
            <div style={{ marginRight: '5px' }}>
              <img
                style={{ width: '32px', height: '32px' }}
                src='/images/icons/project-icons/icon-user-v1.png'
                alt=''
              />
            </div>
            <p style={styleTagP}>Sign in with SSO</p>
          </button>

          <button style={stylesButtonLogin} onClick={handleOpenModalEmail}>
            <div style={{ marginRight: '5px' }}>
              <img
                style={{ width: '25px', height: '32px' }}
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
          <Box sx={{ fontSize: '14px' }}>
            <Box sx={{ position: 'relative' }}>
              <TextField
                value={valueEmailAcc}
                onChange={(event: any) => setValueEmailAcc(event.target.value)}
                sx={{
                  height: '40px',
                  width: '100%',
                  input: {
                    padding: '12px',
                    paddingLeft: '35px',
                    position: 'relative',
                    fontSize: '12px'
                  },
                  label: {
                    paddingLeft: '30px'
                  }
                }}
                id='outlined-password-input'
                placeholder='Enter your email'
                type='text'
              />
              <MailOutlineIcon
                sx={{ position: 'absolute', top: '11px', left: '8px', fontSize: '17px' }}
              ></MailOutlineIcon>
            </Box>

            <Box sx={{ marginTop: '20px', position: 'relative' }}>
              <TextField
                className='password_id'
                value={valueEmailPass}
                onChange={(event: any) => setValueEmailPass(event.target.value)}
                sx={{
                  height: '40px',
                  width: '100%',
                  input: {
                    padding: '12px',
                    paddingLeft: '35px',
                    position: 'relative',
                    fontSize: '12px'
                  },
                  label: {
                    paddingLeft: '40px'
                  }
                }}
                id='outlined-password-input'
                placeholder='Enter your password'
                type={showPass ? 'text' : 'password'}
              />
              <HttpsIcon sx={{ position: 'absolute', top: '11px', left: '8px', fontSize: '17px' }}></HttpsIcon>
              {showPass && (
                <RemoveRedEyeIcon
                  onClick={() => setShowPass(false)}
                  sx={{ position: 'absolute', top: '11px', right: '8px', fontSize: '17px' }}
                ></RemoveRedEyeIcon>
              )}

              {!showPass && (
                <VisibilityOffIcon
                  onClick={() => setShowPass(true)}
                  sx={{ position: 'absolute', top: '11px', right: '8px', fontSize: '17px' }}
                ></VisibilityOffIcon>
              )}
            </Box>

            <button
              style={{
                height: '40px',
                background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
                borderRadius: '25px',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                border: 'none',
                cursor: 'pointer',
                marginTop: '27px'
              }}
              onClick={signInEmail}
            >
              <span style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 700 }}>Sign in</span>
            </button>

            <button
              style={{
                display: 'none',
                width: '100%',
                background: 'none',
                border: 'none',
                marginTop: '10px',
                fontWeight: 500,
                fontSize: '11px',
                textAlign: 'center',
                color: '#F85850'
              }}
            >
              Forgot password?
            </button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default LoginPageV1
