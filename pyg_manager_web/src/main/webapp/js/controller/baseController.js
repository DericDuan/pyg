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
});