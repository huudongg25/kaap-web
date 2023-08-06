import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import { Icon } from '@iconify/react'
import Button from '@mui/material/Button'

import { createVideo, getListPeopleShare, getListVideoId } from '../../../service/myLibrary'
import MyLibsVideo from '../../../views/my-library/myLibsVideo'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import Spinner from 'src/@core/components/spinner'

function MyVideoLibrary() {
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

  const [isSearch, setIsSearch] = useState(false)
  const [showIconList, setShowIconList] = useState(false)
  const [textSearch, setTextSearch] = useState('')
  const [dataVideo, setDataVideo] = useState<any[]>([])
  const [stateParamVideo, setStateParamVideo] = useState({ page: 1, limit: 20, videoParent: true })
  const [openModalNewVideo, setOpenModalNewVideo] = useState(false)
  const [nameCreateNewVideo, setNameCreateNewVideo] = useState('')
  const [linkCreateNewVideo, setLinkCreateNewVideo] = useState('')
  const [, setIdApiFolder] = useState('')
  const [listPeopleShare, setListPeopleShare] = useState()
  const [paramApiListPeopleShare] = useState({
    page: 1,
    limit: 100000
  })
  const callbackFunctionIdVideo = () => {
    fnGetListVideo(dataVideo)
  }
  const [showSpinner, setShowSpinner] = useState<boolean>(true)
  const fnGetListVideo = async (data: any) => {
    try {
      const res = await getListVideoId(data)
      setDataVideo(res.data.data.items)
      if (res.status === 200) {
        setShowSpinner(true)
      }
      setShowSpinner(false)
    } catch (error) {}
  }
  const fnGetListPeopleShare = async (param: any, sortType?: string, isFavorite?: string, name?: string) => {
    try {
      const res = await getListPeopleShare(param, sortType, isFavorite, name)
      setListPeopleShare(res.data.data.items)
    } catch (error) {}
  }
  useEffect(() => {
    fnGetListPeopleShare(paramApiListPeopleShare)
  }, [paramApiListPeopleShare])
  useEffect(() => {
    const temp = {
      page: stateParamVideo.page,
      limit: stateParamVideo.limit,
      videoParent: true,
      name: textSearch === '' ? null : textSearch
    }
    fnGetListVideo(temp)
    setStateParamVideo(stateParamVideo)
  }, [textSearch])

  useEffect(() => {
    if (window.location.pathname.split('/').length < 4) {
    } else {
      setIdApiFolder(window.location.pathname.split('/')[window.location.pathname.split('/').length - 3])
    }
  }, [window.location.pathname])

  const handleSearch = () => {
    setTextSearch(textSearch)
  }

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
      await fnGetListVideo({ page: 1, limit: 100000, videoParent: true, sortBy: 'updatedDate', sortType: 'DESC' })
    } catch (error) {}
  }

  useEffect(() => {
    setLinkCreateNewVideo(linkCreateNewVideo)
  }, [linkCreateNewVideo])

  const [valueAutoComplete, setValueAutoComplete] = useState<any>(null)
  const [listFolder] = useState<any[]>()
  const [focusInputVideoName, setFocusInputVideoName] = useState<boolean>(false)
  const [focusInputVideoLink, setFocusInputVideoLink] = useState<boolean>(false)
  const [focusAutocompleteListFolder, setFocusAutocompleteListFolder] = useState<boolean>(false)

  const filter = createFilterOptions<any>()
  let optionListPeopleShare: any | { id: any; title: any }[] = [{ title: '', id: '' }]
  optionListPeopleShare =
    listFolder &&
    listFolder.map((item: any) => {
      return {
        title: item.name,
        id: item.id
      }
    })

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

  const handleCloseSearchInput = () => {
    if (!textSearch) {
      setIsSearch(false)
    }
  }

  const handleOnKeyPressSearchFolder = (event: any) => {
    if (event.key === 'Enter') {
      if (textSearch !== '') {
        handleSearch()
      }
    }
  }

  return (
    <div>
      {showSpinner && <Spinner></Spinner>}

      {!showSpinner && (
        <div>
          <div>
            <Box
              className='underline'
              sx={{
                width: '100%',
                height: '1px',
                backgroundColor: 'rgba(76, 78, 100, 0.38)',
                mb: '10px'
              }}
            ></Box>

            <div className='wrapper-search-video-desk'>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',

                  ml: { xs: 0, md: 0 },
                  alignItems: 'center',
                  flexWrap: 'nowrap',
                  justifyContent: 'space-between'
                }}
              >
                <Box
                  className=''
                  sx={{
                    width: '77%',
                    display: 'flex',
                    ml: { xs: 0, md: 0 },
                    alignItems: 'center',
                    flexWrap: 'nowrap',
                    justifyContent: ['center', 'space-between'],
                    flexDirection: 'column'
                  }}
                >
                  <Typography sx={{ fontSize: '16px', width: '100%', left: '0', fontWeight: '450' }}>
                    {'My Video'}
                  </Typography>
                </Box>

                {isSearch ? (
                  <FormControl sx={{ m: 1, width: '23%' }} variant='outlined'>
                    <InputLabel sx={{ fontSize: '15px', top: '-10px' }} htmlFor='outlined-adornment-password'>
                      Search video
                    </InputLabel>
                    <OutlinedInput
                      sx={{ height: '35px', input: { padding: '5px', paddingLeft: '10px' } }}
                      id='outlined-adornment-password'
                      type={'text'}
                      value={textSearch}
                      onKeyPress={(event: any) => handleOnKeyPressSearchFolder(event)}
                      onBlur={handleCloseSearchInput}
                      onChange={(event: any) => setTextSearch(event.target.value)}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={() => setIsSearch(false)}
                            edge='end'
                          >
                            <Icon icon='mdi:magnify' />
                          </IconButton>
                        </InputAdornment>
                      }
                      label='Search video'
                    />
                  </FormControl>
                ) : (
                  <div style={{ width: '23%', display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
                    <IconButton aria-label='toggle password visibility' onClick={() => setIsSearch(true)} edge='end'>
                      <Icon icon='mdi:magnify' />
                    </IconButton>
                  </div>
                )}

                <Button
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
              </Box>
            </div>

            <div className='wrapper-search-video-mb'>
              <Box
                className=''
                sx={{
                  width: '100%',
                  display: 'flex',
                  ml: { xs: 0, md: 0 },
                  alignItems: 'center',
                  flexWrap: ['wrap', 'nowrap'],
                  justifyContent: ['center', 'space-between'],
                  flexDirection: 'column'
                }}
              >
                <Typography sx={{ mb: 3, fontSize: '20px', width: '100%', left: '0', fontWeight: '450' }}>
                  {'My Library'}
                </Typography>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <FormControl sx={{ m: 1, width: '100%', p: 0, mx: 0 }} variant='outlined'>
                    <InputLabel sx={{ fontSize: '15px', top: '-5px' }} htmlFor='outlined-adornment-password'>
                      Search video
                    </InputLabel>
                    <OutlinedInput
                      sx={{ height: '45px', input: { padding: '5px', paddingLeft: '10px' } }}
                      id='outlined-adornment-password'
                      type={'text'}
                      value={textSearch}
                      onChange={(event: any) => setTextSearch(event.target.value)}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton aria-label='toggle password visibility' onClick={handleSearch} edge='end'>
                            <Icon icon='mdi:magnify' />
                          </IconButton>
                        </InputAdornment>
                      }
                      label='Search video'
                    />
                  </FormControl>

                  <Button
                    sx={{ mx: 0, pr: 0, minWidth: 'auto' }}
                    variant='text'
                    onClick={() => setShowIconList(!showIconList)}
                  >
                    {showIconList && <Icon style={{ fontSize: 30, color: '#FF74A6' }} icon='mdi:list-box-outline' />}
                    {!showIconList && (
                      <Icon style={{ fontSize: 30, color: '#FF74A6' }} icon='mdi:view-grid-plus-outline' />
                    )}
                  </Button>
                </div>

                <Typography sx={{ mb: 0, fontSize: '16px', width: '100%', left: '0' }}>{'My Video'}</Typography>
              </Box>
            </div>
          </div>

          {dataVideo.length !== 0 && (
            <MyLibsVideo
              option={false}
              parentCallbackIdVideo={callbackFunctionIdVideo}
              listShow={showIconList}
              props={dataVideo}
              listPeopleShare={listPeopleShare}
            />
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
                    (valueAutoComplete && valueAutoComplete.title) === undefined
                  }
                  onClick={() => fnCreateVideo(nameCreateNewVideo, linkCreateNewVideo)}
                >
                  Create
                </Button>
              </Box>
            </Box>
          </Modal>
        </div>
      )}
    </div>
  )
}

export default MyVideoLibrary
