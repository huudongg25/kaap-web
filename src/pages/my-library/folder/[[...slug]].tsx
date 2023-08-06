import Box from '@mui/material/Box'
import React, { useEffect, useState } from 'react'
import MyLibsFolder from '../../../views/my-library/myLibsFolder'
import { createFolder, getListFolder, getListPeopleShare, createVideo } from '../../../service/myLibrary'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { Icon } from '@iconify/react'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import MyLibsVideo from '../../../views/my-library/myLibsVideo'
import { useDispatch } from 'react-redux'
import { updateTreeSlice } from 'src/store/apps/tree'

function SlugFolder() {
  const styleModalNewFolder = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid theme[20]',
    boxShadow: 24,
    borderRadius: '7px',
    pt: 2,
    px: 8,
    pb: 5
  }
  const [paramApiListFolder, setParamApiListFolder] = useState<any>()
  const [, setParamApiListVideo] = useState<any>()
  const [listFolder, setListFolder] = useState<any[]>([])
  const [listFolderIdVideo, setListFolderIdVideo] = useState<any[]>([])
  const [paramApiListPeopleShare] = useState<any>({
    page: 1,
    limit: 100000,
    videoParent: true
  })
  const [keySearch, setKeySearch] = useState('')
  const [listPeopleShare, setListPeopleShare] = useState()
  const [showIconList, setShowIconList] = useState(false)
  const [nameCreateNewFolder, setNameCreateNewFolder] = useState('')
  const [nameCreateNewVideo, setNameCreateNewVideo] = useState('')
  const [linkCreateNewVideo, setLinkCreateNewVideo] = useState('')
  const [openModalNewFolder, setOpenModalNewFolder] = useState(false)
  const [openModalNewVideo, setOpenModalNewVideo] = useState(false)
  const [idApiFolder, setIdApiFolder] = useState('')
  const [userData, setUserData] = useState<any>()
  const [isSearch, setIsSearch] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setUserData({
      name: localStorage.getItem('user-name'),
      avatar: localStorage.getItem('avatar-img')
    })
  }, [])

  const callbackFunctionIdFolder = () => {
    fnGetListFolder(paramApiListFolder).then(r => r)
  }
  const callbackFunctionIdVideo = () => {
    fnGetListFolder(paramApiListFolder).then(r => r)
  }
  const handleOpenModalNewFolder = () => {
    setOpenModalNewFolder(true)
    setNameCreateNewFolder('')
  }
  const handleCloseModalNewFolder = () => {
    setOpenModalNewFolder(false)
  }
  const fnCreateFolder = async (nameFolder: string) => {
    try {
      setDisableFolder(true)
      let temp: { name: string; video: never[]; parentId?: string }
      if (idApiFolder === '') {
        temp = {
          name: nameFolder,
          video: []
        }
      } else {
        temp = {
          name: nameFolder,
          parentId: idApiFolder,
          video: []
        }
      }
      setListFolder([temp, ...listFolder])
      handleCloseModalNewFolder()
      await createFolder(temp)

      const res = await fnGetListFolder(paramApiListFolder)
      if (res?.status === 200) {
        setDisableFolder(false)
      }
    } catch (error: any) {}
  }

  const handleOnKeyPressCreateFolder = (event: any) => {
    if (event.key === 'Enter') {
      if (nameCreateNewFolder !== '') {
        fnCreateFolder(nameCreateNewFolder)
      }
    }
  }

  const handleCloseModalNewVideo = () => {
    setOpenModalNewVideo(false)
  }
  const [disableFolder, setDisableFolder] = useState<boolean>(false)
  const fnCreateVideo = async (nameVideo: string, link: string) => {
    try {
      let temp: any
      if (idApiFolder === '') {
        temp = {
          name: nameVideo,
          link: link
        }
      } else {
        temp = {
          name: nameVideo,
          link: link,
          folderId: idApiFolder
        }
      }
      setListFolderIdVideo([temp, ...listFolderIdVideo])
      handleCloseModalNewVideo()
      await createVideo(temp)
      await fnGetListFolder(paramApiListFolder)
    } catch (error) {}
  }

  const [, setShowSpinner] = useState<boolean>(true)
  const fnGetListFolder = async (data: any) => {
    try {
      const res = await getListFolder(data)
      setListFolder(res.data.data.listFolder.items)
      setListFolderIdVideo(res.data.data.videoParent)

      if (res.status === 200) {
        setShowSpinner(true)
      }
      setShowSpinner(false)

      return res
    } catch (error) {}
  }

  const fnGetListPeopleShare = async (param: any, sortType?: string, isFavorite?: string, name?: string) => {
    try {
      const res = await getListPeopleShare(param, sortType, isFavorite, name)
      setListPeopleShare(res.data.data.items)
    } catch (error) {}
  }
  const handleSearch = () => {
    fnGetListFolder({ ...paramApiListFolder, name: keySearch }).then(r => r)
  }

  const handleOnKeyPressSearchFolder = (event: any) => {
    if (event.key === 'Enter') {
      if (keySearch !== '') {
        handleSearch()
      }
    }
  }

  const handleCloseSearchInput = () => {
    if (isSearch && !keySearch) {
      setIsSearch(false)
    }
  }

  useEffect(() => {
    if (paramApiListFolder) {
      fnGetListFolder(paramApiListFolder)
    }
  }, [paramApiListFolder, idApiFolder])
  useEffect(() => {
    if (window.location.pathname.split('/').length <= 4) {
      const data = {
        page: 1,
        limit: 100000,
        videoParent: true
      }
      setParamApiListFolder(data)
      setParamApiListVideo(data)
    } else {
      const parentId = window.location.pathname.split('/')[window.location.pathname.split('/').length - 2]
      const data = {
        page: 1,
        limit: 100000,
        videoParent: true,
        parentId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 2]
      }
      setParamApiListFolder(data)
      setParamApiListVideo(data)
      setIdApiFolder(parentId)
    }
  }, [window.location.pathname])

  useEffect(() => {
    fnGetListPeopleShare(paramApiListPeopleShare).then(r => r)
  }, [paramApiListPeopleShare])
  useEffect(() => {
    setNameCreateNewFolder(nameCreateNewFolder)
  }, [nameCreateNewFolder])
  useEffect(() => {
    setNameCreateNewVideo(nameCreateNewVideo)
  }, [nameCreateNewVideo])
  useEffect(() => {
    setLinkCreateNewVideo(linkCreateNewVideo)
  }, [linkCreateNewVideo])
  const [focusInputVideoName, setFocusInputVideoName] = useState<boolean>(false)
  const [focusInputVideoLink, setFocusInputVideoLink] = useState<boolean>(false)

  useEffect(() => {
    return () => {
      localStorage.removeItem('tree')
      dispatch(
        updateTreeSlice({
          name: 'out-libs',
          id: 'out-libs',
          parent: {
            name: 'out-libs',
            id: 'out-libs'
          }
        })
      )
    }
  }, [])

  useEffect(() => {
    getShowList()
  }, [])

  const getShowList = () => {
    const item = localStorage.getItem('showListItem')
    if (item == 'true') {
      setShowIconList(true)
    } else {
      setShowIconList(false)
    }
  }

  return (
    <div>
      {
        <div style={{ position: 'relative' }}>
          <div className={'header-my-libs'}>
            <Box
              sx={{
                position: 'relative',
                top: '0rem',
                width: '100%',
                height: '1px',
                backgroundColor: 'rgba(76, 78, 100, 0.38)',
                mb: '30px'
              }}
            ></Box>
            <Box
              className={'box-text-search-folder'}
              sx={{
                width: '100%',
                display: 'flex',
                position: 'relative',
                top: '-1rem',
                ml: { xs: 0, md: 0 },
                alignItems: 'center',
                flexWrap: 'nowrap',
                justifyContent: ['center', 'flex-start']
              }}
            >
              <Box
                className='text-my-folder'
                sx={{
                  width: '80%',
                  display: 'flex',
                  position: 'relative',
                  bottom: '10px',
                  ml: { xs: 0, md: 0 },
                  alignItems: 'center',
                  flexWrap: ['wrap', 'nowrap'],
                  justifyContent: ['center', 'space-between'],
                  flexDirection: 'column'
                }}
              ></Box>
              {isSearch || openModalNewFolder ? (
                <FormControl className='form-search-bar' sx={{ m: 1, width: '20%' }} variant='outlined'>
                  <InputLabel
                    error={(isSearch && keySearch === '') || (openModalNewFolder && nameCreateNewFolder === '')}
                    sx={{ fontSize: '16px', top: '-10px' }}
                    htmlFor='outlined-adornment-password'
                  >
                    {openModalNewFolder ? 'Folder Name' : 'Search Folder'}
                  </InputLabel>
                  <OutlinedInput
                    sx={{ height: '36px', input: { padding: '5px', paddingLeft: '10px' } }}
                    onChange={(event: any) => {
                      if (openModalNewFolder) {
                        setNameCreateNewFolder(event.target.value)
                      } else {
                        setKeySearch(event && event.target.value)
                      }
                    }}
                    onBlur={handleCloseSearchInput}
                    autoFocus
                    id='outlined-adornment-password'
                    type={'text'}
                    onKeyPress={(event: any) => {
                      if (openModalNewFolder) {
                        handleOnKeyPressCreateFolder(event)
                      } else {
                        handleOnKeyPressSearchFolder(event)
                      }
                    }}
                    endAdornment={
                      isSearch && (
                        <InputAdornment position='end'>
                          <IconButton aria-label='toggle password visibility' onClick={handleSearch} edge='end'>
                            <Icon icon='mdi:magnify' />
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                    label='Search folder'
                    error={(isSearch && keySearch === '') || (openModalNewFolder && nameCreateNewFolder === '')}
                  />
                </FormControl>
              ) : (
                <div style={{ width: '20%', display: 'flex', justifyContent: 'flex-end' }}>
                  <IconButton aria-label='toggle password visibility' onClick={() => setIsSearch(true)} edge='end'>
                    <Icon icon='mdi:magnify' />
                  </IconButton>
                </div>
              )}
              {openModalNewFolder ? (
                <div>
                  <Button
                    className='btn-new-folder'
                    onClick={() => {
                      if (nameCreateNewFolder) {
                        fnCreateFolder(nameCreateNewFolder)
                      }
                    }}
                    sx={{
                      width: '80px !important',
                      minWidth: '80px !important',
                      padding: '9px 14px',
                      background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
                      textTransform: 'none',
                      height: '35px',
                      margin: '0 6px',
                      fontSize: '16px'
                    }}
                    variant='contained'
                  >
                    S{'ave'.toLowerCase()}
                  </Button>
                </div>
              ) : (
                <Button
                  className='icon-list-toggle'
                  variant='text'
                  onClick={() => {
                    setShowIconList(!showIconList)
                    localStorage.setItem('showListItem', JSON.stringify(!showIconList))
                  }}
                >
                  {showIconList && <Icon style={{ fontSize: 30, color: '#FF74A6' }} icon='mdi:list-box-outline' />}
                  {!showIconList && (
                    <Icon style={{ fontSize: 30, color: '#FF74A6' }} icon='mdi:view-grid-plus-outline' />
                  )}
                </Button>
              )}
              {openModalNewFolder ? (
                <div>
                  <Button
                    className='btn-new-folder'
                    onClick={handleCloseModalNewFolder}
                    sx={{
                      width: '80px !important',
                      minWidth: '80px !important',
                      padding: '9px 14px',
                      background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
                      textTransform: 'none',
                      height: '35px',
                      fontSize: '16px'
                    }}
                    variant='contained'
                  >
                    C{'ancel'.toLowerCase()}
                  </Button>
                </div>
              ) : (
                <Button
                  className='btn-new-folder'
                  onClick={handleOpenModalNewFolder}
                  sx={{
                    width: '100px !important',
                    minWidth: '100px !important',
                    padding: '9px 12px',
                    background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
                    textTransform: 'none',
                    height: '30px',
                    fontSize: '12px'
                  }}
                  variant='contained'
                >
                  N{'ew Folder'.toLowerCase()}
                </Button>
              )}
              {/*MODAL NEW VIDEO*/}
              <Modal
                className={'modal-create-new-video'}
                open={openModalNewVideo}
                onClose={handleCloseModalNewVideo}
                aria-labelledby='parent-modal-title'
                aria-describedby='parent-modal-description'
              >
                <Box sx={{ ...styleModalNewFolder, width: 500 }}>
                  <h2 id='parent-modal-title'>New Video</h2>
                  <TextField
                    onChange={(event: any) => setNameCreateNewVideo(event.target.value)}
                    value={nameCreateNewVideo}
                    sx={{ width: '100%', marginBottom: '20px' }}
                    label='New video'
                    variant='outlined'
                    id={nameCreateNewVideo === '' ? 'standard-error-helper-text' : 'outlined-basic'}
                    helperText={focusInputVideoName && nameCreateNewVideo === '' ? 'Please enter the video name' : ''}
                    error={focusInputVideoName && nameCreateNewVideo === ''}
                    onFocus={() => setFocusInputVideoName(true)}
                  />
                  <TextField
                    onChange={(event: any) => setLinkCreateNewVideo(event.target.value)}
                    value={linkCreateNewVideo}
                    sx={{ width: '100%', marginBottom: '20px' }}
                    label='New link'
                    variant='outlined'
                    id={linkCreateNewVideo === '' ? 'standard-error-helper-text' : 'outlined-basic'}
                    helperText={
                      focusInputVideoLink && linkCreateNewVideo === '' ? 'Please enter the folder link video' : ''
                    }
                    error={focusInputVideoLink && linkCreateNewVideo === ''}
                    onFocus={() => setFocusInputVideoLink(true)}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignCenter: 'center' }}>
                    <Button sx={{ fontSize: '1.03em' }} variant='text' onClick={handleCloseModalNewVideo}>
                      Cancel
                    </Button>
                    <Button
                      sx={{ fontSize: '1.03em' }}
                      variant='text'
                      disabled={nameCreateNewVideo === '' || linkCreateNewVideo === ''}
                      onClick={() => fnCreateVideo(nameCreateNewVideo, linkCreateNewVideo)}
                    >
                      Create
                    </Button>
                  </Box>
                </Box>
              </Modal>
            </Box>
          </div>
          {
            <MyLibsFolder
              option={'no-full'}
              props={listFolder}
              userData={userData}
              listPeopleShare={listPeopleShare}
              showIconList={showIconList}
              parentCallbackIdFolder={callbackFunctionIdFolder}
              disableFolder={disableFolder}
            />
          }

          {listFolderIdVideo?.length !== 0 && (
            <MyLibsVideo
              userData={userData}
              listShow={showIconList}
              props={listFolderIdVideo}
              parentCallbackIdVideo={callbackFunctionIdVideo}
              listPeopleShare={listPeopleShare}
            ></MyLibsVideo>
          )}
        </div>
      }
    </div>
  )
}
export default SlugFolder
