package com.offcn.manager.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.offcn.entity.PageResult;
import com.offcn.entity.Result;
import com.offcn.pojo.TbBrand;
import com.offcn.sellergoods.service.BrandService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;
/*
查询所有方法
*/
@RestController
@RequestMapping("/brand")
public class BrandController {
    /*
        远程的注入
    */
    @Reference
    private BrandService brandService;


    /*
       分页查询
    */
    @RequestMapping("/findPage")
    public PageResult findPage(int page, int rows) {
        return brandService.findPage(page, rows);
    }

    /*
        增加品牌
    */
   @RequestMapping("/add")
    public Result add(TbBrand brand){
       try {
           brandService.add(brand);
           return new Result(true,"增加成功");
       }catch (Exception e){
           e.printStackTrace();
           return new Result(false,"增加失败");
       }
   }


   @RequestMapping("/findOne")
    public TbBrand findOne(Long id){
       return brandService.findOne(id);
   }

   @RequestMapping("/update")
    public Result update(TbBrand brand){
       try {
           brandService.update(brand);
           return new Result(true,"修改成功");
       }catch (Exception e){
           e.printStackTrace();
           return new Result(false,"修改失败");
       }
   }

    @RequestMapping("/dele")
    public Result dele(Long [] ids){
        try {
            brandService.delete(ids);
            return new Result(true,"删除成功");
        }catch (Exception e){
            e.printStackTrace();
            return new Result(false,"删除失败");
        }
    }

        /*
           条件分页查询
        */
    @RequestMapping("/search")
    public PageResult search(@RequestBody TbBrand brand, int page, int rows) {
        return brandService.findPage(brand,page, rows);
    }




}























