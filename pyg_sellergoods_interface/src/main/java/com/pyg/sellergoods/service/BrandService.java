package com.pyg.sellergoods.service;

import com.pyg.pojo.TbBrand;
import entity.PageResult;

import java.util.List;
import java.util.Map;

/**
 * @ClassName BrandService
 * @Description TODO
 * @Author Deric
 * @Date 2019/1/20 19:17
 * @Version 1.0
 **/
public interface BrandService {

    public List<TbBrand> findAll();

    PageResult findPage(int pageNo, int pageSize);

    void add(TbBrand brand);

    TbBrand findOne(Long id);

    public void update(TbBrand brand);

    void dele(Long[] ids);

//    public List<TbBrand> search(TbBrand brand);

    public PageResult findPage(int pageNo, int pageSize, TbBrand brand);

    List<Map> findBrandList();
}
