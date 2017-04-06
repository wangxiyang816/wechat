/**
 * Created by Garvol on 16/11/15.
 */
Page({
    data:{
        imgUrls:[]
    },
    onLoad:function(){
        var me=this;
        
        wx.request({
           url: "https://api.douban.com/v2/movie/in_theaters",
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
           header: { "Content-Type":"application/json"}, // 设置请求的 header
          success: function(res){
            //   console.log(res.data)
              var imgs=[];
            res.data.subjects.forEach(function(value){
                //  console.log(value)
                imgs.push(value.images.large);
            })
            imgs.splice(0,1);
            imgs.splice(4);
            me.setData({
                imgUrls:imgs
                })
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    }

})