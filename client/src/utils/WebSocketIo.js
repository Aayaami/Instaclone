import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { loadSocket } from '../actions/socket'

const WebSocketIo = ({
  auth,
  socket: { socket, socketLoading },
  loadSocket
}) => {
  useEffect(() => {
    if (socketLoading && auth.user) {
      const tempSocket = io('http://localhost:5000')
      tempSocket.emit('join chat', auth.user._id)
      //   tempSocket.on('refresh chats', () => {
      //     getUserChats()
      //     console.log('refreshed')
      //   })
      //   tempSocket.on('refresh chatlist', () => {
      //     getChats()
      //     console.log('refreshed')
      //   })

      loadSocket(tempSocket)
    }

    // if(socket) {

    // }
  }, [auth, socket])
  return <div />
}

WebSocketIo.propTypes = {
  auth: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  loadSocket: PropTypes.func.isRequired
}

const mapStateToProps = store => ({
  auth: store.auth,
  socket: store.socket
})

export default connect(
  mapStateToProps,
  { loadSocket }
)(WebSocketIo)
