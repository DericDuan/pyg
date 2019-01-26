package com.pyg.sellergoods.service;

import com.pyg.pojo.TbSpecification;
import entity.PageResult;
import groupEntity.Specification;

import java.util.List;
import java.util.Map;

/**
 * @ClassName SpecificationService
 * @Description TODO
 * @Author Deric
 * @Date 2019/1/20 19:17
 * @Version 1.0
 **/
public interface SpecificationService {

    public List<TbSpecification> findAll();

    PageResult findPage(int pageNo, int pageSize);

    void add(Specification specification);

    Specification findOne(Long id);

    public void update(Specification specification);

    void dele(Long[] ids);

//    public List<TbSpecification> search(TbSpecification specification);

    public PageResult findPage(int pageNo, int pageSize, TbSpecification specification);

    List<Map> findSpecList();

}
