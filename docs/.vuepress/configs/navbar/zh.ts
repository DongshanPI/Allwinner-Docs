import type { NavbarConfig } from '@vuepress/theme-default'
import { version } from '../meta.js'

export const navbarZh: NavbarConfig = [
  {
    text: '嵌入式基础',
    link: '/'
  },
  {
    text: '开发板使用',
    link: '/Board/'
  },
  {
    text: '应用开发',
    link: '/Application/'
  },
  {
    text: '系统开发',
    link: '/System/'
  },
  {
    text: '驱动开发',
    link: '/Devicedriver/'
  },
  {
    text: '专题应用',
    link: '/Special/'
  },
  {
    text: `全志系列`,
    children: [
      {
        text: 'T113-Pro开发板',
        link: '/advanced/cookbook/',
      },
      {
        text: 'V853开发板',
        link: '/advanced/cookbook/',
      },
      {
        text: 'R818开发板',
        link: '/advanced/cookbook/',
      },
    ],
  },
]
