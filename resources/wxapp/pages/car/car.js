var app = getApp();
var carData = require('carData');
var carDetail = require('carDetail');
Page({
    data: {
        toView: 'A',
        carData: carData,
        carDetail: carDetail,
        carSelected: {},
        wordList: [],
        isSelected: false,
        winHeight: 0,
        isSrcolled: false,
        isShow: ''
    },
    onReady: function () {
        this._init()
    },
    _init: function () {
        let t = this;
        wx.getSystemInfo({
            success: function (res) {
                t.setData({
                    winHeight: res.windowHeight
                })
            }
        })
        for (let key in this.data.carData) {
            this.data.wordList.push(key)
        }
    },
    linkToCar: function (e) {
        this.setData({
            isShow: 'show',
            carSelected: this.data.carDetail[e.target.dataset.name]
        })
    },
    cancalLink: function () {
        this.setData({
            isShow: '',
        })
    },
    posMouseDown: function (e) {
        this.setData({
            toView: e.target.dataset.index,
            isSelected: true,
            isSrcolled: true
        })
    },
    posMouseUp: function (e) {
        this.setData({
            isSelected: false,
            isSrcolled: false
        })
    },
    posMouseMove: function (e) {//滑动选择
        if (this.data.isSelected && this.data.isSrcolled) {
            console.log('滑动');
            let y = Math.ceil(e.touches[0].clientY / this.data.winHeight * this.data.wordList.length) - 1;
            this.setData({
                toView: this.data.wordList[y],
            });
            this._timeDelay();
        }
    },
    _timeDelay: function () {
        let t = this;
        this.data.isSrcolled = false;
        setTimeout(function () {
            t.data.isSrcolled = true;
        }, 100);
    }
});