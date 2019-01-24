package com.pyg.manager.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pyg.pojo.TbBrand;
import com.pyg.sellergoods.service.BrandService;
import entity.PageResult;
import entity.Result;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @ClassName BrandController
 * @Description TODO
 * @Author Deric
 * @Date 2019/1/20 19:45
 * @Version 1.0
 **/
@RestController
@RequestMapping("/brand")
public class BrandController {

    @Reference
    private BrandService brandService;

    public BrandController() {
        System.out.println("==========================");
    }

    @RequestMapping("/findAll")
    public List<TbBrand> findAll() {
        return brandService.findAll();
    }


    @RequestMapping("/findPage")
    public PageResult findPage(int pageNo, int pageSize) {
        return brandService.findPage(pageNo, pageSize);
    }

    @RequestMapping("/add")
    public Result add(@RequestBody TbBrand brand) {
        try {
            brandService.add(brand);
            return new Result(true, "保存成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false, "保存失败!");
        }
    }

    //查询单个
    @RequestMapping("/findOne/{id}")
    public TbBrand findOne(@PathVariable("id") Long id) {
        return brandService.findOne(id);
    }

    @RequestMapping("/update")
    public Result update(@RequestBody TbBrand brand) {
        try {
            brandService.update(brand);
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
            brandService.dele(ids);
            return new Result(true, "删除成功!");
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false, "删除失败!");
        }
    }

    //    条件查询
    @RequestMapping("/search")
    public PageResult search(int pageNo, int pageSize,@RequestBody TbBrand brand) {
        return brandService.findPage(pageNo, pageSize,brand);
    }
}
