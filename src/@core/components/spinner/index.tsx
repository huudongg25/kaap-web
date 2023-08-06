// ** MUI Import
// import { useTheme } from '@mui/material/styles'
import Box, { BoxProps } from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const FallbackSpinner = ({ sx }: { sx?: BoxProps['sx'] }) => {
  // ** Hook
  // const theme = useTheme()

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        ...sx
      }}
    >


      <svg width="40" height="40" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.00012207 0C3.85197 0 4.79847 2.50677 4.79847 5.8989V8.52261C6.37495 6.65168 6.92747 5.99589 8.50394 4.12496C11.8315 0.175426 12.3603 0 17.7043 0L8.63718 10.4385C11.5051 14.2924 14.3731 18.1462 17.2411 22C14.2433 22 10.6806 21.0112 8.9955 18.7488L4.79847 13.1141V22C1.50404 22 0.00012207 17.9035 0.00012207 14.988C0.00012207 8.27419 0.00012207 6.71378 0.00012207 0Z" fill="url(#paint0_linear_86_245)" />
        <defs>
          <linearGradient id="paint0_linear_86_245" x1="4.62816" y1="11" x2="10.4053" y2="11" gradientUnits="userSpaceOnUse">
            <stop stop-color="#FF74A6" />
            <stop offset="1" stop-color="#FFC371" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress disableShrink sx={{
        mt: '15px', color: '#ff74a6'
      }} />
    </Box>
  )
}

export default FallbackSpinner
