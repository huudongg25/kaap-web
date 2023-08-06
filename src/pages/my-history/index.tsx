import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import MyHistory from 'src/views/my-history'
import { getListHistory, deleteVideoItem, deleteAllVideo, updateUser } from '../../service/historyService'
import { getHomeUser } from '../../service/home'
import moment from 'moment'

const History = () => {
  const [listHistory, setListHistory] = useState<any[]>([])
  const [open, setOpen] = useState(false)
  const [diaLogText, setDiaLogText] = useState('')
  const [idVideo, setIdVideo] = useState('')
  const [num, setNum] = useState(0)
  const [isShowPlay, setIsShowPlay] = useState(false)
  const [isShowGlass, setIsShowGlass] = useState(true)
  const [search, setSearch] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [keySearch, setKeySearch] = useState()
  const handleChangeSearch = (val: any) => {
    setSearch(val)
  }
  const clickIconSearch = () => {
    handleGetListHistory(search)
  }
  const handleGetListHistory = async (name: any) => {
    const res = await getListHistory(name)
    let listTimeFromNow: string[] = []
    res.data.data.items.forEach((item: any) => {
      const findListTimeFromNowTem = listTimeFromNow?.find(
        (itemTime: any) =>
          itemTime == moment(item.updatedDate)?.fromNow() ||
          (itemTime == 'today' && moment(item.updatedDate)?.format('DD/MM/YYYY') == moment()?.format('DD/MM/YYYY')) ||
          (itemTime == 'yesterday' &&
            moment(item.updatedDate)?.format('DD/MM/YYYY') == moment()?.subtract(1, 'days')?.format('DD/MM/YYYY'))
      )

      if (!findListTimeFromNowTem) {
        if (moment(item.updatedDate)?.format('DD/MM/YYYY') == moment()?.format('DD/MM/YYYY')) {
          listTimeFromNow = []
          item.stringShowTime = 'Today'
          listTimeFromNow.push('today')
        } else if (
          moment(item.updatedDate)?.format('DD/MM/YYYY') == moment()?.subtract(1, 'days')?.format('DD/MM/YYYY')
        ) {
          item.stringShowTime = 'Yesterday'
          listTimeFromNow.push('yesterday')
        } else {
          item.stringShowTime = moment(item.updatedDate)?.format('DD/MM/YYYY')
          listTimeFromNow.push(moment(item.updatedDate)?.fromNow())
        }
      }
    })
    setListHistory([...res.data.data.items])
  }
  const handleGetUser = async () => {
    const res = await getHomeUser()
    const data = res.data.data
    setIsShowPlay(data.isStopSaveHistoryVideo)
    setIsShowGlass(data.isAutoDeleteHistoryVideo)
  }
  const handleDeleteItem = async () => {
    await deleteVideoItem(idVideo)
    handleGetListHistory(null)
    setOpen(false)
  }
  const handlePauseVideo = async (data: any) => {
    await updateUser(data)
    setIsShowPlay(!isShowPlay)
  }
  const clickIconPlay = () => {
    if (!isShowPlay) {
      handlePauseVideo({ isStopSaveHistoryVideo: true })
    } else {
      handlePauseVideo({ isStopSaveHistoryVideo: false })
    }
  }
  const handleAutoPlay = async (data: any) => {
    await updateUser(data)
    setIsShowGlass(!isShowGlass)
  }
  const clickIconGlass = () => {
    if (isShowGlass) {
      handleAutoPlay({ isAutoDeleteHistoryVideo: false })
    } else {
      handleAutoPlay({ isAutoDeleteHistoryVideo: true })
    }
  }

  const handleCloseSearchInput = () => {
    if (!keySearch) {
      setIsSearch(false)
    }
  }
  const handleClickIconX = (e: any, id: any) => {
    e.stopPropagation()
    setDiaLogText('Do you want to delete this video?')
    setOpen(true)
    setIdVideo(id)
    setNum(1)
  }
  const clickIconDeleteAll = () => {
    setDiaLogText('Do you want to delete all videos?')
    setOpen(true)
    setNum(2)
  }
  const handleDeleteAll = async () => {
    await deleteAllVideo()
    handleGetListHistory(null)
    setOpen(false)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const actionVideo = async () => {
    switch (num) {
      case 1:
        handleDeleteItem()
        break
      case 2:
        handleDeleteAll()
        break
      case 3:
        break
      case 4:
        break
    }
  }
  useEffect(() => {
    handleGetListHistory(null)
    handleGetUser()
  }, [])

  return (
    <Box>
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby='draggable-dialog-title'>
          <DialogContent>
            <DialogContentText>{diaLogText}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              No
            </Button>
            <Button onClick={() => actionVideo()}>Yes</Button>
          </DialogActions>
        </Dialog>
      </div>
      <MyHistory
        listHistory={listHistory}
        handleClickIconX={handleClickIconX}
        clickIconDeleteAll={clickIconDeleteAll}
        isShowPlay={isShowPlay}
        clickIconPlay={clickIconPlay}
        isShowGlass={isShowGlass}
        clickIconGlass={clickIconGlass}
        handleChangeSearch={handleChangeSearch}
        search={search}
        isSearch={isSearch}
        handleCloseSearchInput={handleCloseSearchInput}
        setKeySearch={setKeySearch}
        setIsSearch={setIsSearch}
        clickIconSearch={clickIconSearch}
      />
    </Box>
  )
}

export default History
