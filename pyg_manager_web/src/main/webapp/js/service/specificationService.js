//只和后台交互 不和页面进行交互  不要出现this
app.service("specificationService", function ($http) {
//分页查询
    this.findPage = function (pageNo, pageSize) {
        return $http.get("../specification/findPage?pageNo=" + pageNo + "&pageSize=" + pageSize);
    };

    //查询所有
    this.findAll = function () {
        return $http.get("../specification/findAll");
    };

    //保存
    //把保存方法拆开
    this.add = function (entity) {
        return $http.post("../specification/add", entity);
    };
    this.update = function (entity) {
        return $http.post("../specification/update", entity);
    };


    //根据id查询对象
    this.findOne = function (id) {
        return $http.get("../specification/findOne/" + id);
    };
    this.dele = function (selectedIds) {

        return $http.get("../specification/dele/" + selectedIds);
    };

    this.searchEntity = {};
    //条件查询
    this.search = function (pageNo, pageSize, searchEntity) {
        //当前页码,每页显示条数,查询的对象searchEntity
        return $http.post("../specification/search?pageNo=" + pageNo + "&pageSize=" + pageSize, searchEntity);
    };
});