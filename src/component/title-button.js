import React from 'react';

class Title_button extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isModalOpen: false };
    }

    handleClickOpen() {
        this.setState({ isModalOpen: true });
    }

    handleClickClose() {
        this.setState({ isModalOpen: false });
    }

    render() {
        let modal;
        if (this.state.isModalOpen) {
            modal = (
                <div className='modal'>
                    <div className='modal-inner'>
                        <div className='modal-header'></div>
                        <div className='modal-introduction'>
                            <h1 className="modal-title">説明</h1>
                            <p><span className='modal-enemy'>敵</span>に当たらないように<span className='modal-time'>制限時間内</span>に迷路から脱出しろ！</p>
                            <p>矢印キーで<span className='modal-chara'>キャラクター</span>を上下左右に移動できるよ！</p>
                            <p><span className='modal-goal'>画面右下</span>のゴールを目指せ！Let's ESCAPE！！</p>
                        </div>
                        <button
                            className='modal-close-btn'
                            onClick={() => { this.handleClickClose() }}
                        >
                            とじる
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="title_button">
                <button className="explanation_button" onClick={() => { this.handleClickOpen() }}>EXPLANATION</button>
                <h1 className="maintitle">MAZE &nbsp;&&nbsp; ESCAPE</h1>
                <div className="button_right">
                    <button className='start_button' onClick={this.props.onStart}>START</button>
                    <button className='reset_button' onClick={this.props.onReset}>RESET</button>
                </div>
                {modal}
            </div>
        );
    }
}

export default Title_button;
