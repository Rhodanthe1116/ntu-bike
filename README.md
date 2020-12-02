# Notes

## Torch

```js
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
      alert('不能用閃光燈')
    }
  }

  return (<button onClick={this.toggleTorch}>閃光燈</button>)
```

<https://codepen.io/serratus/pen/LLErbK?editors=1010>
<https://github.com/zxing-js/library/issues/128>
<https://www.oberhofer.co/mediastreamtrack-and-its-capabilities/>

## heroku build problem

<https://stackoverflow.com/questions/47028871/heroku-your-account-has-reached-its-concurrent-build-limit>

## Deploy on heroku with express, react

```json
// in server.js
"scripts": {
    "start": "node server.js",
}
```

<https://daveceddia.com/deploy-react-express-app-heroku/>