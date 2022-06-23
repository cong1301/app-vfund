import { View, Text } from 'react-native'
import React from 'react'
import Messenger from 'sdk-sojo'


export default function History() {
    return (
        <Messenger
            token={'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmFhOGVhNTg2MmZlYzAwMTFjMTg0ZjkiLCJyb2xlIjoiY3VzdG9tZXIiLCJ1c2VybmFtZSI6InZ1dHJhbmFuaDk4aG5AZ21haWwuY29tIiwiZW1haWwiOiJ2dXRyYW5hbmg5OGhuQGdtYWlsLmNvbSIsInBob25lIjoiMDM0MzQyMzM5OCIsImlhdCI6MTY1NTM0ODc5MSwiZXhwIjoxNjU3OTQwNzkxfQ.VU8QTYAad-by3_6GsGe1WWmyN71N6qY1xVbeUgf5l3aqv6RlPTpVHsAnW8NAiD_zGPu5p1fg6AsAfTNCyEUU-w'}
            botId={1}
            avtBot='https://chat.tng-holdings.vn/favicon_hotel.png'
            avtUser='https://cdn-icons-png.flaticon.com/512/149/149071.png'
        />
    )
}