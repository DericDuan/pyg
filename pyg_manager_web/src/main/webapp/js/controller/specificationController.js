// 只和页面进行交互 页面上需要的数据调用service的方法  不要出现$http
app.controller("specificationController", function ($scope, specificationService,$controller) {
    $controller('baseController',{$scope:$scope});//继承

    //动态添加规格小项,从数据的本质上考虑就是向entity.tbSpecificationOptionList中添加数据.
    $scope.addTbSpecificationOptions=function () {
        $scope.entity.tbSpecificationOptionList.push({})
    }
    //动态删除,从数据的本质上考虑,就是从entity.tbSpecificationOptionList中移除对象
    $scope.deleTbSpecificationOptions=function (index) {
        $scope.entity.tbSpecificationOptionList.splice(index,1);
    }
    //分页查询
    $scope.findPage = function (pageNo, pageSize) {
        specificationService.findPage(pageNo, pageSize).success(function (response) {
            //response包含总记录数和当前页面的页数据
            //response={total: ,rows=[{},{},{}]}
            $scope.paginationConf.totalItems = response.total;
            $scope.list = response.rows;
        })
    };

    //查询所有
    $scope.findAll = function () {
        specificationService.find().success(function (response) {
            $scope.list = response;
        })
    };

    //保存方法 entity里面:{tbSpecification{id:1,specName:''},tbSpecificationOptionList:[{},{},{}]}
    $scope.save = function () {
        var obj = null;
        if ($scope.entity.tbSpecification.id != null) {
            obj = specificationService.update($scope.entity);
        } else {
            obj = specificationService.add($scope.entity);
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
        specificationService.findOne(id).success(function (response) {
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
            specificationService.dele($scope.selectedIds).success(function (response) {
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
        specificationService.search(pageNo,pageSize,$scope.searchEntity).success(function (response) {
            //response包含总记录数和当前页面的页数据
            //response={total: ,rows=[{},{},{}]}
            $scope.paginationConf.totalItems = response.total;
            $scope.list = response.rows;
        })
    };


});