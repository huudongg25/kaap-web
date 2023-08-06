import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import FolderIcon from '@mui/icons-material/Folder'
import IconButton from '@mui/material/IconButton'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import { restoreFolder, deleteIdFolder } from '../../service/home'

const ListFolder = ({ dataFolder, handleGetListFolder, search }: any) => {
  const [idItem, setIdItem] = useState('')
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>, item: any) => {
    setIdItem(item.id)
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleRestoreFolder = async () => {
    await restoreFolder(idItem)
    await handleGetListFolder(search)
  }
  const deleteFolderItem = async () => {
    await deleteIdFolder(idItem)
    await handleGetListFolder(search)
  }

  return (
    <div>
      <Grid sx={{ width: '100%', mt: '20px' }} container spacing={4}>
        {dataFolder.length > 0 &&
          dataFolder.map((item: any, index: number) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <div
                  style={{
                    cursor: 'pointer',
                    background: '#fff',
                    borderRadius: '10px',
                    maxWidth: 345,
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingLeft: '15px',
                    paddingRight: '5px',
                    boxShadow: '0px 2px 10px 0px rgb(76 78 100 / 22%)',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FolderIcon style={{ color: 'rgb(253, 181, 40)', fontSize: '40px' }} />
                    <div>
                      <div style={{ marginLeft: '15px', color: '#000', fontWeight: 500 }}>{item.name}</div>
                      <div
                        style={{
                          marginLeft: '15px',
                          color: 'rgba(76, 78, 100, 0.6)',
                          fontWeight: 400,
                          fontSize: '14px',
                          marginTop: '5px'
                        }}
                      >
                        {item.video.length} Video
                      </div>
                    </div>
                  </div>
                  <Box>
                    <Tooltip title='Open property folder'>
                      <IconButton onClick={e => handleOpenUserMenu(e, item)}>
                        <Icon icon={'mdi:dots-vertical'} />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
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
                        <Box onClick={handleRestoreFolder} sx={{ width: '100%', border: 'none' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                            <Icon icon={'icons8:recycling'} />
                            <p style={{ padding: 0, margin: 0, marginLeft: 10 }}>Recovery</p>
                          </Box>
                        </Box>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Box onClick={deleteFolderItem} sx={{ width: '100%', border: 'none' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                            <Icon icon={'uil:trash'} />
                            <p style={{ padding: 0, margin: 0, marginLeft: 10 }}>Permanently Delete</p>
                          </Box>
                        </Box>
                      </MenuItem>
                    </Menu>
                  </Box>
                </div>
              </Grid>
            )
          })}
      </Grid>
    </div>
  )
}

export default ListFolder
