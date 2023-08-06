import BaseAxios from '../utils/baseAxios'

const getListHistory = (name: any) => {
  return BaseAxios({
    url: `history-see-video`,
    method: 'GET',
    params: {
      page: 1,
      limit: 100000,
      sortType: 'DESC',
      isSoft: 'true',
      nameVideo: name,
      sortBy: 'updatedDate'
    }
  })
}
const deleteVideoItem = (id: any) => {
  return BaseAxios({
    url: `history-see-video/${id}`,
    method: 'DELETE'
  })
}
const deleteAllVideo = () => {
  return BaseAxios({
    url: `history-see-video`,
    method: 'DELETE'
  })
}
const updateUser = (data: any) => {
  return BaseAxios({
    url: `user/update`,
    method: 'POST',
    data
  })
}
export { getListHistory, deleteVideoItem, deleteAllVideo, updateUser }
