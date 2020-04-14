app.controller('brandController',function ($scope,$controller ,brandService) {//依赖注入服务

        //继承basecontroller.js 本质上继承的是$scope
        $controller('baseController',{$scope:$scope});


    $scope.findAll = function () {
        brandService.findAll().success(//把$http.get()业务代码分离到了brandservice中
                                      // 在此处用brandservice调用
            function (response) {
                $scope.list = response;
            }
        );
    }


    $scope.findPage=function(page,rows){
        $scope.findPage(page,rows).success(
            function (response) {
                $scope.list = response.rows;
                $scope.paginationConf.totalItems=response.total;
            }
        );
    }

    /*
         新增及修改
         品牌从$scope双向绑定域获取
    */
    $scope.save=function () {

        //要区分是新增还是修改  brand.id
        if ($scope.brand.id == null){
            brandService.add(page,$scope.brand).success(
                function (response) {
                    if (response.success){
                        $scope.reloadList();
                    } else {
                        alert(response.message);
                    }
                }
            );
        }else {
            brandService.update(page,$scope.brand).success(
                function (response) {
                    if (response.success){
                        $scope.reloadList();
                    } else {
                        alert(response.message);
                    }
                }
            );
        }


    }

    /*
        根据id查询品牌
    */
    $scope.findOne=function (id) {
        brandService.findOne(id).success(
            function (response) {
                $scope.brand=response;
            }
        );
    }


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

    /*
        删除
     */
    $scope.dele=function () {
        brandService.dele($scope.selectIds).success(
            function (response) {
                if (response.success){
                    alert(response.message);
                    $scope.reloadList();
                }else {
                    alert(response.message);
                }
            }
        );
    }

    $scope.searchEntity={};
    /*
        条件查询
     */
    $scope.search=function (page,rows) {
        brandService.search(page,rows,$scope.searchEntity).success(
            function (response) {
                $scope.list =response.rows;

                $scope.paginationConf.totalItems=response.total;
            }
        );
    }
});