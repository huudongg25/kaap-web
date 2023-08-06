import BaseAxios from '../utils/baseAxios'

const postLogin = (data: any) => {
  return BaseAxios({
    url: `auth/login`,
    method: 'POST',
    data
  })
}

const postSignUp = (data: any) => {
  return BaseAxios({
    url: `auth/register`,
    method: 'POST',
    data
  })
}

export { postLogin, postSignUp }
