import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { createVideo, getListPeopleShare, getListVideoId, getListFolder } from '../../service/myLibrary'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import SlugFolderHome from './temp/[[...slug]]'
import MyLibsVideoHome from '../../views/my-library/myLibsVideoHome'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { Icon } from '@iconify/react'

const MyLibrary = () => {
  const router = useRouter()
  const styleModalNewFolder = {
    position: 'absolute',
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
  const [listPeopleShare, setListPeopleShare] = useState()
  const [paramApiListPeopleShare] = useState({
    page: 1,
    limit: 100000,
    videoParent: true
  })
  const [keySearch, setKeySearch] = useState()
  const [isSearch, setIsSearch] = useState(false)
  const [, setIdApiFolder] = useState('')
  const [openModalNewVideo, setOpenModalNewVideo] = useState<boolean>(false)
  const [nameCreateNewVideo, setNameCreateNewVideo] = useState<any>('')
  const [linkCreateNewVideo, setLinkCreateNewVideo] = useState<any>('')
  const [dataVideo, setDataVideo] = useState<any[]>([])
  const [stateParamVideo, setStateParamVideo] = useState({ page: 1, limit: 100000, videoParent: true })
  const [textSearch] = useState('')
  const fnGetListVideo = async (data: any) => {
    try {
      const res = await getListVideoId(data)
      setDataVideo(res.data.data.items)
    } catch (error) {}
  }
  const fnGetListPeopleShare = async (param: any, sortType?: string, isFavorite?: string, name?: string) => {
    try {
      const res = await getListPeopleShare(param, sortType, isFavorite, name)
      setListPeopleShare(res.data.data.items)
    } catch (error) {}
  }

  useEffect(() => {
    const temp = {
      videoParent: true,
      page: stateParamVideo.page,
      limit: stateParamVideo.limit,
      name: textSearch === '' ? null : textSearch
    }
    fnGetListVideo(temp).then(r => r)
    setStateParamVideo(stateParamVideo)
  }, [stateParamVideo, textSearch])

  useEffect(() => {
    fnGetListPeopleShare(paramApiListPeopleShare)
  }, [paramApiListPeopleShare])

  useEffect(() => {
    if (window.location.pathname.split('/').length < 4) {
      const data = {
        page: 1,
        limit: 100000,
        videoParent: true
      }
      setParamApiListFolder(data)
      setParamApiListVideo(data)
    } else {
      const data = {
        videoParent: true,
        page: 1,
        limit: 100000,
        parentId: window.location.pathname.split('/')[window.location.pathname.split('/').length - 3]
      }
      setParamApiListFolder(data)
      setParamApiListVideo(data)
      setIdApiFolder(window.location.pathname.split('/')[window.location.pathname.split('/').length - 3])
    }
  }, [window.location.pathname])

  const handleCloseModalNewVideo = () => {
    setOpenModalNewVideo(false)
  }
  const fnCreateVideo = async (nameVideo: string, link: string) => {
    try {
      const temp = {
        name: nameVideo,
        link: link,
        folderId: valueAutoComplete && valueAutoComplete.id
      }
      handleCloseModalNewVideo()
      const tempListVideo = [{ id: '', name: nameVideo, link: link }].concat(dataVideo)
      setDataVideo(tempListVideo)
      await createVideo(temp)
      await fnGetListVideo({ page: 1, limit: 100000 })
    } catch (error) {}
  }
  useEffect(() => {
    setLinkCreateNewVideo(linkCreateNewVideo)
  }, [linkCreateNewVideo])

  const [valueAutoComplete, setValueAutoComplete] = useState<any>(null)
  const [listFolder, setListFolder] = useState<any[]>()
  const filter = createFilterOptions<any>()

  async function getListFolderApi(params: any) {
    try {
      const res = await getListFolder(params)
      setListFolder(res.data.data.listFolder.items)
    } catch (error) {}
  }

  const handleCloseSearchInput = () => {
    if (!keySearch) {
      setIsSearch(false)
    }
  }

  const handleSearch = () => {
    console.log(keySearch)
  }

  const handleOnKeyPressSearchFolder = (event: any) => {
    if (event.key === 'Enter') {
      if (keySearch !== '') {
        handleSearch()
      }
    }
  }

  let optionListPeopleShare: any | { id: any; title: any }[] = [{ title: '', id: '' }]
  optionListPeopleShare =
    listFolder &&
    listFolder.map((item: any) => {
      return {
        title: item.name,
        id: item.id
      }
    })

  const [focusInputVideoName, setFocusInputVideoName] = useState<boolean>(false)
  const [focusInputVideoLink, setFocusInputVideoLink] = useState<boolean>(false)
  const [focusAutocompleteListFolder, setFocusAutocompleteListFolder] = useState<boolean>(false)

  const callbackFunctionFolder = () => {
    const params = {
      page: 1,
      limit: 100000,
      videoParent: true
    }
    getListFolderApi(params).then(r => r)
  }
  const [showIconVideo, setShowIconVideo] = useState<boolean>(false)
  const callbackFunctionShowIcon = (item: boolean) => {
    setShowIconVideo(item)
  }

  const [paramApiListFolder, setParamApiListFolder] = useState({ page: 1, limit: 100000, videoParent: true })
  const [, setParamApiListVideo] = useState({ page: 1, limit: 100000, videoParent: true })

  const fnGetListFolder = async (data: any) => {
    try {
      const res = await getListFolder(data)
      setListFolder(res.data.data.listFolder.items)
    } catch (error) {}
  }
  const callbackFunctionIdVideo = () => {
    fnGetListFolder(paramApiListFolder)
    fnGetListVideo({ page: 1, limit: 100000, videoParent: true, sortBy: 'updatedDate', sortType: 'DESC' })
  }

  const userDataLocal = {
    name: localStorage.getItem('user-name')
  }

  useEffect(() => {
    getShowList()
  }, [])

  const getShowList = () => {
    const item = localStorage.getItem('showListItem')
    if (item == 'true') {
      setShowIconVideo(true)
    } else {
      setShowIconVideo(false)
    }
  }

  return (
    <div>
      <SlugFolderHome
        listFolder={listFolder}
        userData={userDataLocal}
        parentCallbackFolder={callbackFunctionFolder}
        parentCallbackShowIcon={callbackFunctionShowIcon}
      ></SlugFolderHome>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          ml: { xs: 0, md: 0 },
          mt: 0,
          alignItems: 'center',
          flexWrap: ['wrap', 'nowrap'],
          justifyContent: 'center'
        }}
      >
        <Button
          sx={{
            mr: '0px',
            background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
            textTransform: 'none',
            paddingLeft: 3,
            paddingRight: 3,
            fontSize: 12,
            marginTop: '2rem'
          }}
          onClick={() => router.push('/my-library/folder')}
          variant='contained'
        >
          S{'how more...'.toLowerCase()}
        </Button>
      </Box>

      <div style={{ marginTop: '30px' }}>
        <Box
          sx={{
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(76, 78, 100, 0.38)',
            mb: '30px'
          }}
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
            justifyContent: 'flex-start'
          }}
        >
          <Box
            sx={{
              width: '65%',
              display: 'flex',
              ml: { xs: 0, md: 0 },
              alignItems: 'center',
              flexWrap: ['wrap', 'nowrap'],
              justifyContent: 'space-between',
              flexDirection: 'column'
            }}
          >
            <Typography
              onClick={() => router.push('/my-library/video')}
              sx={{ mb: 0, fontSize: '16px', fontWeight: '450', width: '100%', left: '0', cursor: 'pointer' }}
            >
              {'My Video'}
            </Typography>
          </Box>
          {isSearch ? (
            <FormControl className='form-search-bar' sx={{ m: 1, width: '35%' }} variant='outlined'>
              <InputLabel sx={{ fontSize: '16px', top: '-5px' }} htmlFor='outlined-adornment-password'>
                Search video
              </InputLabel>
              <OutlinedInput
                sx={{ height: '32px', input: { padding: '5px', paddingLeft: '10px' } }}
                onChange={(event: any) => {
                  return setKeySearch(event && event.target.value)
                }}
                onBlur={handleCloseSearchInput}
                autoFocus
                id='outlined-adornment-password'
                type={'text'}
                onKeyPress={(event: any) => handleOnKeyPressSearchFolder(event)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton aria-label='toggle password visibility' onClick={handleSearch} edge='end'>
                      <Icon icon='mdi:magnify' />
                    </IconButton>
                  </InputAdornment>
                }
                label='Search folder'
              />
            </FormControl>
          ) : (
            <div style={{ width: '35%', display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
              <IconButton aria-label='toggle password visibility' onClick={() => setIsSearch(true)} edge='end'>
                <Icon icon='mdi:magnify' />
              </IconButton>
            </div>
          )}
        </Box>
      </div>

      {dataVideo.length !== 0 && (
        <MyLibsVideoHome
          parentCallbackIdVideo={callbackFunctionIdVideo}
          showIconVideo={showIconVideo}
          option={false}
          props={dataVideo}
          listPeopleShare={listPeopleShare}
        ></MyLibsVideoHome>
      )}
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          position: 'relative',
          top: '2rem',
          ml: { xs: 0, md: 0 },

          alignItems: 'center',
          flexWrap: ['wrap', 'nowrap'],
          justifyContent: 'center'
        }}
      >
        <Button
          onClick={() => router.push('/my-library/video')}
          sx={{
            fontSize: 12,
            mr: '0px',

            background: 'linear-gradient(90deg, #FF74A6 0%, #FFC371 100%)',
            textTransform: 'none',
            paddingLeft: 3,
            paddingRight: 3
          }}
          variant='contained'
        >
          S{'how more...'.toLowerCase()}
        </Button>
      </Box>
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
            helperText={focusInputVideoLink && linkCreateNewVideo === '' ? 'Please enter the folder link video' : ''}
            error={focusInputVideoLink && linkCreateNewVideo === ''}
            onFocus={() => setFocusInputVideoLink(true)}
          />

          <Autocomplete
            onFocus={() => setFocusAutocompleteListFolder(true)}
            value={valueAutoComplete}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setValueAutoComplete({
                  title: newValue
                })
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setValueAutoComplete({
                  title: newValue.inputValue
                })
              } else {
                setValueAutoComplete(newValue)
              }
            }}
            filterOptions={(options: any, params: any) => {
              return filter(options, params)
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id='free-solo-with-text-demo'
            options={optionListPeopleShare}
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
            sx={{ width: '100%' }}
            freeSolo
            renderInput={params => (
              <TextField
                label='List folder'
                error={focusAutocompleteListFolder && !valueAutoComplete}
                helperText={focusAutocompleteListFolder && !valueAutoComplete ? 'Please fill out the form.' : ''}
                {...params}
              />
            )}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignCenter: 'center' }}>
            <Button sx={{ fontSize: '1.03em' }} variant='text' onClick={handleCloseModalNewVideo}>
              Cancel
            </Button>
            <Button
              sx={{ fontSize: '1.03em' }}
              variant='text'
              disabled={
                nameCreateNewVideo === '' ||
                linkCreateNewVideo === '' ||
                valueAutoComplete == '' ||
                (valueAutoComplete && valueAutoComplete.title === '') ||
                valueAutoComplete === null
              }
              onClick={() => fnCreateVideo(nameCreateNewVideo, linkCreateNewVideo)}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

export default MyLibrary
