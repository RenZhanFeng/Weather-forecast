//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    city: "",
    today:{},
    future:{}
  },
  //事件处理函数
  onLoad: function() {
    this.loadInfo();
  },


  loadInfo: function() {
    var page = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(latitude, longitude);
        page.loadCity(latitude, longitude);
      }
    })
  },


  loadCity: function(latitude, longitude) {
    var page = this;
    wx.request({
      url: 'http://api.map.baidu.com/geocoder/v2/?ak=K8E1oNrUmGRXTGMluBiZ20H7ssw440Zh&location=' + latitude + ',' + longitude + '&output=json', //仅为示例，并非真实的接口地址

      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res);
        var city = res.data.result.addressComponent.city;
        city = city.replace("市", "");
        page.setData({
          city: city
        });
        page.loadWeather(city);
      }
    })
  },


  loadWeather: function(city) {
    var page = this;
    wx.request({
      url: 'http://wthrcdn.etouch.cn/weather_mini?city=' + city, //仅为示例，并非真实的接口地址

      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        console.log(res);
        var future = res.data.data.forecast;
        var todayInfo = future.shift();
        var today = res.data.data;
        today.todayInfo = todayInfo;
        page.setData({ today: today, future: future })
      }
    })
  }






})