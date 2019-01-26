app.controller("baseController",function ($scope) {
    //分页的插件
    $scope.paginationConf = {
        currentPage: 1,//当前页
        totalItems: 10,//总记录数
        itemsPerPage: 10,//每页记录数
        perPageOptions: [10, 20, 30, 40, 50],//每页选择多少条显示
        onChange: function () { //一加载页面时会触发,上面四个变量的数据发生改变时也会触发
            $scope.reloadList();//重新加载
        }
    };
    //onChange事件触发
    $scope.reloadList = function () {
        // $scope.findPage($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
        $scope.search($scope.paginationConf.currentPage, $scope.paginationConf.itemsPerPage);
    };

    $scope.searchEntity = {};

    //删除
    $scope.selectedIds = [];
    //点击复选框更改选中的值
    $scope.updateSelections = function (event, id) {
        // event.target获取的是当前点击的对象
        if (event.target.checked) {
            $scope.selectedIds.push(id);//push向数组中添加方法
        } else {
            //获取id在数组中的索引值
            var index = $scope.selectedIds.indexOf(id);
            $scope.selectedIds.splice(index, 1);//splice:移除数组中元素
        }
    };
    //全选
    $scope.checkedAll=function (event) {
        if (event.target.checked) {
            // 把当前页的id都放到数组中
            for (var i=0;i<$scope.list.length;i++) {
                //判断id是否在数组中,如果不在,才向数组中添加
                if (!$scope.isChecked($scope.list[i].id)) {
                    $scope.selectedIds.push($scope.list[i].id);
                }
            }
        }else {
            //从数组中删除当前页id
            for (var i=0;i<$scope.list.length;i++) {
                var index=$scope.selectedIds.indexOf($scope.list[i].id);
                $scope.selectedIds.splice(index,1);
            }
        }

    }
//    判断id是否在数组中
    $scope.isChecked=function (id) {
        if($scope.selectedIds.indexOf(id)!=-1){
            return true;
        }else {
            return false;
        }
    }
//    判断是否全选
    $scope.isCheckedAll=function () {
        //判断当前页数据的id是否都在数组中,只要有一个不在数组中,就是非全选
        for (var i=0;i<$scope.list.length;i++) {
            var id = $scope.list[i].id;
            if (!$scope.isChecked(id)) {
                return false;
            }
        }
        return true;

    }
});