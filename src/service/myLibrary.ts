import BaseAxios from '../utils/baseAxios'

const createFolder = (data: any) => {
  return BaseAxios({
    url: `folder`,
    method: 'POST',
    data: data
  })
}

const createVideo = (data: any) => {
  return BaseAxios({
    url: `video`,
    method: 'POST',
    data: data
  })
}

const getListPeopleShare = (param: any, sortType?: string, isFavorite?: string, name?: string) => {
  return BaseAxios({
    url: `user`,
    method: 'GET',
    data: {
      page: param.page,
      limit: param.limit,
      sortType: sortType,
      isFavorite: isFavorite,
      name: name
    }
  })
}

const getListFolder = (params: any) => {
  return BaseAxios({
    url: `folder`,
    method: 'GET',
    params
  })
}

const getListFolderId = (id: string) => {
  return BaseAxios({
    url: `folder/${id}`,
    method: 'GET'
  })
}

const postListFolderId = (id: string, name: string, favorite?: boolean, parentId?: string, roleGeneral?: 1) => {
  return BaseAxios({
    url: `folder/${id}`,
    method: 'POST',
    data: {
      id: id,
      name: name,
      favorite: favorite,
      parentId: parentId,
      roleGeneral: roleGeneral
    }
  })
}

const postListFolderIdVer = (id: any, data: any) => {
  return BaseAxios({
    url: `folder/${id}`,
    method: 'POST',
    data
  })
}

const deleteFolder = () => {
  return BaseAxios({
    url: `folder`,
    method: 'DELETE'
  })
}

const deleteFolderId = (id: string) => {
  return BaseAxios({
    url: `folder/${id}`,
    method: 'DELETE',
    params: {
      isSoft: true
    }
  })
}

const postListVideoId = (id: any, data: any) => {
  return BaseAxios({
    url: `video/${id}`,
    method: 'POST',
    data: data
  })
}

const getListVideoId = (data: any) => {
  return BaseAxios({
    url: `video`,
    method: 'GET',
    params: data
  })
}

const postSeenVideoId = (data: any) => {
  return BaseAxios({
    url: `history-see-video`,
    method: 'POST',
    data
  })
}

const getListVideoIdWatch = (id: string) => {
  return BaseAxios({
    url: `video/${id}`,
    method: 'GET'
  })
}

const deleteVideoId = (id: string) => {
  return BaseAxios({
    url: `video/${id}`,
    method: 'DELETE',
    params: {
      isSoft: true
    }
  })
}

const changeVideoRoleUser = (id: string, data: any) => {
  return BaseAxios({
    url: `video/${id}/change-video-role-user`,
    method: 'POST',
    data
  })
}

const downloadVideoId = (id: any) => {
  return BaseAxios({
    url: `video/${id}/download`,
    method: 'POST'
  })
}

export {
  createFolder,
  getListFolder,
  getListPeopleShare,
  getListFolderId,
  deleteFolder,
  deleteFolderId,
  postListFolderId,
  createVideo,
  postListVideoId,
  deleteVideoId,
  getListVideoId,
  postSeenVideoId,
  postListFolderIdVer,
  changeVideoRoleUser,
  downloadVideoId,
  getListVideoIdWatch
}
