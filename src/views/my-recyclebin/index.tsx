import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Icon } from '@iconify/react'
import Grid from '@mui/material/Grid'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { restoreVideo, deleteIdVideo, deleteIdFolder, restoreFolder } from '../../service/home'
import React, { useState } from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import { styled } from '@mui/material/styles'
import FolderIcon from '@mui/icons-material/Folder'
import { useRouter } from 'next/router'
import Modal from '@mui/material/Modal'

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

const MyRecycle = ({ dataVideo, handleDeletedDate, showIconList, sorfDate, setDataVideo }: any) => {
  const router = useRouter()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [idItem, setIdItem] = useState('')
  const [typeItem, setTypeItem] = useState('')
  const [isDelete, setIsDelete] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [textModal, setTextModal] = useState('')

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>, item: any) => {
    setIdItem(item.idFolderOrVideo)
    setTypeItem(item.type)
    setAnchorElUser(event.currentTarget)
  }
  const handleAction = async () => {
    const dataNew = dataVideo.filter((item: any) => item.idFolderOrVideo != idItem)
    setDataVideo(dataNew)
    setOpenModalDelete(false)
    if (isDelete) {
      if (typeItem == '2') {
        await deleteIdVideo(idItem)
      } else {
        await deleteIdFolder(idItem)
      }
    } else {
      if (typeItem == '2') {
        await restoreVideo(idItem)
      } else {
        await restoreFolder(idItem)
      }
    }
  }
  const handleCloseModalDelete = () => {
    setOpenModalDelete(false)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleRestoreVide = () => {
    setTextModal('Are you sure you want to recovery this file? ')
    setIsDelete(false)
    setOpenModalDelete(true)
  }
  const deleteVideoItem = () => {
    setTextModal('Are you sure you want to permanently delete this file? ')
    setIsDelete(true)
    setOpenModalDelete(true)
  }
  const styleModalDelete = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    borderRadius: '5px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    pt: 8,
    px: 5,
    pb: 8
  }

  return (
    <div>
      <Modal
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={{ ...styleModalDelete, width: 500 }}>
          <Icon
            style={{ marginRight: 5, fontSize: '40px', color: '#bb4d4d', marginBottom: '10px' }}
            icon={'mdi:delete-circle'}
          />
          <Typography sx={{ fontSize: '20px', fontWeight: '500', marginBottom: '25px', textAlign: 'center' }}>
            {textModal}
          </Typography>
          <Box>
            <Button
              sx={{ ml: 2, mr: 5, textTransform: 'none' }}
              color='secondary'
              variant='contained'
              onClick={handleCloseModalDelete}
            >
              No
            </Button>
            <Button
              onClick={handleAction}
              sx={{ mr: 2, ml: 5, textTransform: 'none' }}
              color='error'
              variant='contained'
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
      <Box
        sx={{
          width: '100%',
          height: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          transform: 'translateY(-8px)'
        }}
      >
        <Typography sx={{ mb: 0, fontSize: '13px', width: '50%', left: '0' }}>
          {'Messages in Trash are automatically deleted after 30 days.'}
        </Typography>
        <Button
          sx={{ color: '#FF74A6', textTransform: 'none', transform: 'translateY(-7px)', padding: '0 8px' }}
          onClick={handleDeletedDate}
        >
          {'Date deleted'}
          <Icon style={{ fontSize: '0.8rem', color: '#FF74A6' }} icon={!sorfDate ? 'mdi:arrow-up' : 'mdi:arrow-down'} />
        </Button>
      </Box>

      <Box sx={{ width: '100%' }}>
        {showIconList == 'false' && (
          <Grid container rowSpacing={8} spacing={4} sx={{ position: 'relative', top: '0.2rem' }}>
            {dataVideo.length > 0 &&
              dataVideo.map((item: any, index: number) => {
                return (
                  <>
                    <Grid
                      style={{ display: !!item?.stringShowTime ? 'flex' : 'none' }}
                      key={index}
                      item
                      xs={4}
                      sm={12}
                      md={12}
                      lg={12}
                    >
                      <div>{item?.stringShowTime}</div>
                    </Grid>
                    <Grid key={index} item xs={12} sm={6} md={4} lg={3} style={{ height: '305px', maxWidth: '281px' }}>
                      {item.type == '2' && (
                        <div
                          style={{
                            width: '270px',
                            transition: '0.3s ease-in-out',
                            borderWidth: '3px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            background: '#fff',
                            border: '1px solid rgba(76, 78, 100, 0.2)'
                          }}
                        >
                          <div
                            onClick={() => {
                              router.push(`my-library/watch-video/${item.idFolderOrVideo}`)
                            }}
                            style={{
                              overflow: 'hidden',
                              width: '269px',
                              height: '214px',
                              objectFit: 'fill',
                              borderTopLeftRadius: '8px',
                              borderTopRightRadius: '8px'
                            }}
                          >
                            <video
                              playsInline
                              style={{
                                objectFit: 'fill',
                                height: '100%',
                                width: '100%',
                                borderRadius: '1px solid rgba(76, 78, 100, 0.2)'
                              }}
                              className='list-item-video'
                            >
                              <source src={item.linkVideo} type='video/mp4' />
                            </video>
                          </div>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <ProfilePicture
                              style={{ borderRadius: '50%', width: 55, height: 55, marginLeft: 3 }}
                              src={item.user?.avatar}
                              alt='profile-picture'
                            />
                            <Box sx={{ flex: 1, marginLeft: 2, width: '60%' }}>
                              <div
                                style={{
                                  overflow: 'hidden',
                                  whiteSpace: 'nowrap',
                                  textOverflow: 'ellipsis',
                                  marginBottom: '0px',
                                  fontSize: '1.1rem',
                                  width: '100%',
                                  left: '0',
                                  color: '#000',
                                  marginTop: 2
                                }}
                              >
                                {item.name}
                              </div>
                            </Box>
                            <Box>
                              <Tooltip title='Open property folder'>
                                <IconButton onClick={e => handleOpenUserMenu(e, item)}>
                                  <Icon icon={'mdi:dots-vertical'} />
                                </IconButton>
                              </Tooltip>
                              <Menu
                                id='menu-appbar'
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right'
                                }}
                                keepMounted
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right'
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                              >
                                <MenuItem onClick={handleCloseUserMenu}>
                                  <Box onClick={handleRestoreVide} sx={{ width: '100%', border: 'none' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                                      <Icon icon={'icons8:recycling'} />
                                      <p style={{ padding: 0, margin: 0, marginLeft: 10 }}>Recovery</p>
                                    </Box>
                                  </Box>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                  <Box onClick={deleteVideoItem} sx={{ width: '100%', border: 'none' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                                      <Icon icon={'uil:trash'} />
                                      <p style={{ padding: 0, margin: 0, marginLeft: 10 }}>Permanently Delete</p>
                                    </Box>
                                  </Box>
                                </MenuItem>
                              </Menu>
                            </Box>
                          </Box>
                        </div>
                      )}
                      {item.type == '1' && (
                        <div
                          style={{
                            width: '271px',
                            transition: '0.3s ease-in-out',
                            borderWidth: '3px',
                            borderRadius: '8px',
                            cursor: 'not-allowed',
                            background: '#fff',
                            opacity: 0.6,
                            border: '1px solid rgba(76, 78, 100, 0.2)'
                          }}
                        >
                          <div
                            style={{
                              height: '215px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <FolderIcon style={{ fontSize: '60px' }} />
                          </div>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <ProfilePicture
                              style={{ borderRadius: '50%', width: 55, height: 55, marginLeft: 3 }}
                              src={item.user?.avatar}
                              alt='profile-picture'
                            />
                            <Box sx={{ flex: 1, marginLeft: 1, width: '60%' }}>
                              <div
                                style={{
                                  overflow: 'hidden',
                                  whiteSpace: 'nowrap',
                                  textOverflow: 'ellipsis',
                                  marginBottom: '0px',
                                  fontSize: '1.1rem',
                                  width: '100%',
                                  left: '0',
                                  color: '#000',
                                  marginTop: 2
                                }}
                              >
                                {item.name}
                              </div>
                            </Box>
                            <Box>
                              <Tooltip title='Open property folder'>
                                <IconButton onClick={e => handleOpenUserMenu(e, item)}>
                                  <Icon icon={'mdi:dots-vertical'} />
                                </IconButton>
                              </Tooltip>
                              <Menu
                                id='menu-appbar'
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right'
                                }}
                                keepMounted
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right'
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                              >
                                <MenuItem onClick={handleCloseUserMenu}>
                                  <Box onClick={handleRestoreVide} sx={{ width: '100%', border: 'none' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                                      <Icon icon={'icons8:recycling'} />
                                      <p style={{ padding: 0, margin: 0, marginLeft: 10 }}>Recovery</p>
                                    </Box>
                                  </Box>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                  <Box onClick={deleteVideoItem} sx={{ width: '100%', border: 'none' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                                      <Icon icon={'uil:trash'} />
                                      <p style={{ padding: 0, margin: 0, marginLeft: 10 }}>Permanently Delete</p>
                                    </Box>
                                  </Box>
                                </MenuItem>
                              </Menu>
                            </Box>
                          </Box>
                        </div>
                      )}
                    </Grid>
                  </>
                )
              })}
          </Grid>
        )}
        {showIconList == 'true' && (
          <TableContainer sx={{ width: '100%' }} component={Paper}>
            <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography
                        style={{
                          marginTop: 6,
                          textTransform: 'none',
                          marginLeft: 3
                        }}
                      >
                        {'Name'}
                      </Typography>
                      <Icon style={{ fontSize: 20, marginLeft: 10 }} icon='mdi:arrow-up' />
                    </Box>
                  </TableCell>
                  <TableCell align={'center'}>
                    <Typography sx={{ opacity: 0.8, textTransform: 'none' }}>Owner</Typography>
                  </TableCell>
                  <TableCell>{}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataVideo.map((item: any, indexTable: number) => {
                  return (
                    <>
                      <TableRow
                        key={indexTable}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          height: 50,
                          display: !!item?.stringShowTime ? 'auto' : 'none'
                        }}
                      >
                        <TableCell component='th' scope='row'>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginRight: 10 }}>{item?.stringShowTime}</div>
                          </div>
                        </TableCell>
                        <TableCell align={'center'}></TableCell>
                        <TableCell align={'center'}></TableCell>
                      </TableRow>
                      <TableRow
                        onClick={() => {
                          item.type == '2' && router.push(`my-library/watch-video/${item.idFolderOrVideo}`)
                        }}
                        key={indexTable}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                          cursor: item.type == '2' ? 'pointer' : 'not-allowed',
                          opacity: item.type == '2' ? 1 : 0.6
                        }}
                      >
                        <TableCell component='th' scope='row'>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ maxWidth: 50 }}>
                              {item.type == '2' && (
                                <div style={{ overflow: 'hidden', width: '100%', height: '40px', borderRadius: '5px' }}>
                                  <video
                                    playsInline
                                    style={{ transform: 'scale(1.4)' }}
                                    className='list-item-video'
                                    height='100%'
                                  >
                                    <source src={item.linkVideo} type='video/mp4' />
                                  </video>
                                </div>
                              )}
                              {item.type == '1' && (
                                <FolderIcon
                                  style={{
                                    height: '22px',
                                    width: '22px',
                                    cursor: 'pointer',
                                    position: 'relative',
                                    left: '10px'
                                  }}
                                />
                              )}
                            </div>
                            <Box>
                              <div
                                style={{
                                  position: 'relative',
                                  left: '31px',

                                  whiteSpace: 'nowrap',
                                  textOverflow: 'ellipsis',
                                  width: '80%'
                                }}
                              >
                                {item.name}
                              </div>
                            </Box>
                          </div>
                        </TableCell>
                        <TableCell align={'center'}>{localStorage.getItem('user-name')}</TableCell>
                        <TableCell>
                          <div>
                            <Box sx={{ flexGrow: 0 }}>
                              <Tooltip title='Open property Video'>
                                <IconButton onClick={(e: any) => handleOpenUserMenu(e, item)} sx={{ p: 0 }}>
                                  <Icon icon={'mdi:dots-vertical'} />
                                </IconButton>
                              </Tooltip>
                              <Menu
                                id='menu-appbar'
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right'
                                }}
                                keepMounted
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'right'
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                              >
                                <MenuItem onClick={handleCloseUserMenu}>
                                  <Box onClick={handleRestoreVide} sx={{ width: '100%', border: 'none' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                                      <Icon icon={'icons8:recycling'} />
                                      <p style={{ padding: 0, margin: 0, marginLeft: 10 }}>Recovery</p>
                                    </Box>
                                  </Box>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                  <Box onClick={deleteVideoItem} sx={{ width: '100%', border: 'none' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                                      <Icon icon={'uil:trash'} />
                                      <p style={{ padding: 0, margin: 0, marginLeft: 10 }}>Permanently Delete</p>
                                    </Box>
                                  </Box>
                                </MenuItem>
                              </Menu>
                            </Box>
                          </div>
                        </TableCell>
                      </TableRow>
                    </>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </div>
  )
}

export default MyRecycle
