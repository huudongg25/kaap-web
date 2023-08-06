import { useState } from 'react'
import SignIn from 'src/views/sign-up'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import SignInView from 'src/views/signin'

const Signin = () => {
  const [role, setRole] = useState(1)
  const handleSetRole = (val: number) => {
    setRole(val)
  }
  const styleSignIn = {
    width: '50%',
    textAlign: 'center',
    color: '#727272'
  }
  const styleSignUp = {
    width: '50%',
    textAlign: 'center',
    color: '#FFFFFF',
    background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
    borderRadius: '5px',
    margin: '1px 1px 1px 1px'
  }

  return (
    <>
      <Box sx={{ width: '300px', margin: '0 auto' }}>
        <Card variant='outlined'>
          <Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '17px',
                marginBottom: '17px'
              }}
            >
              <svg width='18' height='22' viewBox='0 0 18 22' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M0.00012207 0C3.85197 0 4.79847 2.50677 4.79847 5.8989V8.52261C6.37495 6.65168 6.92747 5.99589 8.50394 4.12496C11.8315 0.175426 12.3603 0 17.7043 0L8.63718 10.4385C11.5051 14.2924 14.3731 18.1462 17.2411 22C14.2433 22 10.6806 21.0112 8.9955 18.7488L4.79847 13.1141V22C1.50404 22 0.00012207 17.9035 0.00012207 14.988C0.00012207 8.27419 0.00012207 6.71378 0.00012207 0Z'
                  fill='url(#paint0_linear_86_245)'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_86_245'
                    x1='4.62816'
                    y1='11'
                    x2='10.4053'
                    y2='11'
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stop-color='#FF74A6' />
                    <stop offset='1' stop-color='#FFC371' />
                  </linearGradient>
                </defs>
              </svg>
              <Typography
                sx={{
                  color: '#282828',
                  fontSize: '17px',
                  fontWeight: 700,
                  marginLeft: 1
                }}
              >
                Kaap
              </Typography>
            </Box>
            <Box
              sx={{
                marginTop: '17px',
                display: 'flex',
                width: '90%',
                height: '30px',
                borderRadius: '7px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E8E8E8',
                margin: '0 auto',
                cursor: 'pointer'
              }}
            >
              <Box onClick={() => handleSetRole(1)} sx={role == 1 ? styleSignUp : styleSignIn}>
                Sign In
              </Box>
              <Box onClick={() => handleSetRole(2)} sx={role == 2 ? styleSignUp : styleSignIn}>
                Sign Up
              </Box>
            </Box>
          </Box>

          {role == 1 && <SignInView />}

          {role == 2 && <SignIn />}
          <Typography
            sx={{
              marginBottom: '32px',
              textAlign: 'center',
              marginTop: '17px',
              fontSize: '11px',
              fontWeight: 400
            }}
          >
            By signing up you agree to our Terms of Service.
          </Typography>
        </Card>
      </Box>
    </>
  )
}

export default Signin
