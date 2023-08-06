import BaseAxios from '../utils/baseAxios'

const getHomeUser = () => {
  return BaseAxios({
    url: `user/profile`,
    method: 'GET'
  })
}

const getListVideo = (params: any) => {
  return BaseAxios({
    url: `video`,
    method: 'GET',
    params
  })
}

const getListFolder = (params: any) => {
  return BaseAxios({
    url: `folder`,
    method: 'GET',
    params
  })
}

const deleteAllVideo = () => {
  return BaseAxios({
    url: `video`,
    method: 'DELETE'
  })
}

const deleteAllFolder = () => {
  return BaseAxios({
    url: `folder`,
    method: 'DELETE'
  })
}

const restoreVideo = (id: any) => {
  return BaseAxios({
    url: `video/${id}/restore`,
    method: 'POST'
  })
}

const restoreFolder = (id: any) => {
  return BaseAxios({
    url: `folder/${id}/restore`,
    method: 'POST'
  })
}

const deleteIdVideo = (id: any) => {
  return BaseAxios({
    url: `video/${id}`,
    method: 'DELETE',
    params: {
      isSoft: false
    }
  })
}

const deleteIdFolder = (id: any) => {
  return BaseAxios({
    url: `folder/${id}`,
    method: 'DELETE',
    params: {
      isSoft: false
    }
  })
}

const getListRecycleBin = (params: any) => {
  return BaseAxios({
    url: `user/list-recycle`,
    method: 'GET',
    params
  })
}

export {
  getHomeUser,
  getListVideo,
  deleteAllVideo,
  restoreVideo,
  deleteIdVideo,
  getListFolder,
  restoreFolder,
  deleteIdFolder,
  getListRecycleBin,
  deleteAllFolder
}
