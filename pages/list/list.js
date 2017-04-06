const app=getApp();
Page({
    data:{
        movies:[],
        loading:true,
        start:0,
        count:10,
        hasMore:true,
        title:null
    },
    viewTap: function() {
        
    }, 
    loadMore:function(){
            console.log(this.data.hasMore);
            // console.log(this.data.title,this.data.start);
            this.setData({
                subtitle:"加载中",loading:true
            })
            var me=this;
            wx.request({
              url: 'https://api.douban.com/v2/movie/'+this.data.title,
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
    onLoad:function(params){
       console.log(params.name);
       this.setData({title:params.title,name:params.name});
       var me=this;
       wx.request({
         url: 'https://api.douban.com/v2/movie/'+params.title,
         data: {start:0,count:10},
        //  method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: { "Content-Type":"application/json"},
         success: function(res){
            console.log(res.data)
              var movies=res.data.subjects;
            //   console.log(movies)
          me.setData({
             movies:movies,
             loading:false,
             start:res.data.subjects.length,
          });

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
    wx.setNavigationBarTitle({ title: this.data.name })
  }
});