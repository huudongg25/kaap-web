import BaseUploadFile from '../utils/baseUploadFile'
import BaseAxios from '../utils/baseAxios'

const getUser = () => {
  return BaseAxios({
    url: `user/profile`,
    method: 'GET'
  })
}

const postUser = (data: any) => {
  return BaseAxios({
    url: `user/update`,
    method: 'POST',
    data
  })
}
const changePasswordApi = (data: any) => {
  return BaseAxios({
    url: `user/change-pass`,
    method: 'POST',
    data
  })
}

const sendOtpApi = (data: any) => {
  return BaseAxios({
    url: `user/send-otp`,
    method: 'POST',
    data
  })
}

const verityOtpApi = (data: any) => {
  return BaseAxios({
    url: `user/verify-otp`,
    method: 'POST',
    data
  })
}

const updatePassApi = (data: any) => {
  return BaseAxios({
    url: `user/update-pass`,
    method: 'POST',
    data
  })
}

const changeAvatarApi = (data: FormData) => {
  return BaseUploadFile({
    url: `user/upload-avatar`,
    method: 'POST',
    data
  })
}

export { postUser, getUser, changePasswordApi, sendOtpApi, verityOtpApi, updatePassApi, changeAvatarApi }
