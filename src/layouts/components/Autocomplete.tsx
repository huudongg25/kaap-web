// ** React Imports
import { useEffect, useCallback, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'

import Button from '@mui/material/Button'

const AutocompleteComponent = () => {
  // ** States
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [openDialog, setOpenDialog] = useState<boolean>(false)

  useEffect(() => {
    setIsMounted(true)

    return () => setIsMounted(false)
  }, [])

  // Handle ESC & shortcut keys keydown events
  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      // ** Shortcut keys to open searchbox (Ctrl + /)
      if (!openDialog && event.ctrlKey && event.which === 191) {
        setOpenDialog(true)
      }
    },
    [openDialog]
  )

  // Handle shortcut keys keyup events
  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      // ** ESC key to close searchbox
      if (openDialog && event.keyCode === 27) {
        setOpenDialog(false)
      }
    },
    [openDialog]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeydown)
    document.addEventListener('keyup', handleKeyUp)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyUp, handleKeydown])

  const _recordVideo = () => {
    window.open(`chrome-extension://${process.env.NEXT_PUBLIC_EXTENSION_ID}/html/popup.html`, '_self')
  }

  if (!isMounted) {
    return null
  } else {
    return (
      <Box
        className={'autocomplete-sidebar'}
        sx={{
          display: 'flex',
          marginTop: 2,
          marginBottom: 2,
          justifyContent: 'space-between',
          width: 'calc(100% - 220px)',
          '@media (max-width:919px)': { width: '100%' }
        }}
      >
        {/* <FormControl sx={{ width: '40ch' }} variant='outlined'>
          <InputLabel sx={{ marginBottom: 3 }} htmlFor='outlined-adornment-password'>
            Search
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            type={'text'}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton aria-label='toggle password visibility' edge='end'>
                  <Icon icon='mdi:magnify' />
                </IconButton>
              </InputAdornment>
            }
            label='Search'
            sx={{ height: '50px' }}
          />
        </FormControl> */}
        <Box
          sx={{
            // width: '60ch',
            '@media (min-width:1440px)': { maxWidth: '60ch' },
            '@media (min-width:1366px)': { maxWidth: '50ch' },
            '@media (min-width:920px)': { maxWidth: '30ch' },
            '@media (max-width:919px)': { maxWidth: '0ch' }
          }}
        ></Box>
        <Button
          disabled
          onClick={_recordVideo}
          sx={{
            opacity: 0,
            disabled: 'true',
            textTransform: 'none',
            marginLeft: '55px',
            marginRight: '30px',
            background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
            height: '50px',
            '@media (min-width:920px)': { width: '150px' },
            '@media (max-width:919px)': { width: '150px', marginLeft: '0px', marginRight: '0px' }
          }}
          variant='contained'
        >
          Record a video
        </Button>
      </Box>
    )
  }
}

export default AutocompleteComponent
