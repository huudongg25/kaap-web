import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'

import Icon from '../../@core/components/icon'
import Button from '@mui/material/Button'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Modal from '@mui/material/Modal'
import { styled } from '@mui/material/styles'
import FormControl from '@mui/material/FormControl'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import IconButton from '@mui/material/IconButton'
import { useRouter } from 'next/router'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFolderId, postListFolderId, postListFolderIdVer } from '../../service/myLibrary'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { updateTreeSlice } from 'src/store/apps/tree'
import { useTheme } from '@mui/material/styles'

const ProfilePicture = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  }
}))

const filter = createFilterOptions<any>()

function MyLibsFolder(props: any) {
  const dispatch = useDispatch()
  const theme = useTheme()
  const router = useRouter()
  const [dataState, setDataState] = useState([])
  const [optionState, setOptionState] = useState()
  const [listShow, setListShow] = useState<boolean>(props.showIconList)
  const [chooseOption, setChooseOption] = useState<any>()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [openModalShare, setOpenModalShare] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [openModalGetLink, setOpenModalGetLink] = useState(false)
  const [openModalRename, setOpenModalRename] = useState(false)
  const [stateNameFolder, setStateNameFolder] = useState<any>()
  const [openModalFavorite, setOpenModalFavorite] = useState(false)
  const [openModalMoveTo, setOpenModalMoveTo] = useState(false)
  const [dataItemChoose, setDataItemChoose] = useState<any>()
  const [disableFolderFirst, setDisableFolderFirst] = useState(props.disableFolder)
  const [optionShare, setOptionShare] = React.useState('')
  const treeData = useSelector((state: any) => state.dataTreeSlice)

  function convertName(val: any) {
    return val.charAt(0).toUpperCase() + val.slice(1)
  }
  const handleChangeShare = (event: SelectChangeEvent) => {
    setOptionShare(event.target.value as string)
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
      textVn: 'Xóa',
      textEn: 'Delete',
      icon: <Icon style={{ fontSize: 30, marginRight: 10 }} icon='mdi:delete' />
    }
  ]

  const styleModalSuccess = {
    position: 'absolute' as const,
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
  const styleModalDelete = {
    position: 'absolute' as const,
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
  const styleModalGetLink = {
    position: 'absolute' as const,
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
    position: 'absolute' as const,
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
    pt: 4,
    px: 5,
    pb: 6
  }
  const styles1 = {
    pointerEvents: 'none'
  }
  const styles2 = {
    cursor: 'pointer'
  }

  const [openModalSuccess, setOpenModalSuccess] = useState(false)

  const handleCloseModalSuccess = () => setOpenModalSuccess(false)

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

    setValueInputAutoCompleteShare(undefined)
    setFocusAutocompleteShare(false)
  }
  const handleCloseModalShare = () => {
    setOpenModalShare(false)
    setChooseOption(undefined)

    setFocusAutocompleteShare(false)
    setOptionShare('')
    setValueInputAutoCompleteShare(undefined)
  }
  const handleOpenModalDelete = () => {
    setOpenModalDelete(true)
  }
  const handleCloseModalDelete = () => {
    setOpenModalDelete(false)
    setChooseOption(undefined)
  }
  const handleOpenModalGetLink = () => {
    setOpenModalGetLink(true)
  }
  const handleCloseModalGetLink = () => {
    setOpenModalGetLink(false)
    setChooseOption(undefined)
  }
  const handleOpenModalRename = () => {
    setOpenModalRename(true)
    setStateNameFolder(dataItemChoose && dataItemChoose.name)
  }
  const handleCloseModalRename = () => {
    setOpenModalRename(false)
    setChooseOption(undefined)
  }

  const handleOpenModalFavorite = () => {
    setOpenModalFavorite(true)
    fnAddToFavorite()
    setTimeout(() => {
      handleCloseModalFavorite()
    }, 300)
  }
  const handleCloseModalFavorite = () => {
    setOpenModalFavorite(false)
    setChooseOption(undefined)
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

  const dataListPeopleShare = props.listPeopleShare
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

  const handleRouterLink = (item: any) => {
    dispatch(
      updateTreeSlice({
        name: item.name,
        id: item.id,
        parent: {
          name: item.parent?.name,
          id: item.parent?.id
        }
      })
    )

    props.parentCallbackIdFolder(item)
    const tempUrl = window.location.pathname.split('/').slice(0, 3).join('/') + '/'
    router.push(`${tempUrl + item.id}`)
  }

  const fnDeleteFolderIdApi = async (id: string) => {
    try {
      await deleteFolderId(id)
    } catch (error) {}
  }

  const fnDeleteFolderId = async (item: any) => {
    try {
      await handleCloseModalDelete()
      const dataStateTemp = [...dataState].filter((itemA: any) => {
        return itemA.id !== item.id
      })
      setDataState(dataStateTemp)
      await fnDeleteFolderIdApi(item?.id)
      props.parentCallbackIdFolder('ahihi')
    } catch (error) {}
  }

  const fnRenameFolderIdApi = async (id: string, name: string, favorite: false, parentId: string, roleGeneral: 1) => {
    try {
      return await postListFolderId(id, name, favorite, parentId, roleGeneral)
    } catch (error) {}
  }
  const fnAddToFavoriteIdApi = async (
    id: string,
    name: string,
    favorite: boolean,
    parentId: string,
    roleGeneral: 1
  ) => {
    try {
      return await postListFolderId(id, name, favorite, parentId, roleGeneral)
    } catch (error) {}
  }
  const fnRenameFolder = async () => {
    try {
      await handleCloseModalRename()
      dataState.forEach((item: any) => {
        if (item.id === dataItemChoose?.id) {
          item.name = stateNameFolder
        }
      })
      const dataStateTemp = [...dataState]
      setDataState(dataStateTemp)
      const res = await fnRenameFolderIdApi(
        dataItemChoose?.id,
        stateNameFolder,
        dataItemChoose?.favorite,
        dataItemChoose?.parentId,
        dataItemChoose?.roleGeneral
      )
      if (res?.status === 200) {
        setChangeSuccess(true)
        setOpenModalSuccess(true)
        setTimeout(() => {
          setOpenModalSuccess(false)
        }, 500)
      }
      props.parentCallbackIdFolder('ahihi')
    } catch (error) {
      alert('change failed')
    }
  }
  const fnAddToFavorite = async () => {
    try {
      await handleCloseModalFavorite()
      dataState.forEach((item: any) => {
        if (item.id === dataItemChoose?.id) {
          item.favorite = true
        }
      })
      const dataStateTemp = [...dataState]
      setDataState(dataStateTemp)
      const res = await fnAddToFavoriteIdApi(
        dataItemChoose?.id,
        dataItemChoose?.name,
        true,
        dataItemChoose?.parentId,
        dataItemChoose?.roleGeneral
      )
      if (res?.status === 200) {
        setChangeSuccess(true)
        setOpenModalSuccess(true)
        setTimeout(() => {
          setOpenModalSuccess(false)
        }, 500)
      }
      props.parentCallbackIdFolder('ahihi')
    } catch (error) {
      alert('change failed')
    }
  }

  useEffect(() => {
    setStateNameFolder(stateNameFolder)
  }, [stateNameFolder])

  useEffect(() => {
    setDataState(props.props)
    setOptionState(props.option)
    setListShow(props.showIconList)
    setChooseOption(chooseOption)

    setDisableFolderFirst(props.disableFolder)

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
    }
  }, [props, chooseOption, dataItemChoose])

  useEffect(() => {
    setValueAutoComplete(valueAutoComplete)
  }, [valueAutoComplete])

  const handleOpenModalMoveTo = () => {
    setOpenModalMoveTo(true)
    setListFolderId(
      optionListFolder.filter((item: any) => {
        return item.id !== dataItemChoose.id
      })
    )
  }
  const handleCloseModalMoveTo = () => {
    setOpenModalMoveTo(false)
    setChooseOption(undefined)
    setValueAutoCompleteMoveTo(null)
    setFocusMovetoFolder(true)
  }

  const fnMoveTo = async () => {
    try {
      const data = {
        parentId: valueAutoCompleteMoveTo && valueAutoCompleteMoveTo.id,
        id: dataItemChoose && dataItemChoose.id
      }
      await postListFolderIdVer(dataItemChoose.id, data)
      handleCloseModalMoveTo()
      props.parentCallbackIdFolder('ahihi')
    } catch (error) {}
  }

  const [valueAutoCompleteMoveTo, setValueAutoCompleteMoveTo] = useState<any>(null)
  useEffect(() => {
    setValueAutoCompleteMoveTo(valueAutoCompleteMoveTo)
  }, [valueAutoCompleteMoveTo])
  const [listFolderId, setListFolderId] = useState<any[]>([])
  let optionListFolder: any | { id: any; title: any }[] = [{ title: '', id: '' }]
  optionListFolder =
    dataState &&
    dataState?.map((item: any) => {
      return {
        title: item.name,
        id: item.id
      }
    })

  const [valueInputAutoCompleteShare, setValueInputAutoCompleteShare] = useState<any>()
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
  const [focusAutocompleteShare, setFocusAutocompleteShare] = useState<boolean>(false)
  useEffect(() => {
    handlesErrorAutocompleteShare()
  }, [focusAutocompleteShare, valueInputAutoCompleteShare])

  useEffect(() => {
    setValueInputAutoCompleteShare(valueInputAutoCompleteShare)
  }, [valueInputAutoCompleteShare, focusAutocompleteShare])

  const sendDataShare = async () => {
    try {
      const data = {
        parentId: null,
        roleGeneral: Number(optionShare)
      }
      const res = await postListFolderIdVer(dataItemChoose.id, data)
      if (res.status === 200) {
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
    props.parentCallbackIdFolder('ahihi')
  }
  const [changeSuccess, setChangeSuccess] = useState(false)
  const [focusMovetoFolder, setFocusMovetoFolder] = useState(true)

  const [anchorElUserListTree, setAnchorElUserListTree] = useState<null | HTMLElement>(null)
  const handleOpenListTree = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUserListTree(event.currentTarget)
  }

  const handleCloseListTree = () => {
    setAnchorElUserListTree(null)
  }

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
  },[])

  function jsUcfirst(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const [folderId, setFolderId] = useState('')
  const [folderClick, setFolderClick] = useState('')
  function onClickOpenFolder(event: any, item: any) {
    let timer
    clearTimeout(timer)
    if (event.detail === 1) {
      if (
        event.target.textContent.toLowerCase() == item.name.toLowerCase() ||
        event.target.textContent == item.video.length ||
        event.target.textContent.toLowerCase() == props.userData.name.toLowerCase()
      ) {
        timer = setTimeout(() => {
          setFolderId(item.id)
          setFolderClick(event.target.textContent)
        }, 200)
      }
    }
    if (event.detail === 2) {
      handleRouterLink(item)
      setFolderId(item.id)
    }
  }

  useEffect(() => {
    document.addEventListener('click', (event: any) => {
      if (folderClick && event.target.textContent != folderClick) {
        setFolderClick('')
        setFolderId('')
      }
      if (folderClick && event.target.textContent == folderClick) {
        setFolderClick(folderClick)
        setFolderId(folderId)
      }
    })
  }, [folderClick])

  const handleOnKeyPressRenameFolder = (event: any) => {
    if (event.key === 'Enter') {
      if (stateNameFolder !== '') {
        fnRenameFolder()
      }
    }
  }
  const handleOnKeyPressMoveToFolder = (event: any) => {
    if (event.key === 'Enter') {
      if (valueAutoCompleteMoveTo) {
        fnMoveTo()
      }
    }
  }

  const handleOnKeyPressShareFolder = (event: any) => {
    if (event.key === 'Enter') {
      if (valueInputAutoCompleteShare || valueInputAutoCompleteShare) {
        sendDataShare()
      }
    }
  }

  const handleOnKeyPressDeleteFolder = (nodeRef: HTMLDivElement) => {
    nodeRef.addEventListener('keydown', (event: any) => {
      if (event.key == 'Enter') {
        fnDeleteFolderId(dataItemChoose)
      }
    })
  }

  const handleOnKeyPressCopyLinkFolder = (nodeRef: HTMLDivElement) => {
    nodeRef.addEventListener('keydown', (event: any) => {
      if (event.key == 'Enter') {
        fnCopyLinkCurrentModalGetLink()
      }
    })
  }

  return (
    <div style={{ top: '-1rem' }}>
      <Typography
        sx={{
          display: 'flex',
          position: 'absolute',
          top: '14px',
          [theme.breakpoints.down('sm')]: {
            top: '54px'
          },
          '@media (max-width:540px)': {
            top: '84px'
          },
          alignItems: 'center',
          fontSize: '15px',
          cursor: 'pointer',
          textTransform: 'none',
          height: '30px'
        }}
      >
        <div
          style={{ fontSize: '16px', fontWeight: '450' }}
          onClick={() => {
            dispatch(
              updateTreeSlice({
                name: 'root',
                id: 'root',
                parent: {
                  name: 'root',
                  id: 'root'
                }
              })
            )
            router.push('/my-library/folder')
          }}
        >
          {' '}
          My Folder
        </div>
        <>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {treeData.tree &&
                treeData.tree.length <= 3 &&
                treeData.tree.map((item: any) => {
                  return (
                    <>
                      <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
                      <Button
                        sx={{
                          fontSize: '15px',
                          cursor: 'pointer',
                          textTransform: 'none',
                          fontWeight: '400',
                          color: 'rgba(76, 78, 100, 0.87)',
                          padding: 0,
                          minWidth: '0'
                        }}
                        className='tagA'
                        key={item.id}
                        onClick={() => {
                          setTimeout(() => {
                            dispatch(
                              updateTreeSlice({
                                name: item.name,
                                id: item.id,
                                parent: {
                                  name: item.parent?.name,
                                  id: item.parent?.id
                                }
                              })
                            )

                            router.push(`/my-library/folder/${item.id}`)
                          })
                        }}
                      >
                        {jsUcfirst(item.name)}
                      </Button>
                    </>
                  )
                })}
            </div>
            <div>
              {treeData.tree && treeData.tree.length > 3 && (
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                  <KeyboardArrowRightIcon></KeyboardArrowRightIcon>

                  <Tooltip title='Open property folder'>
                    <IconButton onClick={e => handleOpenListTree(e)} sx={{ p: '10px' }}>
                      <MoreHorizIcon />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    className='menu-tooltip-tree'
                    sx={{
                      mt: '0px',
                      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                      '.MuiMenu-paper': { boxShadow: 'rgba(0, 0, 0, 0.01) 0px 0px 0px 1px' }
                    }}
                    id='menu-appbar'
                    anchorEl={anchorElUserListTree}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left'
                    }}
                    open={Boolean(anchorElUserListTree)}
                    onClose={handleCloseListTree}
                  >
                    {treeData.tree.slice(0, treeData.tree.length - 2).map((item: any, index: number) => (
                      <MenuItem sx={{ paddingRight: '50px' }} key={index} onClick={handleOpenListTree}>
                        <Box
                          sx={{ width: '100%', border: 'none' }}
                          onClick={() => {
                            setTimeout(() => {
                              dispatch(
                                updateTreeSlice({
                                  name: item.name,
                                  id: item.id,
                                  parent: {
                                    name: item.parent?.name,
                                    id: item.parent?.id
                                  }
                                })
                              )
                              setAnchorElUserListTree(null)

                              router.push(`/my-library/folder/${item.id}`)
                            })
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
                            <p style={{ padding: 0, margin: 0 }}> {jsUcfirst(item.name)}</p>
                          </Box>
                        </Box>
                      </MenuItem>
                    ))}
                  </Menu>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {treeData.tree.slice(treeData.tree.length - 2, treeData.tree.length).map((item: any) => {
                      return (
                        <>
                          <KeyboardArrowRightIcon></KeyboardArrowRightIcon>
                          <Button
                            sx={{
                              fontWeight: '400',
                              fontSize: '15px',
                              cursor: 'pointer',
                              textTransform: 'none',
                              color: 'rgba(76, 78, 100, 0.87)'
                            }}
                            className='tagA'
                            key={item.id}
                            onClick={() => {
                              setTimeout(() => {
                                dispatch(
                                  updateTreeSlice({
                                    name: item.name,
                                    id: item.id,
                                    parent: {
                                      name: item.parent?.name,
                                      id: item.parent?.id
                                    }
                                  })
                                )

                                router.push(`/my-library/folder/${item.id}`)
                              })
                            }}
                          >
                            {jsUcfirst(item.name)}
                          </Button>
                        </>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      </Typography>

      {!listShow && (
        <Grid sx={{ mt: '0.2rem' }} container spacing={4}>
          {dataState &&
            Array.isArray(dataState) &&
            dataState?.length !== 0 &&
            dataState
              .filter((item: any, index: any) => {
                if (optionState === 'full') {
                  return item
                } else {
                  if (index < 100) {
                    return item
                  }
                }
              })
              .map((item: any, index: number) => {
                return (
                  <Grid
                    sx={disableFolderFirst && index === 0 ? { ...styles1 } : { ...styles2 }}
                    key={item.id}
                    item
                    xs={12}
                    md={4}
                    lg={3}
                  >
                    <Card sx={{ height: '61px' }}>
                      <CardHeader
                        onClick={(e: any) => {
                          e.preventDefault()
                          const inner = e.target.innerHTML
                          if (
                            e.target?.parentNode?.classList.length === 4 ||
                            inner.includes('Share') ||
                            inner.includes('Delete') ||
                            inner.includes('Move to') ||
                            inner.includes('Rename') ||
                            inner.includes('Get link') ||
                            inner.includes('Add to favorite') ||
                            inner == ''
                          ) {
                          } else {
                            onClickOpenFolder(e, item)
                          }
                        }}
                        onContextMenu={(e: any) => {
                          e.preventDefault()
                          handleOpenUserMenu(e, item)
                        }}
                        avatar={
                          <Icon
                            style={{ height: '22px', width: '22px', fontSize: 40, color: '#7A7979' }}
                            icon='mdi:folder'
                          />
                        }
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: folderId === item.id ? '#ddd' : '',
                          '.MuiCardHeader-content': { width: '50%' }
                        }}
                        action={
                          <Box sx={{ flexGrow: 0 }}>
                            <Menu
                              sx={{
                                mt: '0px',
                                boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                                '.MuiMenu-paper': { boxShadow: 'rgba(0, 0, 0, 0.01) 0px 0px 0px 1px' }
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
                        }
                        title={
                          <div
                            style={{
                              width: '100%',
                              padding: '0',
                              overflow: 'hidden',
                              position: 'relative',
                              display: 'flex',
                              alignItems: 'center',
                              margin: '0',
                              textAlign: 'left',
                              textDecoration: 'none',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              color: 'themes.palette.primary.main',
                              lineHeight: '0'
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: '16px',
                                fontWeight: '450',
                                color: 'text.primary',
                                textDecoration: 'none',
                                width: '200px',
                                '&:hover': { color: 'primary.main' }
                              }}
                            >
                              {convertName(item.name)}
                            </Typography>
                          </div>
                        }
                      />
                    </Card>
                  </Grid>
                )
              })}
        </Grid>
      )}

      {listShow && (
        <TableContainer sx={{ marginTop: 0.5, width: '100%' }} component={Paper}>
          <Table sx={{ minWidth: 650 }} size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography style={{ marginTop: 6, textTransform: 'capitalize' }}>Name</Typography>
                    <Icon style={{ fontSize: 20, marginLeft: 10 }} icon='mdi:arrow-up' />
                  </Box>
                </TableCell>
                <TableCell align={'center'}>
                  <Typography style={{ textTransform: 'capitalize' }}>Videos</Typography>
                </TableCell>
                <TableCell align={'center'}>
                  <Typography style={{ textTransform: 'capitalize' }}>Owner</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataState &&
                Array.isArray(dataState) &&
                dataState?.map((row: any, index: number) => (
                  <TableRow
                    sx={
                      disableFolderFirst && index === 0
                        ? { ...styles1, backgroundColor: folderId === row.id ? '#ddd' : '' }
                        : { ...styles2, backgroundColor: folderId === row.id ? '#ddd' : '' }
                    }
                    key={row.id}
                    onClick={(e: any) => onClickOpenFolder(e, row)}
                  >
                    <TableCell sx={{ width: '45%' }} component='th' scope='row'>
                      <Box
                        onContextMenu={(e: any) => {
                          e.preventDefault()
                          handleOpenUserMenu(e, row)
                        }}
                        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                      >
                        <Icon
                          style={{ color: '#7A7979', height: '22px', width: '22px', position: 'relative', left: '7px' }}
                          icon='mdi:folder'
                        />
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                          <Typography
                            style={{
                              position: 'relative',
                              left: '22px',

                              width: '100%'
                            }}
                          >
                            {convertName(row.name)}
                          </Typography>
                          <br />
                          {/* <Typography style={{ marginTop: 6, fontSize: '14px', width: '100%' }}>
                            {row.video.length} Video
                          </Typography> */}
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell
                      onContextMenu={(e: any) => {
                        e.preventDefault()
                        handleOpenUserMenu(e, row)
                      }}
                      align={'center'}
                    >
                      {row.video.length}
                    </TableCell>
                    <TableCell
                      onContextMenu={(e: any) => {
                        e.preventDefault()
                        handleOpenUserMenu(e, row)
                      }}
                      align={'center'}
                    >
                      {props.userData.name}
                    </TableCell>
                    <TableCell>
                      <div>
                        <Box sx={{ flexGrow: 0 }}>
                          {/* <Tooltip title='Open property folder'>
                            <IconButton onClick={(e: any) => handleOpenUserMenu(e, row)} sx={{ p: 0 }}>
                              <Icon icon={'mdi:dots-vertical'} />
                            </IconButton>
                          </Tooltip> */}
                          <Menu
                            sx={{
                              mt: '0px',
                              boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                              '.MuiMenu-paper': { boxShadow: 'rgba(0, 0, 0, 0.01) 0px 0px 0px 1px' }
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

      {/*MODAL SHARE*/}
      <Modal
        open={openModalShare}
        onClose={handleCloseModalShare}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <div>
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
                    onKeyPress={(event: any) => handleOnKeyPressShareFolder(event)}
                  />
                )}
              />
            </div>

            <p style={{ fontWeight: 'bold' }}>People with access</p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
              <ProfilePicture
                style={{ borderRadius: '50%', width: 60, height: 60 }}
                src={dataItemChoose && dataItemChoose.user.avatar}
                alt='profile-picture'
              />
              <p style={{ width: '60%', fontWeight: 'bold' }}>Me</p>
              <p style={{ fontWeight: 'bold', width: '150px', textAlign: 'right' }}>Owner</p>
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
        </div>
      </Modal>

      {/*MODAL DELETE*/}
      <Modal
        ref={nodeRef => {
          if (nodeRef) {
            handleOnKeyPressDeleteFolder(nodeRef)
          }
        }}
        open={openModalDelete}
        onClose={handleCloseModalDelete}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={{ ...styleModalDelete, width: 300 }}>
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
              onClick={() => fnDeleteFolderId(dataItemChoose)}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>

      {/*MODAL GETLINK*/}
      <Modal
        ref={nodeRef => {
          if (nodeRef) {
            handleOnKeyPressCopyLinkFolder(nodeRef)
          }
        }}
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
                width: '100%',
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
                background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)'
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
                }
              }}
              id='outlined-basic'
              label='Rename'
              variant='outlined'
              onKeyPress={(event: any) => {
                if (stateNameFolder) {
                  handleOnKeyPressRenameFolder(event)
                }
              }}
              value={stateNameFolder}
              onChange={(event: any) => setStateNameFolder(event.target.value)}
            />
            <Button
              disabled={stateNameFolder === ''}
              sx={{
                ml: 5,
                height: 38,
                textTransform: 'none',
                background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
                ':disabled': { background: '#80808042' }
              }}
              variant='contained'
              onClick={fnRenameFolder}
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
          <Typography sx={{ fontSize: '16px', fontWeight: '400', marginBottom: '0px' }}>Added to favorite</Typography>
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

      {/*MODAL move to */}
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
              sx={{ width: '100%', '.MuiOutlinedInput-root': { padding: '5px' } }}
              value={valueAutoCompleteMoveTo}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  setValueAutoCompleteMoveTo({
                    title: newValue
                  })
                } else if (newValue && newValue.inputValue) {
                  setValueAutoCompleteMoveTo({
                    title: newValue.inputValue
                  })
                } else {
                  setValueAutoCompleteMoveTo(newValue)
                }
              }}
              filterOptions={(options: any, params: any) => {
                const filtered = filter(options, params)

                return filtered
              }}
              onFocus={() => setFocusMovetoFolder(true)}
              onMouseLeave={() => setFocusMovetoFolder(false)}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id='free-solo-with-text-demo'
              options={listFolderId}
              getOptionLabel={(option: any) => {
                if (typeof option === 'string') {
                  return option
                }
                if (option.inputValue) {
                  return option.inputValue
                } else {
                  return option.title
                }
              }}
              renderOption={(props, option) => (
                <li key={option} {...props}>
                  {option && option?.title}
                </li>
              )}
              freeSolo
              renderInput={params => (
                <TextField
                  sx={{ label: { fontSize: '15px', top: '-5px' } }}
                  label='Move to folder'
                  error={valueAutoCompleteMoveTo === null && focusMovetoFolder === false}
                  helperText={
                    valueAutoCompleteMoveTo === null && focusMovetoFolder === false ? 'Please fill out the form.' : ''
                  }
                  {...params}
                  onKeyPress={(event: any) => {
                    handleOnKeyPressMoveToFolder(event)
                  }}
                />
              )}
            />
            <Button
              disabled={valueAutoCompleteMoveTo === null}
              sx={{
                ml: 5,
                height: 52,
                width: '150px',
                background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
                textTransform: 'none',
                ':disabled': { background: '#80808042' }
              }}
              variant='contained'
              onClick={fnMoveTo}
            >
              Move to
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default MyLibsFolder
