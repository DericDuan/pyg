package com.pyg.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pyg.mapper.TbBrandMapper;
import com.pyg.pojo.TbBrand;
import com.pyg.pojo.TbBrandExample;
import com.pyg.sellergoods.service.BrandService;
import entity.PageResult;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * @ClassName BrandServiceImpl
 * @Description TODO
 * @Author Deric
 * @Date 2019/1/20 19:31
 * @Version 1.0
 **/
@Service
@Transactional
public class BrandServiceImpl implements BrandService {

    @Autowired
    private TbBrandMapper brandMapper;

    @Override
    public List<TbBrand> findAll() {
        return brandMapper.selectByExample(null);
    }

    @Override
    public PageResult findPage(int pageNo, int pageSize) {
        PageHelper.startPage(pageNo, pageSize);
        Page<TbBrand> page = (Page<TbBrand>) brandMapper.selectByExample(null);
        return new PageResult(page.getTotal(), page.getResult());
    }

    @Override
    public void add(TbBrand brand) {
        brandMapper.insert(brand);
    }

    @Override
    public TbBrand findOne(Long id) {
        return brandMapper.selectByPrimaryKey(id);
    }

    @Override
    public void update(TbBrand brand) {
        brandMapper.updateByPrimaryKey(brand);
    }

    @Override
    public void dele(Long[] ids) {
        for (Long id : ids) {
            brandMapper.deleteByPrimaryKey(id);
        }
    }

//    @Override
//    public List<TbBrand> search(TbBrand brand) {
//        return brandMapper.search(brand);
//
//    }

    @Override
    public PageResult findPage(int pageNo, int pageSize, TbBrand brand) {
        PageHelper.startPage(pageNo, pageSize);
//        Page<TbBrand> page= (Page<TbBrand>) brandMapper.search(brand);
//        创建条件对象
        TbBrandExample example = new TbBrandExample();
//        创建criteria对象,加入判断条件
        TbBrandExample.Criteria criteria = example.createCriteria();

        if (brand.getName()!=null&&!brand.getName().equals("")){
            criteria.andNameLike("%" + brand.getName() + "%");
        }
//        使用StringUtils工具类(commons)的isNotBlank方法判断非空
        if (StringUtils.isNotBlank(brand.getFirstChar())){
            criteria.andFirstCharEqualTo(brand.getFirstChar());
        }

//        返回一个page对象
        Page<TbBrand> page = (Page<TbBrand>) brandMapper.selectByExample(example);
        return new PageResult(page.getTotal(), page.getResult());
    }

    @Override
    public List<Map> findBrandList() {
       return brandMapper.findBrandList();
    }
}
