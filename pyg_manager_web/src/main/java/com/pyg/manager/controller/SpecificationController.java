package com.pyg.manager.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pyg.pojo.TbSpecification;
import com.pyg.sellergoods.service.SpecificationService;
import entity.PageResult;
import entity.Result;
import groupEntity.Specification;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @ClassName SpecificationController
 * @Description TODO
 * @Author Deric
 * @Date 2019/1/20 19:45
 * @Version 1.0
 **/
@RestController
@RequestMapping("/specification")
public class SpecificationController {

    @Reference
    private SpecificationService specificationService;

    public SpecificationController() {
        System.out.println("==========================");
    }

    @RequestMapping("/findAll")
    public List<TbSpecification> findAll() {
        return specificationService.findAll();
    }


    @RequestMapping("/findPage")
    public PageResult findPage(int pageNo, int pageSize) {
        return specificationService.findPage(pageNo, pageSize);
    }

    //从页面中传入的是一个组合类对象
    @RequestMapping("/add")//entity里面:{tbSpecification{id:1,specName:''},tbSpecificationOptionList:[{},{},{}]}
    public Result add(@RequestBody Specification specification) {
        try {
            specificationService.add(specification);
            return new Result(true, "保存成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false, "保存失败!");
        }
    }

    //查询单个
    @RequestMapping("/findOne/{id}")
    public Specification findOne(@PathVariable("id") Long id) {
        return specificationService.findOne(id);
    }

    @RequestMapping("/update")
    public Result update(@RequestBody Specification specification) {
        try {
            specificationService.update(specification);
            return new Result(true, "修改成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false, "修改失败!");
        }
    }

    //删除
    @RequestMapping("/dele/{ids}")
    public Result dele(@PathVariable("ids") Long[] ids) {
        try {
            specificationService.dele(ids);
            return new Result(true, "删除成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false, "删除失败!");
        }
    }

    //    条件查询
    @RequestMapping("/search")
    public PageResult search(int pageNo, int pageSize,@RequestBody TbSpecification specification) {
        return specificationService.findPage(pageNo, pageSize,specification);
    }
}
