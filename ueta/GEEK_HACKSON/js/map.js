// var address01 = $(".js-address").text();
// var address01 =
var address01 ="東京駅";
//ここがjsの書き方
$(document).ready(function () {
    $("#Button1").click(function () {
      address01 = $(".js-address").val();
      // スコープで出られない.
      //varがないとグローバル変数として扱われる
     $("#output").text(address01);
      //アウトプットタグの中にインプットテキストを書き込む
    })
});
//このままではファンクションを代入しているだけなので文字列が代入されていないdocument.readyが入っている
//テキストを取得

var mapDiv01 = document.getElementById('map_canvas');
//ここに対して地図を表示する
var zoom_level=15;
var markers = new Array();

function initialize() {//エラーが出たのでもう一度位にシャライズを走らせるため、google.maps.event.  addDomListener(window, 'load', initialize);をクリックに対するメソッドに挿入する

  var geocoder = new google.maps.Geocoder();
  //Geocorderというクラスこれは初期化
  geocoder.geocode({
    //インスタンスに対してインスタンスメソッド
    'address': address01
    //1引数がオブジェクトそのプロパティが５つだけあって、一つだけ指定している
  },function(result, status) {
    //引っ張ってきたものに対してどういったことをするのかcallbackにしている
      if (status == google.maps.GeocoderStatus.OK) {
        var latlng = result[0].geometry.location;
        console.log(latlng);
        var myOptions = {
          zoom: 15,//これがズームレベルのことを指している
          center: latlng,
          //真ん中を撮ってきたものに合わせている
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
         ///ここに必要な値を追加する
        var map = new google.maps.Map(mapDiv01, myOptions);

        //地図の表示場所と地図の表示方法を指定
        var marker = new google.maps.Marker({
          position: latlng,
          map: map
        });
        // var marker = new google.maps.Marker({
        //   position: new google.maps.LatLng( 35.684801 , 139.76608599999997 ),
        //   map: map,
        //   icon: new google.maps.MarkerImage('images/france.png'
        //   ,new google.maps.Size(31,31),
        //   new google.maps.Point(0,0)
        //   )
        // });
   //マーカの作成
       // var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
       // //別のnewにかき消されている
       // console.log(map.getZoom());
        google.maps.event.addListener(map,'bounds_changed',function(){
          var latlngBounds = map.getBounds();
          console.log(latlngBounds)
          var swLatlng = latlngBounds.getSouthWest();
          var swlat = swLatlng.lat();
          var swlng = swLatlng.lng();

          var neLatlng = latlngBounds.getNorthEast();
          var nelat = neLatlng.lat();
          var nelng = neLatlng.lng();

        });
        google.maps.event.addListener(map, 'zoom_changed', function() {
          //もの、操作(イベントs)、説明書
          //第３引数のfunctionがコールバック関数
          console.log(map.getZoom());
          zoom_level=map.getZoom();
          console.log("zoom_changed "+ zoom_level);
          if(zoom_level>=0){
            var data = new Array();
            data.push({lat:'35.681382', lng:'139.766084',name:'東京駅'});
            data.push({lat:'35.688687', lng:'139.77323',name:'大手町駅'});
            data.push({lat:'35.68255', lng:'139.76437299999998',name:'丸のうちビルディング'});
             //データはハッシュの形で入っている
             // console.log(data[2]['name']);
            console.log(data[2].name);
              //これがjsのハッシュの値の取り出し方
             // data.push({lat:'35.688687', lng:'139.77323',name:'大手町駅'});
             // data.push({lat:'35.688687', lng:'139.77323',name:'大手町駅'});
             // data.push({lat:'35.688687', lng:'139.77323',name:'大手町駅'});
                  //複数作成

            if(zoom_level!=15){
              for (i = 0; i < data.length; i++) {
                markers[i] = new google.maps.Marker({
                  position: new google.maps.LatLng
                      (data[i].lat, data[i].lng),   map: map,
                  icon: new google.maps.MarkerImage('images/france.png'
                    ,new google.maps.Size(31,31),
                    new google.maps.Point(0,0))
                });

              }
            }else{
              var marker_list = new google.maps.MVCArray();
              markers.forEach(function(mkr, idx){
                marker_list.push(mkr);
              });
              marker_list.forEach(function(mkr, idx){
                mkr.setMap(null);
              });
              markers[0] = new google.maps.Marker({
                  position: new google.maps.LatLng(data[0].lat, data[0].lng),
                  map: map,icon: new google.maps.MarkerImage('images/france1.png'
                    ,new google.maps.Size(62,62),
                    new google.maps.Point(0,0))
              });
            }
          }else{
              var marker_list = new google.maps.MVCArray();
                markers.forEach(function(mkr, idx){
                  marker_list.push(mkr);
                });
                marker_list.forEach(function(mkr, idx){
                  mkr.setMap(null);
              });
            //googleマーカーを変えられる
          }
        });
     //ここが外国人やその他の人の情報
          } else {
            alert('取得できませんでした…');
          }
        });
}
//ここに3つめの固定のキーに対して値を見る
// Map lodding
// google.maps.event.addDomListener(window, 'load', initialize);
//画面のロードが終わったら胃にシャライズを呼ぶ
// var latlng =new google.maps.Latlng(0,0);
// // var marker = new google.maps.Marker({
// //   position: latlng
// // });
// var latlng = new google.maps.LatLng(35.684801,139.76608599999997);
// var marker2 = new google.maps.Marker({
//   position: latlng
// });
google.maps.event.addDomListener(window, 'load', initialize);
//windowが"load"!と言ったらinitializeを走らせろという意味!!

$(document).ready(function () {
        $("#Button1").click(function () {
          address01 = $(".js-address").val();
          // スコープで出られない.
          //varがないとグローバル変数として扱われる
         $("#output").text(address01);
          //アウトプットタグの中にインプットテキストを書き込む
          // google.maps.event.addDomListener(window, 'load', initialize);
          initialize()
        })
    });

