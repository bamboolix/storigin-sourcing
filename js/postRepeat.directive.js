
angular.module('storigin',[])
.directive('my-post-repeat-directive', function() {
    return function(){
        console.log("yolo");
        $( "li" ).eq(0).addClass("centerBadge");
    }
})