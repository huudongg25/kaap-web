// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import Autocomplete from 'src/layouts/components/Autocomplete'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown, {
  NotificationsType
} from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from 'src/store'
import moment from 'moment'
import EditIcon from '@mui/icons-material/Edit'
import { InputAdornment, TextField } from '@mui/material'
import { useState } from 'react'
import { postListVideoId } from 'src/service/myLibrary'
import { useDispatch } from 'react-redux'
import { updateDataVideo } from 'src/store/apps/video'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const notifications: NotificationsType[] = [
  {
    meta: 'Today',
    avatarAlt: 'Flora',
    title: 'Congratulation Flora! 🎉',
    avatarImg: '/images/avatars/4.png',
    subtitle: 'Won the monthly best seller badge'
  },
  {
    meta: 'Yesterday',
    avatarColor: 'primary',
    subtitle: '5 hours ago',
    avatarText: 'Robert Austin',
    title: 'New user registered.'
  },
  {
    meta: '11 Aug',
    avatarAlt: 'message',
    title: 'New message received 👋🏻',
    avatarImg: '/images/avatars/5.png',
    subtitle: 'You have 10 unread messages'
  },
  {
    meta: '25 May',
    title: 'Paypal',
    avatarAlt: 'paypal',
    subtitle: 'Received Payment',
    avatarImg: '/images/misc/paypal.png'
  },
  {
    meta: '19 Mar',
    avatarAlt: 'order',
    title: 'Received Order 📦',
    avatarImg: '/images/avatars/3.png',
    subtitle: 'New order received from John'
  },
  {
    meta: '27 Dec',
    avatarAlt: 'chart',
    subtitle: '25 hrs ago',
    avatarImg: '/images/misc/chart.png',
    title: 'Finance report has been generated'
  }
]

const AppBarContent = (props: Props) => {
  // ** Props
  const router = useRouter()
  const dispatch = useDispatch()

  const { hidden, settings, toggleNavVisibility } = props

  const [toggleInput, setToggleInput] = useState<any>(false)

  const dataVideo = useSelector((state: RootState) => state.dataVideo)

  const fnRenameVideoIdApi = async (id?: any, data?: any) => {
    try {
      const res = await postListVideoId(id, data)
      if (res.status === 200) {
        setToggleInput(false)
      }
    } catch (error) {}
  }

  function handleKeyPress(event: any) {
    if (event.charCode === 13 || event.charCode === 0) {
      const resLocalInfoVideo = JSON.parse(localStorage.getItem('info-watch-video') || '')
      if (resLocalInfoVideo !== '') {
        fnRenameVideoIdApi(resLocalInfoVideo.id, { name: dataVideo?.name, folderId: resLocalInfoVideo.folderId })
      }
    }
  }

  const _onBlur = () => {
    const resLocalInfoVideo = JSON.parse(localStorage.getItem('info-watch-video') || '')
    if (resLocalInfoVideo !== '') {
      fnRenameVideoIdApi(resLocalInfoVideo.id, { name: dataVideo?.name, folderId: resLocalInfoVideo.folderId })
    }
  }

  const _changeNameVideo = (value: string) => {
    dispatch(
      updateDataVideo({
        name: value,
        roleGeneral: dataVideo?.roleGeneral,
        user: dataVideo?.user,
        updatedDate: dataVideo?.updatedDate
      })
    )
  }

  return (
    <Box
      sx={{
        minHeight: '54px',
        padding: router?.pathname?.includes('watch-video') ? '10px 0' : 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box className='actions-left' sx={{ mr: 0, display: 'flex', alignItems: 'center', flexShrink: 3 }}>
        {hidden && !settings.navHidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}
      </Box>
      {router?.pathname?.includes('watch-video') && (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
          <div>
            <div>
              {!toggleInput && (
                <p onClick={() => setToggleInput(true)} style={{ fontSize: '22px', fontWeight: '700', margin: 0 }}>
                  {dataVideo?.name}
                </p>
              )}
              {toggleInput && (
                <div>
                  {
                    <TextField
                      autoFocus
                      onChange={(event: any) => _changeNameVideo(event.target.value)}
                      onBlur={_onBlur}
                      value={dataVideo?.name}
                      onKeyPress={(event: any) => handleKeyPress(event)}
                      sx={{
                        width: 'auto',
                        marginBottom: '10px',
                        padding: '0',
                        input: { fontSize: '22px', fontWeight: '700', padding: '7px' }
                      }}
                      id='input-with-icon-textfield'
                      label=''
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <EditIcon />
                          </InputAdornment>
                        )
                      }}
                      variant='outlined'
                    />
                  }
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    marginRight: '10px',
                    borderRadius: '50%',
                    overflow: 'hidden'
                  }}
                >
                  <img style={{ width: '100%', height: '100%' }} src={dataVideo?.user?.avatar} alt='' />
                </div>
                <p style={{ margin: 0, paddingRight: '20px', fontSize: 12 }}>{dataVideo?.user?.name}</p>
                <p style={{ margin: 0, paddingRight: '20px', fontSize: 12 }}>
                  {moment(dataVideo?.updatedDate).format('DD-MM-YYYY')}
                </p>
                <p style={{ margin: 0, paddingRight: '20px', fontSize: 12 }}>
                  {dataVideo?.roleGeneral === 2 && <div>VIEW</div>}
                  {dataVideo?.roleGeneral === 3 && <div>EDIT</div>}
                  {dataVideo?.roleGeneral === 3 && <div>DELETE</div>}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Box
        className='actions-right'
        sx={{ display: 'flex', alignItems: 'center', flexShrink: 1, justifyContent: 'space-between', width: '100%' }}
      >
        <Autocomplete />
        <div style={{ textAlign: 'right' }} className='list-item-select-desk'>
          <NotificationDropdown settings={settings} notifications={notifications} />
          <UserDropdown settings={settings} />
        </div>
        <div className='list-item-select-mb'>
          <UserDropdown settings={settings} />
        </div>
      </Box>
    </Box>
  )
}

export default AppBarContent
