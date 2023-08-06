import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useState } from 'react'

const SignIn = () => {
  const signIn = [
    { name: 'Sign Up With Google', image: '/images/icons/project-icons/googleIcon.png' },
    { name: 'Sign Up With Slack', image: '/images/icons/project-icons/slackIcon.png' },
    { name: 'Sign Up With Apple', image: '/images/icons/project-icons/appleIcon.png' },
    { name: 'Sign Up With Outlook', image: '/images/icons/project-icons/outlookIcon.png' },
    { name: 'Sign Up With Email', image: '/images/icons/project-icons/envelopeClosed.png' }
  ]
  const [listSignIn] = useState(signIn)

  return (
    <>
      <Box sx={{ marginLeft: '14px', marginRight: '14px' }}>
        <Box>
          <Grid sx={{ marginTop: '17px' }} container spacing={2}>
            {listSignIn.length &&
              listSignIn.map((item: any, index: number) => {
                return (
                  <Grid key={index} item xs={6}>
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
                          fontWeight: 500,
                          fontSize: '12px',
                          lineHeight: '14px',
                          color: '#2C2C2C',
                          letterSpacing: '0.2px',
                          marginBottom: '14px'
                        }}
                      >
                        {item.name}
                      </p>
                    </Box>
                  </Grid>
                )
              })}
          </Grid>
        </Box>
      </Box>
    </>
  )
}

export default SignIn
