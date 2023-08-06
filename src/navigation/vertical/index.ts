// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
  return [
    {
      sectionTitle: 'Apps & Pages'
    },
    {
      title: 'My Library',
      icon: 'mdi:bookmark-box-multiple-outline',
      path: '/my-library'
    },
    {
      title: 'Recycle Bin',
      icon: 'mdi:delete',
      path: '/my-recyclebin'
    },
    {
      title: 'My History',
      icon: 'ic:outline-history',
      path: '/my-history'
    },
    {
      title: 'Settings',
      icon: 'mdi:cog',
      path: '/settings'
    }
  ]
}

export default navigation
