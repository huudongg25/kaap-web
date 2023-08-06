import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { getUser } from '../../service/user'
import { useDispatch } from 'react-redux'
import { updateDataAvatarSlice } from 'src/store/apps/avatar'
import { updateDataUsernameSlice } from 'src/store/apps/nameAccount'

const MyHome = ({ userName }: any) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const fnGetProfileUser = async () => {
    try {
      const res = await getUser()
      if (res.status === 200) {
        const dataUpdateAvatar = {
          avatar: res.data.data.avatar
        }
        const username = {
          name: res.data.data.username
        }

        dispatch(updateDataAvatarSlice(dataUpdateAvatar))
        dispatch(updateDataUsernameSlice(username))
      }
    } catch (error: any) {}
  }
  useEffect(() => {
    fnGetProfileUser().then(r => r)
  }, [])

  return (
    <div>
      <Box
        sx={{
          width: '100%',
          height: '1px',
          backgroundColor: 'rgba(76, 78, 100, 0.38)',
          mb: '30px'
        }}
      ></Box>
      <Typography variant='h4' component='h2'>
        {userName && `${t('Well come back')}, ${userName}`}
      </Typography>
    </div>
  )
}

export default MyHome
