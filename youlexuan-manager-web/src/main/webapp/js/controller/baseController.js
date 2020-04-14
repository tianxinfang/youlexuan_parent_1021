app.controller('baseController',function ($scope) {//依赖注入服务

    //分页控件配置
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 0,
        itemsPerPage: 10,
        perPageOptions: [10, 20, 30, 40, 50],
        onChange: function () {
            $scope.reloadList();//重新加载
        }
    };
    $scope.reloadList=function(){
        $scope.findPage($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage);
    }

    //初始化复选框值的array
    $scope.selectIds=[];
    /*
        选中取消  selectids增加删除
        如何判断是否选中是取消   angaular提供了内置对象$event中可以去除是勾选还是取消
     */
    $scope.updateSelection=function ($event,id) {
        //选中--增加
        if ($event.target.checked) {//勾选
            $scope.selectIds.push(id);
        }else {//取消
            //根据id找到对应的index
            var index=$scope.selectIds.indexOf(id);
            //根据index从数组中删除
            $scope.selectIds.splice(index,1);
        }
    }

    $scope.selectAll=function () {
        if ($scope.select_all){
            $scope.selectIds=[];
            anguar.forEach($scope.list,function (i) {
                i.checked=true;
                $scope.checked.push(i.id);
            })
        }else {
            anguar.forEach($scope.list,function (i) {
                i.checked=false;
                $scope.selectIds=[];
            })
        }
    }
});