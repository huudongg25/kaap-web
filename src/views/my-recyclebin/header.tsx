import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import Button from '@mui/material/Button'
import { Icon } from '@iconify/react'
import { deleteAllFolder, deleteAllVideo } from 'src/service/home'

const RecycleHeader = ({
  nameSearch,
  handleChangeNameSearch,
  handleSearchName,
  showIconList,
  handleSetIconShowList,
  isSearch,
  setIsSearch,
  handleCloseSearchInput,
  handleGetListVideo,
}: any) => {
  const _handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSearchName()
    }
  }

  const handleDeleteAll = async () => {
    await deleteAllVideo()
    await deleteAllFolder()
    await handleGetListVideo()
  }
  const handlePermanentlyDelete = () => {
    handleDeleteAll()
  }

  return (
    <Box>
      <Box
        sx={{ width: '100%', height: '1px', backgroundColor: 'rgba(76, 78, 100, 0.38)', marginBottom: '30px' }}
      ></Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          position: 'relative',
          top: '-1rem',
          ml: { xs: 0, md: 0 },
          alignItems: 'center',
          flexWrap: ['wrap', 'nowrap'],
          justifyContent: ['center', 'space-between']
        }}
      >
        <div style={{ width: '100%' }}>
          <Typography
            sx={{
              mb: 5,
              fontSize: '17px',
              width: '100%',
              left: '0',
              fontWeight: '450',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {'Recycle Bin'}
          </Typography>
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'end',alignItems:'center' }}>
          {isSearch ? (
            <FormControl sx={{ m: 1, width: '40%' }} variant='outlined'>
              <InputLabel sx={{ fontSize: '16px', top: '-5px' }} htmlFor='outlined-adornment-password'>
                Search recycle bin
              </InputLabel>
              <OutlinedInput
                sx={{ height: '35px', input: { padding: '5px', paddingLeft: '10px' } }}
                onBlur={handleCloseSearchInput}
                autoFocus
                id='outlined-adornment-password'
                value={nameSearch}
                onChange={e => handleChangeNameSearch(e.target.value)}
                onKeyDown={_handleKeyDown}
                type={'text'}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton aria-label='toggle password visibility' onClick={() => handleSearchName()} edge='end'>
                      <Icon icon='mdi:magnify' />
                    </IconButton>
                  </InputAdornment>
                }
                label='Search recycle bin'
              />
            </FormControl>
          ) : (
            <div style={{ width: '40%', display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton aria-label='toggle password visibility' onClick={() => setIsSearch(true)} edge='end'>
                <Icon icon='mdi:magnify' />
              </IconButton>
            </div>
          )}
          <Button variant='text' onClick={handleSetIconShowList}>
            {showIconList == 'true' && <Icon style={{ fontSize: 30, color: '#FF74A6' }} icon='mdi:list-box-outline' />}
            {showIconList == 'false' && (
              <Icon style={{ fontSize: 30, color: '#FF74A6' }} icon='mdi:view-grid-plus-outline' />
            )}
          </Button>
          <Button
          onClick={handlePermanentlyDelete}
          sx={{
            height:'32px',
            padding:'0 8px',
            textTransform: 'none',
            background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
            fontSize: '12px',
          }}
          variant='contained'
        >
          {'Empty trash now'}
        </Button>
        </div>
      </Box>
    </Box>
  )
}
export default RecycleHeader
