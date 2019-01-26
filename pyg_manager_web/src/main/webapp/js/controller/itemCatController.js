 //控制层 
app.controller('itemCatController' ,function($scope,$controller   ,itemCatService,typeTemplateService){
	
	$controller('baseController',{$scope:$scope});//继承

	$scope.parentId=0;//记录的是即将保存的上级分类id
	//对entity1,entity2对象的初始化
	//entity1接收的是一级分类数据对象
	//entity2接收的是二级分类数据对象
    $scope.entity1=null;
    $scope.entity2=null;
	//当前级别
	$scope.grade=1;//记录的是当前页面显示的是第几级数据,默认是第一级

	$scope.setGrade=function (grade,pojo) {
        $scope.grade=grade;
        if($scope.grade==1){
            $scope.entity1=null;
            $scope.entity2=null;
            $scope.parentId=0;
		}
        if($scope.grade==2){
            $scope.entity1=pojo;
            $scope.entity2=null;
            $scope.parentId=$scope.entity1.id;
        }
        if($scope.grade==3){
        	$scope.entity2=pojo;
            $scope.parentId=$scope.entity2.id;
		}

    }

    //分类模板
	$scope.findTypeTemplateList=function () {
		typeTemplateService.findAll().success(function (response) {
			$scope.typeTemplateList=response;
        })
    }

	//分类查询
	$scope.findByParentId=function (parentId) {
		itemCatService.findByParentId(parentId).success(function (response) {
			$scope.list=response;
        })
    }

    //分类修改回显
    // $scope.findOne=function (pojo) {
		// itemCatService.findOne(pojo).success(function (response) {
		// 	$scope.list=response;
    //     })
    // }

    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		itemCatService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		itemCatService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		itemCatService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象
        // $scope.entity中没有parentId
		//新增时要对parentId进行赋值
		// 在js对象中给其添加变量并赋值,有以下两种方式:
		// $scope.entity.parentId=11;
        $scope.entity['parentId']=$scope.parentId;
        // $scope.entity['parentId']=$scope.parentId;


		if($scope.entity.id!=null){//如果有ID
			serviceObject=itemCatService.update( $scope.entity ); //修改  
		}else{
			serviceObject=itemCatService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
		        	$scope.findByParentId($scope.parentId);//重新加载
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		itemCatService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		itemCatService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
    
});	
