import Editor from '../../../editor/core';
import { requestAnimation } from './util';

export default class Renderer {
    private _editor;
    private _requestAnimation;
    private _elapsedTime = 0;
    private _isPlay = false;
    private _speed = 1;
    private _playBtn = document.getElementById('dm-play') as HTMLButtonElement;
    private _progressInput = document.getElementById('dm-progress') as HTMLInputElement;
    private _speedSelect = document.getElementById('dm-speed') as HTMLSelectElement;

    constructor(canvas: HTMLDivElement) {
        this._editor = new Editor(canvas);
        this._requestAnimation = requestAnimation({
            onUpdate: (value) => {
                this._progressInput.value = (this._elapsedTime + value * this._speed).toString();
            }
        });
    }

    clear() {
        this._editor.clear();
    }
    async load(data: string) {
        await Promise.all([this._preloadImages(data), this._preloadSounds(data), this._preloadFonts()]);
        this._editor.loadFromJSON(data);
    }
    initialize() {
        const time = 15;
        this._progressInput.max = (time * 1000).toString();
    }

    run() {
        this._playBtn.addEventListener('click', this._playBtnListner);
        this._progressInput.addEventListener('input', this._progressInputListner);
        this._speedSelect.addEventListener('change', this._speedSelectListner);
    }

    private _playBtnListner = async () => {
        this._updatePlayState(!this._isPlay);

        if (!this._isPlay) {
            this._requestAnimation.stop();
            this._editor.pause();
        } else {
            this._requestAnimation.run();
            await Promise.all(this._editor.play());
            // TODO 퍼즈를 한만큼 await로 빠지는 상황 수정 필요
            this._requestAnimation.stop();
            this._progressInput.value = this._progressInput.max;
            this._updatePlayState(false);
        }
    };

    private _progressInputListner = (e: Event) => {
        if (e.target instanceof HTMLInputElement) {
            const time = Number(e.target.value);
            this._editor.updateTime(time);
            this._updateElaspedTime(time);
            this._updatePlayState(false);
            this._requestAnimation.stop();
        }
    };

    private _speedSelectListner = (e: Event) => {
        if (e.target instanceof HTMLSelectElement) {
            this._updateSpeed(e.target.value);
            this._updateElaspedTime(this._progressInput.value);
            this._requestAnimation.reset();
            this._editor.speed(Number(e.target.value));
        }
    };

    private _updateElaspedTime(time: string | number) {
        this._elapsedTime = Number(time);
    }
    private _updateSpeed(speed: string | number) {
        this._speed = Number(speed);
    }
    private _updatePlayState(isPlay: boolean) {
        this._isPlay = isPlay;
        this._playBtn.textContent = isPlay ? 'PAUSE' : 'PLAY';
    }
    private async _preloadImages(_json: string) {
        // const promises = json.match(/(DI|AI)\d{8}.(png|svg)/g)?.map(
        //     (src) => () =>
        //         new Promise<void>((resolve) => {
        //             const img = new Image();
        //             img.src = '';
        //             img.onload = () => resolve();
        //         })
        // );
    }
    private async _preloadSounds(_json: string) {
        // new Promise<void>((resolve) => {
        //     const audio = new Audio();
        //     audio.src = '';
        //     audio.onload = () => resolve();
        //     audio.onloadedmetadata = () => {};
        // });
    }
    private async _preloadFonts() {
        // document.fonts.load('', '12345678910!@#$%^&*()_+');
    }
}
