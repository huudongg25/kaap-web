import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import IconButton from '@mui/material/IconButton'
import FormControl from '@mui/material/FormControl'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'
import { Icon } from '@iconify/react'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import { useRouter } from 'next/router'

const MyHistory = ({
  listHistory,
  handleClickIconX,
  clickIconDeleteAll,
  isShowPlay,
  clickIconPlay,
  isShowGlass,
  clickIconGlass,
  search,
  isSearch,
  setIsSearch,
  handleChangeSearch,
  clickIconSearch,
  handleCloseSearchInput
}: any) => {
  const router = useRouter()

  const _handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      clickIconSearch()
    }
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
          ml: { xs: 0, md: 0 },
          alignItems: 'center',
          flexWrap: ['wrap', 'nowrap'],
          justifyContent: ['center', 'space-between'],
          marginTop: '-1.2rem'
        }}
      >
        <Typography sx={{ mb: 0, fontSize: '16px', width: '60%', left: '0', fontWeight: '450' }}>
          {'My History'}
        </Typography>
        {isSearch ? (
          <FormControl sx={{ width: '25%' }} variant='outlined'>
            <InputLabel sx={{ position: 'relative', top: 15 }} htmlFor='outlined-adornment-password'>
              Search video
            </InputLabel>
            <OutlinedInput
              onBlur={handleCloseSearchInput}
              autoFocus
              value={search}
              onChange={e => handleChangeSearch(e.target.value)}
              onKeyDown={_handleKeyDown}
              id='outlined-adornment-password'
              type={'text'}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={() => clickIconSearch()} aria-label='toggle password visibility' edge='end'>
                    <Icon icon='mdi:magnify' />
                  </IconButton>
                </InputAdornment>
              }
              label='Search video'
              sx={{ height: '35px' }}
            />
          </FormControl>
        ) : (
          <div style={{ width: '30%', display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton aria-label='toggle password visibility' onClick={() => setIsSearch(true)} edge='end'>
              <Icon icon='mdi:magnify' />
            </IconButton>
          </div>
        )}
      </Box>
      <Box>
        <Grid container spacing={10}>
          <Grid
            item
            xs={12}
            lg={8.7}
            md={8.7}
            sx={{
              position: 'relative',
              top: '3rem ',

              height: '800px',
              paddingTop: '0px !important',
              overflowX: 'auto',
              '&::-webkit-scrollbar': {
                width: '0'
              }
            }}
          >
            {listHistory.length > 0 &&
              listHistory.map((item: any, index: number) => {
                return (
                  <>
                    <div style={{ display: !!item?.stringShowTime ? 'flex' : 'none' }}>{item?.stringShowTime}</div>
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        width: '100%',
                        marginTop: 3.9,
                        marginBottom: 3.9,
                        height: '180px',
                        cursor: 'pointer',
                        ':hover': {
                          background: 'rgba(76, 78, 100, 0.12)',
                          boxShadow: '0px 2px 10px 0px rgb(76 78 100 / 22%)',
                          borderTopLeftRadius: '10px',
                          borderBottomLeftRadius: '10px'
                        }
                      }}
                      onClick={() => {
                        router.push(`my-library/watch-video/${item?.video?.id}`)
                      }}
                    >
                      <Box sx={{ display: 'flex', width: '97%' }}>
                        <Box
                          sx={{
                            width: '45%',
                            position: 'relative',
                            right: '34px',
                            '@media screen and (max-width: 1300px ) and (min-width: 1200px)': {
                              width: '70%'
                            }
                          }}
                        >
                          <Card
                            sx={{
                              overflow: 'hidden',
                              height: '100%',
                              margin: '0px 37px',
                              '@media screen and (max-width: 1188px)': {
                                marginRight: '0px'
                              }
                            }}
                          >
                            <video
                              playsInline
                              style={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'fill'
                              }}
                              className='list-item-video'
                            >
                              <source src={item.video?.link} type='video/mp4' />
                            </video>
                          </Card>
                        </Box>
                        <Box
                          sx={{
                            width: '50%',
                            p: 3,
                            padding: '0.75rem',
                            position: 'relative',
                            right: '4rem',
                            '@media screen and (max-width: 1188px)': {
                              left: '-2rem'
                            }
                          }}
                        >
                          <div
                            style={{
                              color: '#000',
                              fontSize: '1.3rem',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {item.video?.name}
                          </div>
                          <Typography
                            sx={{ color: '#000', fontSize: '15px', opacity: 0.5 }}
                            variant='body1'
                            gutterBottom
                          >
                            {item.user.username}
                          </Typography>
                        </Box>
                      </Box>
                      <div>
                        <Icon
                          onClick={e => {
                            handleClickIconX(e, item.id)
                          }}
                          style={{
                            fontSize: 25,
                            cursor: 'pointer',
                            position: 'relative',
                            right: '5px'
                          }}
                          icon={'material-symbols:close'}
                        />
                      </div>
                    </Box>
                  </>
                )
              })}
          </Grid>
          <Grid item xs={12} lg={3.3} md={3.3} sx={{ marginTop: '5.6px' }}>
            <Box
              onClick={() => clickIconDeleteAll()}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                ':hover': { color: '#FF74A6' }
              }}
            >
              <Icon style={{ fontSize: 24 }} icon={'ph:trash'} />
              <p style={{ marginLeft: 4 }}>Clear all watch history</p>
            </Box>
            <Box
              onClick={() => clickIconPlay()}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                ':hover': { color: '#FF74A6' }
              }}
            >
              {!isShowPlay && <Icon style={{ fontSize: 24 }} icon={'ic:outline-pause-circle-outline'} />}
              {isShowPlay && <PlayCircleOutlineIcon style={{ fontSize: 24 }} />}
              <p style={{ marginLeft: 4 }}>Pause watch history</p>
            </Box>
            <Box
              onClick={() => clickIconGlass()}
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                ':hover': { color: '#FF74A6' }
              }}
            >
              {isShowGlass && <Icon style={{ fontSize: 24 }} icon={'ic:sharp-hourglass-bottom'} />}
              {!isShowGlass && <Icon style={{ fontSize: 24 }} icon={'ic:sharp-hourglass-disabled'} />}
              <p style={{ marginLeft: 4 }}>Delete automation</p>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default MyHistory
