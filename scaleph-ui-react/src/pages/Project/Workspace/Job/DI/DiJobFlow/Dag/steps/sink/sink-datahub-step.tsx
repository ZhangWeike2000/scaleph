import { ModalFormProps } from '@/app.d';
import { WsDiJobService } from '@/services/project/WsDiJob.service';
import { WsDiJob } from '@/services/project/typings';
import { ProForm, ProFormDigit, ProFormText } from '@ant-design/pro-components';
import { NsGraph } from '@antv/xflow';
import { Button, Drawer, Form, message, Modal } from 'antd';
import { useEffect } from 'react';
import { getIntl, getLocale } from 'umi';
import { DatahubParams, STEP_ATTR_TYPE } from '../../constant';
import { InfoCircleOutlined } from '@ant-design/icons';
import DataSourceItem from '@/pages/Project/Workspace/Job/DI/DiJobFlow/Dag/steps/dataSource';

const SinkDatahubStepForm: React.FC<
  ModalFormProps<{
    node: NsGraph.INodeConfig;
    graphData: NsGraph.IGraphData;
    graphMeta: NsGraph.IGraphMeta;
  }>
> = ({ data, visible, onCancel, onOK }) => {
  const nodeInfo = data.node.data;
  const jobInfo = data.graphMeta.origin as WsDiJob;
  const jobGraph = data.graphData;
  const intl = getIntl(getLocale(), true);
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldValue(STEP_ATTR_TYPE.stepTitle, nodeInfo.data.displayName);
  }, []);

  return (
    <Drawer
      open={visible}
      title={nodeInfo.data.displayName}
      width={780}
      bodyStyle={{ overflowY: 'scroll'}}
      destroyOnClose={true}
      onClose={onCancel}
      extra={
        <Button
          type="primary"
          onClick={() => {
            form.validateFields().then((values) => {
              let map: Map<string, any> = new Map();
              map.set(STEP_ATTR_TYPE.jobId, jobInfo.id);
              map.set(STEP_ATTR_TYPE.jobGraph, JSON.stringify(jobGraph));
              map.set(STEP_ATTR_TYPE.stepCode, nodeInfo.id);
              map.set(STEP_ATTR_TYPE.stepAttrs, values);
              WsDiJobService.saveStepAttr(map).then((resp) => {
                if (resp.success) {
                  message.success(intl.formatMessage({ id: 'app.common.operate.success' }));
                  onOK ? onOK(values) : null;
                }
              });
            });
          }}
        >
          {intl.formatMessage({ id: 'app.common.operate.confirm.label' })}
        </Button>
      }
    >
      <ProForm form={form} initialValues={nodeInfo.data.attrs} grid={true} submitter={false}>
        <ProFormText
          name={STEP_ATTR_TYPE.stepTitle}
          label={intl.formatMessage({ id: 'pages.project.di.step.stepTitle' })}
          rules={[{ required: true }, { max: 120 }]}
        />
        <DataSourceItem dataSource={'DataHub'} />
        <ProFormText
          name={DatahubParams.project}
          label={intl.formatMessage({ id: 'pages.project.di.step.datahub.project' })}
          rules={[{ required: true }]}
        />
        <ProFormText
          name={DatahubParams.topic}
          label={intl.formatMessage({ id: 'pages.project.di.step.datahub.topic' })}
          rules={[{ required: true }]}
        />
        <ProFormDigit
          name={DatahubParams.timeout}
          label={intl.formatMessage({ id: 'pages.project.di.step.datahub.timeout' })}
          initialValue={1000}
          fieldProps={{
            step: 1000,
            min: 0,
          }}
        />
        <ProFormDigit
          name={DatahubParams.retryTimes}
          label={intl.formatMessage({ id: 'pages.project.di.step.datahub.retryTimes' })}
          tooltip={{
            title: intl.formatMessage({ id: 'pages.project.di.step.datahub.retryTimes.tooltip' }),
            icon: <InfoCircleOutlined />,
          }}
          initialValue={0}
          fieldProps={{
            min: 0,
          }}
        />
      </ProForm>
    </Drawer>
  );
};

export default SinkDatahubStepForm;
