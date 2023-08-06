import React, { useState } from 'react'
import { Box, Grid, TextField } from '@mui/material'

import MailOutlineIcon from '@mui/icons-material/MailOutline'
import HttpsIcon from '@mui/icons-material/Https'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { postLogin } from '../../service/auth'
import { useRouter } from 'next/router'

function SignInView() {
  const listSignIn = [
    { image: '/images/icons/project-icons/googleIcon.png', content: 'Sign In With Google', keyWord: 'google' },
    { image: '/images/icons/project-icons/slackIcon.png', content: 'Sign In With Slack', keyWord: 'slack' },
    { image: '/images/icons/project-icons/appleIcon.png', content: 'Sign In With Apple', keyWord: 'apple' },
    { image: '/images/icons/project-icons/userIcon.png', content: 'Sign In With SSO', keyWord: 'sso' },
    { image: '/images/icons/project-icons/outlookIcon.png', content: 'Sign In With Outlook', keyWord: 'outlook' },
    { image: '/images/icons/project-icons/envelopeClosed.png', content: 'Sign In With Email', keyWord: 'email' }
  ]
  const router = useRouter()

  const [showSignIn, setShowSignIn] = useState<boolean>(true)
  const [showEmail, setShowEmail] = useState<boolean>(false)

  const [showSSO, setShowSSO] = useState<boolean>(false)

  function clickSignIn(item: any) {
    if (item.keyWord === 'email') {
      setShowEmail(true)
      setShowSignIn(false)
      setShowSSO(false)
    } else if (item.keyWord === 'sso') {
      setShowEmail(false)
      setShowSignIn(false)
      setShowSSO(true)
    }
  }

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
        alert('Login to failed !')
      }
    }
  }

  return (
    <div>
      <Box sx={{ width: '300px', background: '#FFFFFF', padding: '14px' }}>
        {showSignIn && (
          <Grid container spacing={2}>
            {listSignIn &&
              listSignIn.map((item: any, index: number) => {
                return (
                  <Grid sx={{ cursor: 'pointer' }} key={index} item xs={6} onClick={() => clickSignIn(item)}>
                    <Box
                      sx={{
                        border: '1px solid #C2C2C2',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center'
                      }}
                    >
                      <img style={{ width: '18px', height: '18px', marginTop: '14px' }} src={item.image} alt='' />
                      <p
                        style={{
                          fontFamily: 'Roboto',
                          fontWeight: 500,
                          fontSize: '12px',
                          lineHeight: '14px',
                          color: '#2C2C2C',
                          letterSpacing: '0.2px',
                          marginBottom: '14px'
                        }}
                      >
                        {item.content}
                      </p>
                    </Box>
                  </Grid>
                )
              })}
          </Grid>
        )}

        {/* Email sign in */}
        {showEmail && (
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
        )}

        {/* SSO sign in */}
        {showSSO && (
          <Box sx={{ fontSize: '14px' }}>
            <Box sx={{ position: 'relative' }}>
              <TextField
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
            >
              <span style={{ color: '#FFFFFF', fontSize: '15px', fontWeight: 700 }}>Sign in</span>
            </button>

            <button
              style={{
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
        )}
      </Box>
    </div>
  )
}

export default SignInView
