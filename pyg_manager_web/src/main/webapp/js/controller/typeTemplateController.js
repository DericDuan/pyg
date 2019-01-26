 //控制层 
app.controller('typeTemplateController' ,function($scope,$controller,typeTemplateService,brandService,specificationService){
	
	$controller('baseController',{$scope:$scope});//继承

    //把一个数组转成一个字符串
	$scope.stringToArray=function (array) {
		array=JSON.parse(array);
		var str="";
        for(var i=0;i<array.length;i++){
        	if(i==array.length-1){
                str+=array[i].text;
			}else {
                str+=array[i].text+","
            }
		}
		return str;
    }

    // $scope.brandList={data:[{"id":"26","text":"上衣尺码"},{"id":"27","text":"网络"},{"id":"28","text":"手机屏幕尺寸"},{"id":"32","text":"机身内存"}]}

    //一打开页面查询所有品牌数据,在select2插件上使用
	$scope.findBrandList=function () {
		brandService.findBrandList().success(function (response) {
			$scope.brandList={data:response};
        })
    }

    //动态新增扩展属性,从数据的本质上是向entity.customAttributeItems数组中添加对象
    $scope.addCustomAttributeItems=function () {
		$scope.entity.customAttributeItems.push({})
    }

    //动态删除
    $scope.deleCustomAttributeItems=function (index) {
        $scope.entity.customAttributeItems.splice(index,1);
    }


    //一打开页面查询所有规格数据,在select2插件上使用
    $scope.findSpecList=function () {
        specificationService.findSpecList().success(function (response) {
            $scope.specList={data:response};
        })
    }
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		typeTemplateService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		typeTemplateService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		typeTemplateService.findOne(id).success(
			function(response){
                response.brandIds=JSON.parse(response.brandIds);//品牌 '[{"id":33,"text":"电视屏幕尺寸"}]'字符串--var 对象 = JSON.parse(字符串)-->数组
                response.specIds=JSON.parse(response.specIds);//规格
                response.customAttributeItems=JSON.parse(response.customAttributeItems);//扩展属性
				$scope.entity= response;

			}
		);				
	}
	
	//保存 
	$scope.save=function(){				
		var serviceObject;//服务层对象  				
		if($scope.entity.id!=null){//如果有ID
			serviceObject=typeTemplateService.update( $scope.entity ); //修改  
		}else{
			serviceObject=typeTemplateService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
		        	$scope.reloadList();//重新加载
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		typeTemplateService.dele( $scope.selectedIds ).success(
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
		typeTemplateService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
    
});	
