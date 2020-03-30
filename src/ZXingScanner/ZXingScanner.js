import React, { Component } from 'react'
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library'
import './ZXingScanner.css'

const codeReader = new BrowserMultiFormatReader();

const Camera = () => {
  return (
    <video id="video"></video>
  )
}

class ZXingScanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scanned: false
    }
  }
  componentDidMount() {
    const hdConstraints = {
      video: {
        width: { min: 1080 },
        facingMode: 'environment',
      }
    };

    codeReader
      .decodeFromConstraints(hdConstraints, 'video', (result, error) => {
        if (result) {
          this.handleDetected(result.text)
        }
        if (error && !(error instanceof NotFoundException)) {
          console.log(error)
        }
      })
  }

  handleDetected = result => {
    if (this.state.scanned === false) {
      this.setState({ scanned: true })
      codeReader.reset()
      this.props.onDetected(result)
    }
  }

  componentWillUnmount() {
    codeReader.reset()
  }

  render() {
    return <Camera />
  }
}

export default ZXingScanner
