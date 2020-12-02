import React, { Component } from 'react'
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library'
import './ZXingScanner.css'

const codeReader = new BrowserMultiFormatReader();

class ZXingScanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      scanned: false,
      torch: false,
    }
    this.toggleTorch = this.toggleTorch.bind(this)
  }
  componentDidMount() {
    const hdConstraints = {
      video: {
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

  toggleTorch() {
    const video = document.querySelector('#video');
    // get the active track of the stream
    const track = video.srcObject.getVideoTracks()[0];
    if (track.getCapabilities().torch) {
      track.applyConstraints({
        advanced: [{ torch: !this.state.torch }]
      })
      this.setState({ torch: !this.state.torch })
    } else {
      alert('你的裝置不能用閃光燈')
    }
  }

  render() {
    return (
      <>
        <video id="video"></video>
        <button onClick={this.toggleTorch}>閃光燈</button>
      </>
    )
  }
}

export default ZXingScanner
