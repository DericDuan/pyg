package com.pyg.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.pyg.mapper.TbSpecificationMapper;
import com.pyg.mapper.TbSpecificationOptionMapper;
import com.pyg.pojo.TbSpecification;
import com.pyg.pojo.TbSpecificationExample;
import com.pyg.pojo.TbSpecificationOption;
import com.pyg.pojo.TbSpecificationOptionExample;
import com.pyg.sellergoods.service.SpecificationService;
import entity.PageResult;
import groupEntity.Specification;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * @ClassName SpecificationServiceImpl
 * @Description TODO
 * @Author Deric
 * @Date 2019/1/20 19:31
 * @Version 1.0
 **/
@Service
@Transactional
public class SpecificationServiceImpl implements SpecificationService {

    @Autowired
    private TbSpecificationMapper specificationMapper;
    @Autowired
    private TbSpecificationOptionMapper tbSpecificationOptionMapper;

    @Override
    public List<TbSpecification> findAll() {
        return specificationMapper.selectByExample(null);
    }

    @Override
    public PageResult findPage(int pageNo, int pageSize) {
        PageHelper.startPage(pageNo, pageSize);
        Page<TbSpecification> page = (Page<TbSpecification>) specificationMapper.selectByExample(null);
        return new PageResult(page.getTotal(), page.getResult());
    }

    @Override
    public void add(Specification specification) {
        //一起保存两个表的数据
        TbSpecification tbSpecification = specification.getTbSpecification();
        List<TbSpecificationOption> tbSpecificationOptionList = specification.getTbSpecificationOptionList();
        specificationMapper.insert(tbSpecification);//插入完成后需要返回主键id
        for (TbSpecificationOption tbSpecificationOption : tbSpecificationOptionList) {
            tbSpecificationOption.setSpecId(tbSpecification.getId());
            tbSpecificationOptionMapper.insert(tbSpecificationOption);
        }
    }

    @Override
    public Specification findOne(Long id) {
        Specification specification = new Specification();
//        查询主表
        TbSpecification tbSpecification = specificationMapper.selectByPrimaryKey(id);

        specification.setTbSpecification(tbSpecification);
        //       查询从表
        TbSpecificationOptionExample example = new TbSpecificationOptionExample();
        example.createCriteria().andSpecIdEqualTo(id);
        example.setOrderByClause("orders desc");//默认
        List<TbSpecificationOption> tbSpecificationOptions = tbSpecificationOptionMapper.selectByExample(example);
        specification.setTbSpecificationOptionList(tbSpecificationOptions);
        return specification;
    }

    @Override
    public void update(Specification specification) {
//        一起修改两个表
//        修改主表没问题
        TbSpecification tbSpecification = specification.getTbSpecification();
        specificationMapper.updateByPrimaryKey(tbSpecification);
//        修改从表
        //先把此规格下的规格小项清除
        TbSpecificationOptionExample example=new TbSpecificationOptionExample();
        example.createCriteria().andSpecIdEqualTo(tbSpecification.getId());
        tbSpecificationOptionMapper.deleteByExample(example);

//        重新插入
        List<TbSpecificationOption> tbSpecificationOptionList = specification.getTbSpecificationOptionList();
        for (TbSpecificationOption tbSpecificationOption : tbSpecificationOptionList) {
            tbSpecificationOption.setSpecId(tbSpecification.getId());
            tbSpecificationOptionMapper.insert(tbSpecificationOption);
        }

    }

    @Override
    public void dele(Long[] ids) {
        //要删除两个表
        for (Long id : ids) {
            specificationMapper.deleteByPrimaryKey(id);

            //先把此规格下的规格小项清除
            TbSpecificationOptionExample example=new TbSpecificationOptionExample();
            example.createCriteria().andSpecIdEqualTo(id);
            tbSpecificationOptionMapper.deleteByExample(example);
        }
    }

//    @Override
//    public List<TbSpecification> search(TbSpecification specification) {
//        return specificationMapper.search(specification);
//
//    }

    @Override
    public PageResult findPage(int pageNo, int pageSize, TbSpecification specification) {
        PageHelper.startPage(pageNo, pageSize);
//        Page<TbSpecification> page= (Page<TbSpecification>) specificationMapper.search(specification);
//        创建条件对象
        TbSpecificationExample example = new TbSpecificationExample();
//        创建criteria对象,加入判断条件
        TbSpecificationExample.Criteria criteria = example.createCriteria();

        if (specification.getSpecName()!=null&&!specification.getSpecName().equals("")){
            criteria.andSpecNameLike("%" + specification.getSpecName() + "%");
        }
//

//        返回一个page对象
        Page<TbSpecification> page = (Page<TbSpecification>) specificationMapper.selectByExample(example);
        return new PageResult(page.getTotal(), page.getResult());
    }
}
