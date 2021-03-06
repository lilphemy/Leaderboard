$(document).ready(function(){
  function getOverallRanking(){
   $.ajax({
     url : "./results.json",
     success : function(result) {
       //result)
       updateRankings(result);
     },
   })
 }

   getOverallRanking();
   function updateRankings(ranks) {
     function trim(url){
       return url.split(' ').join('');
     }
     //update first position
     var first = ranks[0];
     $('div.one .name').text(first.nickname);
     $('div.one .pic').css({"background-image": `url(https://robohash.org/${trim(first.nickname+first.track)})`});
     $('div.one .track').text(first.track);
     $('div.one .score').text(first.score);
     $('div.one').addClass(first.track);
 
     //update second Position
     var second = ranks[1];
     $('div.two .name').text(second.nickname);
     $('div.two .pic').css({"background-image": `url(https://robohash.org/${trim(second.nickname+second.track)})`});
     $('div.two .track').text(second.track);
     $('div.two .score').text(second.score);
     $('div.two').addClass(second.track);
 
     //update third position
     var third = ranks[2];
     $('div.three .name').text(third.nickname);
     $('div.three .pic').css({"background-image": `url(https://robohash.org/${trim(third.nickname+third.track)})`});
     $('div.three .track').text(third.track);
     $('div.three .score').text(third.score);
     $('div.three').addClass(third.track);
 
     //update the rest
     var starter = 4
     for (let i = 3; i < ranks.length; i++) {
       var markup =`
       <div class="item ${ranks[i].track}">
           <div class="pos">
             ${starter}
           </div>
           <div class="pic" style="background-image: url(https://robohash.org/${trim(ranks[i].nickname+ranks[i].track)})"></div>
           <div class="name">
             ${ranks[i].nickname}
           </div>
           <div class="score">
             ${ranks[i].score}
           </div>
         </div>`;
       $('div.list').append(markup);
       starter++
     }
   }
 //Rankings Array
 let ranks = JSON.parse(localStorage.getItem('ranks'));
 localStorage.removeItem('ranks');
 
 function filterRanks(filter) {
   const newRanks = ranks.filter(obj => obj.track == filter)
 
   console.log(newRanks);
   //updateRankings(newRanks);
 }
 
 // document.getElementById('filterform').onsubmit = (e)=>{
 //     e.preventDefault();
 //     let filter = document.getElementById('filter').value.split(' ').join('+');
 //     let completePageURL =  window.location.href.split('?'),
 //     actualURL = completePageURL[0];
 //     if (window.location.href === `${actualURL}?filter=${filter}`) {
 //       return true;
 //     } else{
 //       window.location.href = `index.php?filter=${filter}`
 //     }
 // }



 var url = window.location.href;
 if (url.endsWith('#')) {
   const hashpoint = url.indexOf('#');
   url = url.split('').slice(0,hashpoint)
   var newUrl = url.join('');
   url = newUrl;
 }
 // var splitPoint = url.indexOf('?');
 // var search = url.slice(splitPoint);

 // var params = new URLSearchParams(search);
 // var paramsObj = {};

 // for (const value of params.keys()) {
 //   paramsObj[value] = params.get[value]
 // }
 const params = url.split('?')

 if (params.length > 1) {
   const query = params[1].split('&');

   const paramsObj = {}

   paramsObj.track =query[0].split('=')[1]
   paramsObj.level =query[1].split('=')[1]

   if(paramsObj.track == 'general'){paramsObj.track = 'trackNull'}
   if(paramsObj.level == 'general'){paramsObj.level = 'levelNull'}

   document.getElementById(paramsObj.track).selected = true;
   document.getElementById(paramsObj.level).selected = true;
 
 }

});


 

 