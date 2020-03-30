import React from 'react'

import Scanner from '../ZXingScanner/ZXingScanner'

import Button from '@material-ui/core/Button';


import './Business.css'

let userId = undefined

class Business extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            status: 'init',
        }

        this.scan = this.scan.bind(this)
        this.onDetected = this.onDetected.bind(this)
        this.handleComfirm = this.handleComfirm.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    async componentDidMount() {

    }


    scan = () => {
        this.setState({ status: this.state.status === 'init' ? 'scanning' : 'init' })
    }

    onDetected(newDetectResult) {

        this.vibrate()

        userId = this.checkId(newDetectResult)

        if (userId === "invalid") {
            alert(`${userId} 條碼格式不符或掃描失敗，請重新掃描！`)
            this.setState({ status: 'init' })
            return
        }

        this.setState({
            status: 'user checking',
        })
    }

    vibrate() {
        // vibrate for 200ms
        if (window.navigator && window.navigator.vibrate) {
            window.navigator.vibrate(200)
        }
    }

    checkId(userId) {
        const studentCardRegexp = /[A-Z]{1}[0-9]{8}/
        if (userId.match(studentCardRegexp)) {
            return userId.match(studentCardRegexp)[0]
        }
        else {
            return "invalid"
        }
    }

    async handleComfirm() {
        // Display scan result and prompt
        this.setState({ status: 'waiting' })

        let newResult = await fetch(`/api/emails/${userId}`, {
            method: 'POST',
        })


        alert(newResult.ok)
        this.setState({
            result: newResult,
            status: 'result',
        })

        window.setTimeout(() => {
            this.setState({ status: 'init' })
        }, 3000)


    }
    handleCancel() {
        this.setState({ status: 'init' })
    }




    render() {

        if (this.state.status === 'init') {
            return (
                <div className="Business">

                    <Button variant="contained" color="primary" size="large" onClick={this.scan} >掃描</Button>
                </div>
            )
        } else if (this.state.status === 'scanning') {
            return (
                <div className="Business">
                    <Scanner onDetected={this.onDetected} />
                    <Button color="primary" size="medium" onClick={this.scan} >停止</Button>

                    <h3>請用chrome或safari等開啟（點擊右上方的三個點點，選擇以其他應用程式開啟或類似按鈕）</h3>
                </div>
            )
        } else if (this.state.status === 'user checking') {
            return (
                <div className="Business">
                    <h2>掃描結果</h2>
                    <div className="info">
                        <p>使用者id：{userId}</p>
                    </div>
                    <h2>確定要送出嗎？</h2>
                    <Button variant="contained" color="primary" size="medium" onClick={this.handleComfirm} >確定</Button>
                    <Button color="primary" size="medium" onClick={this.handleCancel} >取消</Button>

                </div>
            )

        } else if (this.state.status === 'waiting') {
            return (
                <div className="Business">
                    <h3>等待伺服器回應中...</h3>
                </div>
            )
        } else if (this.state.status === 'result') {
            return (
                <div className="Business">
                    {this.state.result ? <h2>成功！</h2> : <h2>伺服器錯誤，失敗...{this.state.result}</h2>}
                </div>
            )
        }

    }
}

export default Business