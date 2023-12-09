import { Button, Dropdown, Menu, MenuProps } from 'antd'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '../../i18n'
import { constants } from '../../constants'
const allowLang = ['en', 'vi']


export const ChooseLanguage = () => {
  const [lang, setlang] = useState('')
  const { t } = useTranslation()
  const langSelector: MenuProps['items'] = allowLang.map(el => (
    {
      key: el,
      label: (
        <div onClick={()=> handleChangeLanguage(el)}>
          {el}
        </div>
      )
    }
  ))


  const handleChangeLanguage = (lang: string) => {
    let currentLang = i18n.language
    if (currentLang !== lang) {
      i18n.changeLanguage(lang)
      setlang(i18n.language)
    }
  }
  useEffect(() => {
    let lang = i18n.language || localStorage.getItem('i18nextLng')
    if (!lang || !allowLang.includes(lang)) {
      lang = constants.DEFAULT_LANG
      i18n.changeLanguage(constants.DEFAULT_LANG)
    }
    setlang(lang)
  }, [])
  
  return (
    <div>
      <Dropdown menu={{items: langSelector}}>
        <a>
          {lang}
        </a>
      </Dropdown>
    </div>
  )
}
