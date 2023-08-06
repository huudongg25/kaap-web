import React, { useEffect, useState } from 'react'
import Header from '../../views/my-recyclebin/header'
import Recyclebin from '../../views/my-recyclebin'
import { getListRecycleBin } from '../../service/home'
import moment from 'moment'

const MyRecycleBin = () => {
  const [dataVideo, setDataVideo] = useState<any[]>([])
  const [nameSearch, setNameSearch] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [keySearch, setKeySearch] = useState()
  const [search, setSearch] = useState({
    page: 1,
    limit: 100000,
    sortBy: 'updatedDate',
    sortType: 'DESC',
    isSoft: 'false',
    name: ''
  })
  const handleCloseSearchInput = () => {
    if (!keySearch) {
      setIsSearch(false)
    }
  }
  const [sorfDate, setSorfDate] = useState(true)
  const [showIconList, setShowIconList] = useState('')
  const handleChangeNameSearch = (value: string) => {
    setNameSearch(value)
  }
  const handleSearchName = () => {
    handleGetListVideo(search)
  }

  //get list video
  const handleGetListVideo = async (params: any) => {
    try {
      const res = await getListRecycleBin(params)
      if (res.data.data.items.length > 0) {
        let listTimeFromNow: string[] = []
        res.data.data.items.forEach((item: any) => {
          const findListTimeFromNowTem = listTimeFromNow?.find(
            (itemTime: any) =>
              itemTime == moment(item.updatedDate)?.fromNow() ||
              (itemTime == 'today' &&
                moment(item.updatedDate)?.format('DD/MM/YYYY') == moment()?.format('DD/MM/YYYY')) ||
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
        setDataVideo([...res.data.data.items])
      } else {
        setDataVideo([])
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleDeletedDate = () => {
    setSorfDate(!sorfDate)
  }
  const handleSetIconShowList = () => {
    if (showIconList == 'true') {
      localStorage.setItem('isIconList', 'false')
      setShowIconList('false')
    } else {
      localStorage.setItem('isIconList', 'true')
      setShowIconList('true')
    }
  }
  useEffect(() => {
    const isIconList = localStorage.getItem('isIconList')
    if (isIconList) {
      setShowIconList(isIconList)
    } else {
      setShowIconList('false')
    }
  }, [])
  useEffect(() => {
    setSearch({
      ...search,
      name: nameSearch
    })
  }, [nameSearch])
  const handleChangeASC = () => {
    if (sorfDate) {
      const searcDESC = {
        ...search,
        sortBy: 'updatedDate',
        isSoft: false,
        sortType: 'DESC'
      }
      handleGetListVideo(searcDESC)
    } else {
      const searcASC = {
        ...search,
        sortBy: 'updatedDate',
        isSoft: false,
        sortType: 'ASC'
      }
      handleGetListVideo(searcASC)
    }
  }
  useEffect(() => {
    handleChangeASC()
  }, [sorfDate])

  return (
    <div>
      <Header
        handleSearchName={handleSearchName}
        nameSearch={nameSearch}
        handleChangeNameSearch={handleChangeNameSearch}
        showIconList={showIconList}
        handleSetIconShowList={handleSetIconShowList}
        search={search}
        isSearch={isSearch}
        handleCloseSearchInput={handleCloseSearchInput}
        setKeySearch={setKeySearch}
        setIsSearch={setIsSearch}
        handleGetListVideo={handleGetListVideo}
      />
      <Recyclebin
        handleGetListVideo={handleGetListVideo}
        dataVideo={dataVideo}
        search={search}
        handleDeletedDate={handleDeletedDate}
        showIconList={showIconList}
        sorfDate={sorfDate}
        setDataVideo={setDataVideo}
      />
    </div>
  )
}

export default MyRecycleBin
