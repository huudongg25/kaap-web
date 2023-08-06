import { useEffect, useState } from 'react'
import { getListVideoIdWatch } from '../../../service/myLibrary'
import { Box, Typography } from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useRouter } from 'next/dist/client/router'
import { useDispatch } from 'react-redux'
import { updateDataVideo } from 'src/store/apps/video'

function SlugWatchVideo() {
  const [timer, setTimer] = useState(false)
  const [videoLink, setVideoLink] = useState<any>()
  const [idVideo] = useState<any>(window.location.pathname.split('/')[window.location.pathname.split('/').length - 2])

  const router = useRouter()
  const dispatch = useDispatch()

  const fnGetVideoID = async (data: any) => {
    try {
      const res = await getListVideoIdWatch(data)
      if (res.status === 200) {
      }
      setVideoLink(res.data.data)
      dispatch(
        updateDataVideo({
          name: res?.data?.data?.name,
          roleGeneral: res?.data?.data?.roleGeneral,
          user: res?.data?.data?.user,
          updatedDate: res?.data?.data?.updatedDate
        })
      )

      return res
    } catch (error) {}
  }

  const [valueLinkVideo, setValueLinkVideo] = useState<any>(videoLink?.link)
  useEffect(() => {
    fnGetVideoID(idVideo)
  }, [])

  useEffect(() => {
    if (!videoLink) {
      setTimer(false)
    } else {
      setTimer(true)
      setValueLinkVideo(videoLink?.link)
    }
  }, [videoLink])

  return (
    <div>
      <Box
        className='underline'
        sx={{
          width: '100%',
          height: '1px',
          backgroundColor: 'rgba(76, 78, 100, 0.38)'
        }}
      ></Box>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: '10px',
          padding: '10px 0',
          justifyContent: 'space-between'
        }}
      >
        <div style={{ display: 'flex' }}>
          <button
            onClick={() => router.back()}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', alignContent: 'flex-start' }}
          >
            <Typography sx={{ fontSize: '15px' }}>
              <ArrowBackIosIcon sx={{ transform: 'translateY(1px)', fontSize: '12px', marginRight: '-5px' }} /> Back
            </Typography>
          </button>
        </div>
      </div>
      {timer && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <video
            style={{ width: '85%', height: '85%', borderRadius: '10px', padding: '0', margin: '0' }}
            controls
            autoPlay
            title={videoLink && videoLink.name}
          >
            <source src={videoLink && valueLinkVideo} type='video/mp4' />
          </video>
        </div>
      )}
    </div>
  )
}
export default SlugWatchVideo

// NOT_VIEW = 1,
//   VIEW = 2,
//   EDIT = 3,
//   DELETE = 4,
