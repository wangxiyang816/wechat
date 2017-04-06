/**
 * Created by Garvol on 16/11/15.
 */
Page({
    data:{
        hasKw:false,
        movies:[],
        loading:false,
        start:0,
        count:10,
        hasMore:true,
        title:null
    },
    onLoad(){
        console.log("onLoad..")
    },
    loadMore:function(){
            console.log(this.data.hasMore);
            // console.log(this.data.title,this.data.start);
            this.setData({
                subtitle:"加载中",loading:true
            })
            var me=this;
            wx.request({
              url: 'https://api.douban.com/v2/movie/search?q='+this.data.title,
              data: {start:this.data.start,count:5},
            //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
              header: { "Content-Type":"application/json"},
              success: function(res){
                  console.log(res.data.subjects)
                  if(res.data.subjects.length>0){
                    me.setData({
                        substitle:res.data.title,
                        loading:false,
                        movies:me.data.movies.concat(res.data.subjects),
                        start:me.data.start+res.data.subjects.length,
                    })
                  }else{
                    me.setData({
                        substitle:res.data.title,
                        loading:false,
                        hasMore:false
                    })
                  }
              },
              fail: function() {
                // fail
              },
              complete: function() {
                // complete
              }
            }) 
    },
    inputText:function(e){
        console.log(e.detail.value);
        this.setData({
            loading:true,title:e.detail.value
        })
        var me=this;
        wx.request({
          url: 'https://api.douban.com/v2/movie/search?q='+e.detail.value,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: { "Content-Type":"application/json"},
          success: function(res){
            console.log(res.data)
            if(res.data.subjects.length>0){
                // console.log(11111111111111111111111111111111111111111)
                 me.setData({
                    movies:res.data.subjects,
                    loading:false,
                    start:res.data.subjects.length,
                    hasKw:true
                })
            }else{
                me.setData({
                    hasKw:false
                })
            }
           
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
     onReady () {
    wx.setNavigationBarTitle({ title:"搜索" })
  }
})
