// 只和页面进行交互 页面上需要的数据调用service的方法  不要出现$http
app.controller("brandController", function ($scope, brandService,$controller) {
$controller('baseController',{$scope:$scope});

    //分页查询
    $scope.findPage = function (pageNo, pageSize) {
        brandService.findPage(pageNo, pageSize).success(function (response) {
            //response包含总记录数和当前页面的页数据
            //response={total: ,rows=[{},{},{}]}
            $scope.paginationConf.totalItems = response.total;
            $scope.list = response.rows;
        })
    };

    //查询所有
    $scope.findAll = function () {
        brandService.find().success(function (response) {
            $scope.list = response;
        })
    };

    //保存方法
    $scope.save = function () {
        var obj = null;
        if ($scope.entity.id != null) {
            obj = brandService.update($scope.entity);
        } else {
            obj = brandService.add($scope.entity);
        }
        obj.success(function (response) {
            //response={success:true/false,message:""/""}
            if (response.success) {
                $scope.reloadList();
            } else {
                alert(response.message);
            }
        });
    };
    //根据id查询对象
    $scope.findOne = function (id) {
        brandService.findOne(id).success(function (response) {
            $scope.entity = response;

        })
    };
    $scope.dele = function () {
        //判断数组是否为空
        if ($scope.selectedIds.length == 0) {
            alert("请选择要删除的内容!");
            return;
        }

        //添加友好提示
        var flag = confirm("确定需要删除???????");
        if (flag) {
            brandService.dele($scope.selectedIds).success(function (response) {
                //response={success:true/false,message:""/""}
                if (response.success) {
                    $scope.reloadList();
                    //清空数组
                    $scope.selectedIds = [];
                } else {
                    alert(response.message);
                }
            })
        }

    };

    //条件查询
    $scope.search = function (pageNo, pageSize) {
        //当前页码,每页显示条数,查询的对象searchEntity
       brandService.search(pageNo,pageSize,$scope.searchEntity).success(function (response) {
            //response包含总记录数和当前页面的页数据
            //response={total: ,rows=[{},{},{}]}
            $scope.paginationConf.totalItems = response.total;
            $scope.list = response.rows;
        })
    };


});