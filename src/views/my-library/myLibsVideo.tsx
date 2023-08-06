import React, { useEffect, useLayoutEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Icon from '../../@core/components/icon'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import { CardMedia } from '@mui/material'

import { styled } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Modal from '@mui/material/Modal'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { useRouter } from 'next/router'

import Select, { SelectChangeEvent } from '@mui/material/Select'
import {
  deleteVideoId,
  postSeenVideoId,
  postListVideoId,
  changeVideoRoleUser,
  getListFolder
} from '../../service/myLibrary'

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

function MyLibsVideo(props: any) {
  function convertName(val: any) {
    return val.charAt(0).toUpperCase() + val.slice(1)
  }

  const router = useRouter()

  const [dataState, setDataState] = useState(props.props)
  const [optionState, setOptionState] = useState(false)
  const [listShow, setListShow] = useState()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [dataItemChoose, setDataItemChoose] = useState<any>()
  const [chooseOption, setChooseOption] = useState<any>()
  const [openModalShare, setOpenModalShare] = useState(false)
  const [stateNameVideo, setStateNameVideo] = useState()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setAnchorElUser(event.currentTarget)

    setDataItemChoose(row)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleOpenModalShare = () => {
    setOpenModalShare(true)
    setOptionShare(dataItemChoose.roleGeneral)
    setFocusAutocompleteShare(false)

    setValueInputAutoCompleteShare(undefined)
  }
  const handleCloseModalShare = () => {
    setOpenModalShare(false)
    setChooseOption(undefined)

    setFocusAutocompleteShare(false)
    setOptionShare('')
    setValueInputAutoCompleteShare(undefined)
  }

  const [selectVideo, setChangeSelectVideo] = useState([])
  const [optionShare, setOptionShare] = React.useState('')
  const handleChangeShare = (event: SelectChangeEvent) => {
    setOptionShare(event.target.value as string)
  }

  const [valueAutoComplete, setValueAutoComplete] = useState<any>(null)
  const styleModalShare = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    borderRadius: '5px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
  }

  const [openModalSuccess, setOpenModalSuccess] = useState(false)
  const [openModalSuccessV1, setOpenModalSuccessV1] = useState(false)
  const [openModalGetLink, setOpenModalGetLink] = useState(false)
  const [openModalRename, setOpenModalRename] = useState(false)
  const [openModalFavorite, setOpenModalFavorite] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalMoveTo, setOpenModalMoveTo] = useState(false)

  const [idApiFolder, setIdApiFolder] = useState('')

  const handleCloseModalSuccess = () => setOpenModalSuccess(false)
  const handleCloseModalSuccessV1 = () => setOpenModalSuccessV1(false)
  const handleOpenModalGetLink = () => {
    setOpenModalGetLink(true)
  }
  const handleCloseModalGetLink = () => {
    setOpenModalGetLink(false)
    setChooseOption(undefined)
  }

  const handleOpenModalRename = () => {
    setOpenModalRename(true)
    setStateNameVideo(dataItemChoose && dataItemChoose.name)
  }
  useEffect(() => {
    setStateNameVideo(stateNameVideo)
  }, [stateNameVideo])
  const handleCloseModalRename = () => {
    setOpenModalRename(false)
    setChooseOption(undefined)
  }
  const handleOpenModalDelete = () => {
    setOpenModalDelete(true)
  }
  const handleCloseModalDelete = () => {
    setOpenModalDelete(false)
    setChooseOption(undefined)
  }
  const handleOpenModalFavorite = () => {
    setOpenModalFavorite(true)
    fnAddToFavorite()
    setTimeout(() => {
      handleCloseModalFavorite()
    }, 1000)
  }
  const fnAddToFavoriteIdApi = async (id?: any, data?: any) => {
    try {
      return await postListVideoId(id, data)
    } catch (error) {}
  }

  const fnDeleteVideoIdApi = async (id: string) => {
    try {
      await deleteVideoId(id)
    } catch (error) {}
  }

  const fnDeleteVideoId = async (item: any) => {
    try {
      await handleCloseModalDelete()
      const dataStateTemp = [...dataState].filter((itemA: any) => {
        return item.id !== itemA.id
      })
      setDataState(dataStateTemp)
      await fnDeleteVideoIdApi(item?.id)
      props.parentCallbackIdVideo()
    } catch (error) {}
  }

  const handleCloseModalFavorite = () => {
    setOpenModalFavorite(false)
    setChooseOption(undefined)
  }

  const listSelect = [
    {
      textVn: 'Chia sẻ',
      textEn: 'Share',
      icon: <Icon style={{ fontSize: 30, marginRight: 10 }} icon='mdi:share-outline' />
    },
    {
      textVn: 'Nhận đường liên kết',
      textEn: 'Get link',
      icon: <Icon style={{ fontSize: 30, marginRight: 10 }} icon='mdi:link-variant' />
    },
    {
      textVn: 'Di chuyển tới',
      textEn: 'Move to',
      icon: <Icon style={{ fontSize: 30, marginRight: 10 }} icon='mdi:cursor-move' />
    },
    {
      textVn: 'Thêm vào thư mục yêu thích',
      textEn: 'Add to favorite',
      icon: <Icon style={{ fontSize: 30, marginRight: 10 }} icon='mdi:star' />
    },
    {
      textVn: 'Đổi tên',
      textEn: 'Rename',
      icon: <Icon style={{ fontSize: 30, marginRight: 10 }} icon='mdi:pencil' />
    },
    {
      textVn: 'Tải xuống',
      textEn: 'Download',
      icon: <Icon style={{ fontSize: 30, marginRight: 10 }} icon='mdi:download' />
    },
    {
      textVn: 'Xóa',
      textEn: 'Delete',
      icon: <Icon style={{ fontSize: 30, marginRight: 10 }} icon='mdi:delete' />
    }
  ]

  const styleModalSuccess = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    borderRadius: '5px',
    bgcolor: '#28a745',
    backgroundColor: '#28a745',
    boxShadow: 24,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    pt: 5,
    px: 4,
    pb: 5
  }
  const styleModalGetLink = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    borderRadius: '5px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    pt: 4,
    px: 5,
    pb: 6
  }
  const styleModalFavorite = {
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
    pt: 5,
    px: 5,
    pb: 5
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

  const fnCopyLinkCurrent = () => {
    const copyText = window.location.href
    navigator.clipboard.writeText(copyText)

    setChangeSuccess(true)
    setOpenModalSuccess(true)

    setTimeout(() => {
      setOpenModalSuccess(false)
    }, 500)
    setOpenModalGetLink(false)
  }
  const fnCopyLinkCurrentModalGetLink = () => {
    const copyText = window.location.href
    navigator.clipboard.writeText(copyText)
    setChangeSuccess(false)
    setOpenModalSuccess(true)
    setTimeout(() => {
      setOpenModalSuccess(false)
    }, 500)
    setOpenModalGetLink(false)
  }
  useLayoutEffect(() => {
    setChangeSelectVideo(selectVideo)
  }, [selectVideo])

  useEffect(() => {
    setDataState(props.props)
    setOptionState(props.option)
    setListShow(props.listShow)
    setChooseOption(chooseOption)

    if (chooseOption && chooseOption?.textEn === 'Share') {
      handleOpenModalShare()
    } else if (chooseOption && chooseOption?.textEn === 'Delete') {
      handleOpenModalDelete()
    } else if (chooseOption && chooseOption?.textEn === 'Get link') {
      handleOpenModalGetLink()
    } else if (chooseOption && chooseOption?.textEn === 'Rename') {
      handleOpenModalRename()
    } else if (chooseOption && chooseOption?.textEn === 'Add to favorite') {
      handleOpenModalFavorite()
    } else if (chooseOption && chooseOption?.textEn === 'Move to') {
      handleOpenModalMoveTo()
    } else if (chooseOption && chooseOption?.textEn === 'Download') {
      downloadVideo(dataItemChoose.id)
      setChooseOption(undefined)
    }
  }, [props, dataItemChoose, chooseOption])

  useEffect(() => {
    if (window.location.pathname.split('/').length === 4) {
    } else {
      setIdApiFolder(window.location.pathname.split('/')[window.location.pathname.split('/').length - 2])
    }
  }, [window.location.pathname])

  const fnRenameVideoIdApi = async (id?: any, data?: any) => {
    try {
      return await postListVideoId(id, data)
    } catch (error) {}
  }

  const fnRenameVideo = async () => {
    try {
      await handleCloseModalRename()
      let temp

      dataState.forEach((item: any) => {
        if (item.id === dataItemChoose?.id) {
          item.name = stateNameVideo
        }
      })
      const dataStateTemp = [...dataState]
      setDataState(dataStateTemp)
      if (idApiFolder === '') {
        temp = {
          name: stateNameVideo,
          folderId: dataItemChoose.folder ? dataItemChoose.folder.id : idApiFolder
        }

        const res = await fnRenameVideoIdApi(dataItemChoose?.id, temp)
        if (res?.status === 200) {
          setChangeSuccess(true)
          setOpenModalSuccess(true)
          setTimeout(() => {
            setOpenModalSuccess(false)
          }, 500)
        }
      } else {
        temp = {
          name: stateNameVideo,
          folderId: dataItemChoose.folder ? dataItemChoose.folder.id : idApiFolder,
          id: dataItemChoose?.id
        }

        const res = await fnRenameVideoIdApi(dataItemChoose?.id, temp)
        if (res?.status === 200) {
          setChangeSuccess(true)
          setOpenModalSuccess(true)
          setTimeout(() => {
            setOpenModalSuccess(false)
          }, 500)
        }
      }
    } catch (error) {}

    props.parentCallbackIdVideo()
  }

  const fnAddToFavorite = async () => {
    try {
      let temp

      dataState.forEach((item: any) => {
        if (item.id === dataItemChoose?.id) {
          item.favorite = true
        }
      })
      const dataStateTemp = [...dataState]
      setDataState(dataStateTemp)
      if (idApiFolder === '') {
        temp = {
          favorite: true,
          folderId: dataItemChoose.folder ? dataItemChoose.folder.id : idApiFolder
        }

        const res = await fnAddToFavoriteIdApi(dataItemChoose?.id, temp)
        if (res?.status === 200) {
          setChangeSuccess(true)
          setOpenModalSuccess(true)
          setTimeout(() => {
            setOpenModalSuccess(false)
          }, 500)
        }
      } else {
        temp = {
          favorite: true,
          folderId: dataItemChoose.folder ? dataItemChoose.folder.id : idApiFolder,
          id: dataItemChoose?.id
        }

        const res = await fnAddToFavoriteIdApi(dataItemChoose?.id, temp)
        if (res?.status === 200) {
          setChangeSuccess(true)
          setOpenModalSuccess(true)
          setTimeout(() => {
            setOpenModalSuccess(false)
          }, 500)
        }
      }
      await handleCloseModalFavorite()
    } catch (error) {}

    props.parentCallbackIdVideo()
  }

  const dataListPeopleShare = props.listPeopleShare
  useEffect(() => {
    setValueAutoComplete(valueAutoComplete)
  }, [valueAutoComplete])

  const [dataProfile, setDataProfile] = useState<any>()

  useEffect(() => {
    setDataProfile(props.userData)
    if (!props.userData) {
      setDataProfile({
        name: localStorage.getItem('user-name'),
        avatar: localStorage.getItem('avatar-img')
      })
    }
  }, [])

  const [openModalVideo, setOpenModalVideo] = useState<boolean>(false)
  const handleCloseModalVideo = () => setOpenModalVideo(false)

  const [chooseVideo, setChooseVideo] = useState<any>()
  async function fnSeenVideo(data: any) {
    try {
      await postSeenVideoId({ videoId: data.id })
    } catch (error) {}
  }

  const optionListPeopleShareV1 =
    dataListPeopleShare &&
    dataListPeopleShare.map((item: any) => {
      return {
        label: item.name,
        id: item.id,
        email: item.email,
        avatar: item.avatar
      }
    })
  const [valueInputAutoCompleteShare, setValueInputAutoCompleteShare] = useState<any>()
  const [focusAutocompleteShare, setFocusAutocompleteShare] = useState<boolean>(false)

  function handlesErrorAutocompleteShare() {
    if (focusAutocompleteShare === false && valueInputAutoCompleteShare === undefined) {
      return false
    } else if (focusAutocompleteShare === true && valueInputAutoCompleteShare === undefined) {
      return true
    } else if (focusAutocompleteShare === true && valueInputAutoCompleteShare === null) {
      return true
    } else {
      return false
    }
  }
  useEffect(() => {
    handlesErrorAutocompleteShare()
  }, [focusAutocompleteShare, valueInputAutoCompleteShare])

  const [valueInputAutoCompleteMoveto, setValueInputAutoCompleteMoveto] = useState<any>()
  const [focusAutocompleteMoveto, setFocusAutocompleteMoveto] = useState<boolean>(false)

  function handlesErrorAutocompleteMoveto() {
    if (focusAutocompleteMoveto === false && valueInputAutoCompleteMoveto === undefined) {
      return false
    } else if (focusAutocompleteMoveto === true && valueInputAutoCompleteMoveto === undefined) {
      return true
    } else if (focusAutocompleteMoveto === true && valueInputAutoCompleteMoveto === null) {
      return true
    } else {
      return false
    }
  }

  useEffect(() => {
    handlesErrorAutocompleteMoveto()
  }, [focusAutocompleteMoveto, valueInputAutoCompleteMoveto])

  useEffect(() => {
    setValueInputAutoCompleteShare(valueInputAutoCompleteShare)
  }, [valueInputAutoCompleteShare, focusAutocompleteShare])
  useEffect(() => {
    setFocusAutocompleteShare(focusAutocompleteShare)
  }, [focusAutocompleteShare])
  const sendDataShare = async () => {
    try {
      const data = {
        role: optionShare,
        userId: dataProfile.id,
        videoId: dataItemChoose.id
      }
      const res = await changeVideoRoleUser(dataItemChoose.id, data)
      if (res?.status === 200) {
        setChangeSuccess(true)
        setOpenModalSuccess(true)
        setTimeout(() => {
          setOpenModalSuccess(false)
        }, 500)
      }
    } catch (error: any) {
      if (error.response.status === 404) {
        alert('change failed')
      }
    }
    handleCloseModalShare()
    props.parentCallbackIdVideo()
  }
  const [changeSuccess, setChangeSuccess] = useState(false)

  const [listFolderAll, setListFolderAll] = useState<any>()
  const fnGetListFolder = async () => {
    if (openModalMoveTo) {
      const param = {
        page: 1,
        limit: 100000
      }
      try {
        const res = await getListFolder(param)

        if (res?.status === 200) {
          const dataListFolderTemp = res.data.data.listFolder.items.map((item: any) => {
            return {
              label: item.name,
              id: item.id
            }
          })
          setListFolderAll(dataListFolderTemp)
        }
      } catch (error: any) {}
    }
  }

  useEffect(() => {
    fnGetListFolder()
  }, [openModalMoveTo])

  const handleOpenModalMoveTo = () => {
    setOpenModalMoveTo(true)
    setChooseOption(undefined)
  }
  const handleCloseModalMoveTo = () => {
    setOpenModalMoveTo(false)
    setChooseOption(undefined)
  }

  const [, setShowSpinner] = useState<boolean>(false)
  const fnMoveTo = async () => {
    setShowSpinner(true)

    const data = {
      folderId: valueInputAutoCompleteMoveto && valueInputAutoCompleteMoveto.id,
      id: dataItemChoose && dataItemChoose.id
    }
    try {
      const res = await postListVideoId(dataItemChoose.id, data)
      if (res?.status === 200) {
        setOpenModalSuccessV1(true)

        setShowSpinner(false)
        setTimeout(() => {
          setOpenModalSuccessV1(false)
        }, 1500)
      }
    } catch (error: any) {}

    handleCloseModalMoveTo()
    setShowSpinner(false)
    props.parentCallbackIdVideo('ahihi')
  }

  async function downloadVideo(id: any) {
    window.open(`${process.env.NEXT_PUBLIC_BASE_URL}video/${id}/download`)
  }

  function handleRouterLink(item: any) {
    console.log(item)
    props.parentCallbackIdVideo('ahihi')
    const tempUrl = (window.location.pathname + 'watch-video').split('/').slice(0, 4).join('/') + '/'
    localStorage.setItem(
      'info-watch-video',
      JSON.stringify({ folderId: item.folder ? item.folder.id : '', id: item.id })
    )
    if (tempUrl.includes('/video')) {
      router.push(`${String(tempUrl).replace('/video', '') + item.id}`)
    } else if (tempUrl.includes('/folder')) {
      const tempUrl1 = (window.location.pathname + 'watch-video').split('/').slice(0, 2).join('/') + '/'
      router.push(`${String(tempUrl1) + '/watch-video/' + item.id}`)
    }
  }

  return (
    <div>
      {
        <div>
          {!listShow && (
            <Grid
              sx={{
                width: '100%',
                mt: '20px',
                '@media screen and (max-width: 576px)': {
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  marginLeft: '-7px'
                }
              }}
              container
              spacing={4}
            >
              {dataState &&
                Array.isArray(dataState) &&
                dataState.length !== 0 &&
                dataState
                  .filter((item: any, index: any) => {
                    if (optionState === false) {
                      return item
                    } else {
                      if (index < 8) {
                        return item
                      }
                    }
                  })
                  .map((item: any, index: any) => {
                    return (
                      <Grid onClick={() => handleRouterLink(item)} key={index} item xs={12} md={4} lg={3}>
                        <Card
                          sx={{
                            '@media screen and (max-width: 576px)': {
                              width: 345
                            },
                            maxWidth: 315,
                            maxHeight: 170,
                            height: '100%'
                          }}
                        >
                          <Box
                            sx={{ cursor: 'pointer' }}
                            onClick={() => {
                              handleRouterLink(item)
                              setChooseVideo(item)
                              fnSeenVideo(item).then(r => r)
                            }}
                          >
                            <div style={{ overflow: 'hidden', width: '100%', height: '170px' }}>
                              <video
                                playsInline
                                style={{ transform: 'scale(1)' }}
                                className='list-item-video'
                                height='100%'
                              >
                                <source src={item.link} type='video/mp4' />
                              </video>
                            </div>
                          </Box>
                        </Card>
                        <CardContent
                          sx={{
                            padding: '10px 0px 0px 0 !important',
                            maxWidth: 315,
                            '@media screen and (max-width: 576px)': {
                              width: 345
                            }
                          }}
                        >
                          <Box
                            sx={{
                              width: '100%',
                              display: 'flex',
                              ml: { xs: 0, md: 0 },
                              alignItems: 'flex-start',
                              flexWrap: ['wrap', 'nowrap'],
                              justifyContent: 'space-between'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'flex-start', width: '90%' }}>
                              <ProfilePicture
                                style={{ borderRadius: '50%', maxWidth: 45, maxHeight: 45, marginRight: 15 }}
                                src={dataProfile && dataProfile.avatar}
                                alt='profile-picture'
                              />
                              <div style={{ minWidth: '60%' }}>
                                <ul
                                  style={{
                                    listStyle: 'none',
                                    border: '1px solid themes.palette.primary.main',
                                    borderRadius: '5px',
                                    padding: '5px 5px 0px 0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    margin: '0 !important',
                                    transform: 'translateY(-22px)'
                                  }}
                                >
                                  <li
                                    style={{
                                      color: 'black',
                                      fontWeight: '500',
                                      whiteSpace: 'nowrap',
                                      width: '100%',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      fontSize: '15px'
                                    }}
                                  >
                                    {convertName(item.name)}
                                  </li>
                                  <li
                                    style={{
                                      marginTop: 2,
                                      whiteSpace: 'nowrap',
                                      width: '100%',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      fontSize: '12px'
                                    }}
                                  >
                                    {dataProfile && dataProfile.name}
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <Box sx={{ flexGrow: 0, borderRadius: '15px' }}>
                              <Tooltip title='Open property video'>
                                <IconButton onClick={e => handleOpenUserMenu(e, item)} sx={{ p: 0 }}>
                                  <Icon icon={'mdi:dots-vertical'} />
                                </IconButton>
                              </Tooltip>
                              <Menu
                                sx={{
                                  mt: '0px',
                                  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                                  '.MuiMenu-paper': { boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px' }
                                }}
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
                                {listSelect.map((option: any, index: number) => (
                                  <MenuItem sx={{ paddingRight: '50px' }} key={index} onClick={handleCloseUserMenu}>
                                    <Box sx={{ width: '100%', border: 'none' }} onClick={() => setChooseOption(option)}>
                                      <Box sx={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                                        {option.icon}
                                        <p style={{ padding: 0, margin: 0 }}>{option.textEn}</p>
                                      </Box>
                                    </Box>
                                  </MenuItem>
                                ))}
                              </Menu>
                            </Box>
                          </Box>
                        </CardContent>
                      </Grid>
                    )
                  })}
            </Grid>
          )}
          {listShow && (
            <TableContainer sx={{ marginTop: '0.5rem', width: '100%' }} component={Paper}>
              <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography style={{ marginTop: 6 }}>Name</Typography>
                        <Icon
                          style={{ fontSize: 20, marginLeft: 10, transform: 'translateY(2px)' }}
                          icon='mdi:arrow-up'
                        />
                      </Box>
                    </TableCell>
                    <TableCell align={'center'}>
                      <Typography>Owner</Typography>
                    </TableCell>
                    <TableCell>{}</TableCell>
                  </TableRow>
                  {dataState &&
                    Array.isArray(dataState) &&
                    dataState.map((row: any, indexTable: number) => (
                      <TableRow key={indexTable} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell sx={{ width: '45%' }} component='th' scope='row'>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {/*<Icon style={{fontSize: 40, color: '#fdb528', marginRight: 10}} icon="mdi:folder"/>*/}
                            <Card sx={{ width: 100, marginRight: 10 }}>
                              <CardMedia
                                sx={{ height: 50, transform: 'scale(2)' }}
                                component='video'
                                src={row.link}
                                title={row.title}
                              />
                            </Card>

                            <Typography
                              style={{
                                marginTop: 6,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                width: '250px',
                                textOverflow: 'ellipsis'
                              }}
                            >
                              {convertName(row.name)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align={'center'}>{dataProfile && dataProfile.name}</TableCell>
                        <TableCell>
                          <div>
                            <Box sx={{ flexGrow: 0 }}>
                              <Tooltip title='Open property Video'>
                                <IconButton onClick={(e: any) => handleOpenUserMenu(e, row)} sx={{ p: 0 }}>
                                  <Icon icon={'mdi:dots-vertical'} />
                                </IconButton>
                              </Tooltip>
                              <Menu
                                sx={{
                                  mt: '0px',
                                  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                                  '.MuiMenu-paper': { boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px' }
                                }}
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
                                {listSelect.map((option: any, index: number) => (
                                  <MenuItem key={index} onClick={handleCloseUserMenu}>
                                    <Box
                                      sx={{ width: '100%', border: 'none' }}
                                      onClick={() => {
                                        setChooseOption(option)
                                      }}
                                    >
                                      <Box sx={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                                        {option.icon}
                                        <p style={{ padding: 0, margin: 0 }}>{option.textEn}</p>
                                      </Box>
                                    </Box>
                                  </MenuItem>
                                ))}
                              </Menu>
                            </Box>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/*MODAL PLAY VIDEO*/}
          <Modal
            open={openModalVideo}
            onClose={handleCloseModalVideo}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            sx={{ width: '100vw', height: '100vh' }}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                borderRadius: '5px',
                backgroundColor: 'background.paper',
                boxShadow: '24',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: '1px'
              }}
            >
              <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                <video
                  playsInline
                  style={{ width: '100%', height: '100%' }}
                  controls
                  autoPlay
                  title={chooseVideo && chooseVideo.name}
                >
                  <source src={chooseVideo && chooseVideo.link} type='video/mp4' />
                </video>
              </Box>

              <HighlightOffIcon
                onClick={() => setOpenModalVideo(false)}
                sx={{ position: 'absolute', top: '15px', right: '15px', color: 'white', fontSize: '30px', zIndex: 2 }}
              ></HighlightOffIcon>
            </div>
          </Modal>

          {/*MODAL SHARE*/}
          <Modal
            open={openModalShare}
            onClose={handleCloseModalShare}
            aria-labelledby='parent-modal-title'
            aria-describedby='parent-modal-description'
          >
            <Box sx={{ ...styleModalShare, width: 550 }}>
              <p id='parent-modal-title' style={{ fontWeight: 'bold', marginTop: '5px' }}>
                Sharing "{dataItemChoose && dataItemChoose.name}"
              </p>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  options={optionListPeopleShareV1}
                  sx={{ width: '100%', '.MuiOutlinedInput-root': { padding: '5px' } }}
                  onChange={(event: any, newValue: any) => setValueInputAutoCompleteShare(newValue)}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      sx={{ label: { fontSize: '15px', top: '-5px' } }}
                      label='Add people by account'
                      error={handlesErrorAutocompleteShare()}
                      helperText={handlesErrorAutocompleteShare() ? 'Please fill out the form.' : ''}
                      onFocus={() => setFocusAutocompleteShare(true)}
                    />
                  )}
                />
              </div>

              <p style={{ fontWeight: 'bold' }}>People with access</p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                <ProfilePicture
                  style={{ borderRadius: '50%', width: 60, height: 60 }}
                  src={dataItemChoose && dataItemChoose?.user?.avatar}
                  alt='profile-picture'
                />
                <p style={{ width: '65%', fontWeight: 'bold' }}>Me</p>
                <p style={{ fontWeight: 'bold', width: '100px', textAlign: 'right' }}>Owner</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <ProfilePicture
                  style={{ borderRadius: '50%', width: 60, height: 60 }}
                  src={
                    valueInputAutoCompleteShare && valueInputAutoCompleteShare.avatar
                      ? valueInputAutoCompleteShare.avatar
                      : '../../../images/avatars/user.svg'
                  }
                  alt='profile-picture'
                />
                <p style={{ width: '60%', fontWeight: 'bold' }}>
                  {valueInputAutoCompleteShare && valueInputAutoCompleteShare.email}
                </p>

                <FormControl sx={{ width: '100px' }}>
                  <Select
                    sx={{
                      width: '100px',
                      height: '40px',
                      fontSize: '14px',
                      padding: '0',
                      '.css-oagach-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input': { padding: '10px 5px' }
                    }}
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={optionShare}
                    onChange={handleChangeShare}
                  >
                    <MenuItem sx={{ fontSize: '14px' }} value={2}>
                      View
                    </MenuItem>
                    <MenuItem sx={{ fontSize: '14px' }} value={1}>
                      Not View
                    </MenuItem>
                    <MenuItem sx={{ fontSize: '14px' }} value={3}>
                      Edit
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <Divider style={{ margin: '15px 0' }} variant='middle' />

              <p style={{ fontWeight: 'bold' }}>General Access</p>

              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}
              >
                <Icon onClick={fnCopyLinkCurrent} style={{ cursor: 'pointer' }} icon={'mdi:content-copy'} />
                <div style={{ width: '340px' }}>
                  <Button
                    onClick={fnCopyLinkCurrent}
                    style={{ width: 'auto', textTransform: 'none', color: '#FF74A6', border: '1px solid #FF74A6' }}
                    variant='outlined'
                  >
                    Copy the link
                  </Button>
                </div>
                <Button
                  disabled={valueInputAutoCompleteShare === undefined || valueInputAutoCompleteShare === null}
                  onClick={() => {
                    sendDataShare()
                  }}
                  sx={{
                    width: 'auto',
                    textTransform: 'none',
                    background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
                    ':disabled': { background: '#80808042' }
                  }}
                  variant='contained'
                >
                  Done
                </Button>
              </div>
            </Box>
          </Modal>

          {/*MODAL SUCCESS*/}
          <Modal
            open={openModalSuccess}
            onClose={handleCloseModalSuccess}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={styleModalSuccess}>
              <Icon style={{ marginRight: 5, color: 'white' }} icon={'mdi:check'} />
              <Typography sx={{ fontSize: '15px', fontWeight: '500', color: 'white' }}>
                {changeSuccess === false ? ' Link copied' : 'Change success'}
              </Typography>
            </Box>
          </Modal>

          {/*MODAL GETLINK*/}
          <Modal
            open={openModalGetLink}
            onClose={handleCloseModalGetLink}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={{ ...styleModalGetLink, width: 600 }}>
              <Box sx={{ width: '100%', display: 'flex' }}>
                <Icon style={{ marginRight: 5, fontSize: '20px', marginBottom: '10px' }} icon={'mdi:link-variant'} />
                <Typography sx={{ fontSize: '14px', fontWeight: '400', marginBottom: '10px' }}>Get link</Typography>
              </Box>

              <Box sx={{ width: '100%', display: 'flex' }}>
                <TextField
                  sx={{
                    width: '90%',
                    input: {
                      padding: 2
                    }
                  }}
                  id='outlined-basic'
                  label='Get link'
                  variant='outlined'
                  value={window.location.href}
                />
                <Button
                  sx={{
                    ml: 5,
                    height: 38,
                    textTransform: 'none',
                    background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
                    ':disabled': { background: '#80808042' }
                  }}
                  variant='contained'
                  onClick={fnCopyLinkCurrentModalGetLink}
                >
                  Copy
                </Button>
              </Box>
            </Box>
          </Modal>

          {/*MODAL RENAME*/}
          <Modal
            open={openModalRename}
            onClose={handleCloseModalRename}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={{ ...styleModalGetLink, width: 600 }}>
              <Box sx={{ width: '100%', display: 'flex' }}>
                <Icon style={{ marginRight: 5, fontSize: '20px', marginBottom: '10px' }} icon={'mdi:rename-outline'} />
                <Typography sx={{ fontSize: '14px', fontWeight: '400', marginBottom: '10px' }}>Rename</Typography>
              </Box>

              <Box sx={{ width: '100%', display: 'flex' }}>
                <TextField
                  sx={{
                    width: '80%',
                    input: {
                      padding: 2
                    },
                    label: { top: '-5px' }
                  }}
                  id='outlined-basic'
                  label='Rename'
                  variant='outlined'
                  value={stateNameVideo}
                  onChange={(event: any) => setStateNameVideo(event.target.value)}
                />
                <Button
                  disabled={stateNameVideo === ''}
                  sx={{
                    mx: 5,
                    height: 38,
                    textTransform: 'none',
                    background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
                    ':disabled': { background: '#80808042' }
                  }}
                  variant='contained'
                  onClick={fnRenameVideo}
                >
                  Rename
                </Button>
              </Box>
            </Box>
          </Modal>

          {/*MODAL FAVORITE*/}
          <Modal
            open={openModalFavorite}
            onClose={handleCloseModalFavorite}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={{ ...styleModalFavorite, width: 250 }}>
              <Typography sx={{ fontSize: '16px', fontWeight: '400', marginBottom: '0px' }}>
                Added to favorite
              </Typography>
            </Box>
          </Modal>

          {/*MODAL DELETE*/}
          <Modal
            open={openModalDelete}
            onClose={handleCloseModalDelete}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={{ ...styleModalDelete, width: 400 }}>
              <Icon
                style={{ marginRight: 5, fontSize: '40px', color: '#bb4d4d', marginBottom: '10px' }}
                icon={'mdi:delete-circle'}
              />
              <Typography sx={{ fontSize: '20px', fontWeight: '500', marginBottom: '25px' }}>Are you sure ?</Typography>
              <Box>
                <Button
                  sx={{ ml: 2, mr: 5, textTransform: 'none' }}
                  color='secondary'
                  variant='contained'
                  onClick={handleCloseModalDelete}
                >
                  Cancel
                </Button>
                <Button
                  sx={{ mr: 2, ml: 5, textTransform: 'none' }}
                  color='error'
                  variant='contained'
                  onClick={() => fnDeleteVideoId(dataItemChoose)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </Modal>

          {/*MODAL Remove to */}
          <Modal
            open={openModalMoveTo}
            onClose={handleCloseModalMoveTo}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={{ ...styleModalGetLink, width: 600 }}>
              <Box sx={{ width: '100%', display: 'flex' }}>
                <Icon style={{ marginRight: 5, fontSize: '20px', marginBottom: '10px' }} icon={'mdi:cursor-move'} />
                <Typography sx={{ fontSize: '14px', fontWeight: '400', marginBottom: '10px' }}>Move to</Typography>
              </Box>

              <Box sx={{ width: '100%', display: 'flex' }}>
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  options={listFolderAll}
                  sx={{ width: '100%', padding: '0 !important', height: '40px' }}
                  onChange={(event: any, newValue: any) => setValueInputAutoCompleteMoveto(newValue)}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      sx={{
                        padding: '0 !important',
                        height: '40px',
                        '.MuiAutocomplete-input': { padding: '0 !important' },
                        label: { fontSize: '14px', top: '-5px' }
                      }}
                      label='Move to folder'
                      error={handlesErrorAutocompleteMoveto()}
                      helperText={handlesErrorAutocompleteMoveto() ? 'Please fill out the form.' : ''}
                      onFocus={() => setFocusAutocompleteMoveto(true)}
                    />
                  )}
                />

                <Button
                  sx={{
                    marginLeft: 5,
                    height: 40,
                    width: '150px',
                    background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
                    textTransform: 'none'
                  }}
                  variant='contained'
                  onClick={fnMoveTo}
                >
                  Move to
                </Button>
              </Box>
            </Box>
          </Modal>

          {/*MODAL SUCCESS v1*/}
          <Modal
            open={openModalSuccessV1}
            onClose={handleCloseModalSuccessV1}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={styleModalSuccess}>
              <Icon style={{ marginRight: 5, color: 'white' }} icon={'mdi:check'} />
              <Typography sx={{ fontSize: '15px', fontWeight: '500', color: 'white' }}>Change success</Typography>
            </Box>
          </Modal>
        </div>
      }
    </div>
  )
}

export default MyLibsVideo
