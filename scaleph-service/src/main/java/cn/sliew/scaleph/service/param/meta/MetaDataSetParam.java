package cn.sliew.scaleph.service.param.meta;

import cn.sliew.scaleph.service.param.PaginationParam;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * @author gleiyu
 */
@EqualsAndHashCode(callSuper = true)
@Data
public class MetaDataSetParam extends PaginationParam {

    @ApiModelProperty(value = "参考数据类型编码")
    private String dataSetTypeCode;

    @ApiModelProperty(value = "代码code")
    private String dataSetCode;

    @ApiModelProperty(value = "代码值")
    private String dataSetValue;
}