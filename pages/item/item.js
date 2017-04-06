/**
 * Created by Garvol on 16/11/15.
 */
Page({
    data:{

    },
    onLoad(params){
        this.setData({
            id:params.id
        })
        var me=this;
        wx.request({
          url: 'https://api.douban.com/v2/movie/subject/'+params.id,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
         header: { "Content-Type":"application/json"},
          success: function(res){
            console.log(res.data.images.large)
            me.setData({
                movie:res.data
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