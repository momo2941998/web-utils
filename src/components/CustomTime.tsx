import React from 'react'
import dayjs from 'dayjs'
import ReactTimeAgo from 'react-time-ago'
import { Space } from 'antd';

export const CustomTime = (props: {dateStr?: string}) => {
  if (!props.dateStr) return null;
  let date = dayjs(props.dateStr)
  return (
    <Space>
      {date.format('HH:mm DD/MM/YYYY')}{"-"}
      <ReactTimeAgo date={date.toDate()} locale='vi-VN' />
    </Space>
  )
}
