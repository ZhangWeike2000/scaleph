import {PageResponse, ResponseBody} from '@/app.d';
import {request} from 'umi';
import {
  WsFlinkKubernetesSessionCluster,
  WsFlinkKubernetesSessionClusterParam,
  WsFlinkKubernetesTemplate
} from './typings';

export const WsFlinkKubernetesSessionClusterService = {
  url: '/api/flink/kubernetes/session-cluster',

  list: async (queryParam: WsFlinkKubernetesSessionClusterParam) => {
    return request<PageResponse<WsFlinkKubernetesSessionCluster>>(`${WsFlinkKubernetesSessionClusterService.url}`, {
      method: 'GET',
      params: queryParam,
    }).then((res) => {
      const result = {
        data: res.records,
        total: res.total,
        pageSize: res.size,
        current: res.current,
      };
      return result;
    });
  },

  selectOne: async (id: number) => {
    return request<ResponseBody<WsFlinkKubernetesSessionCluster>>(`${WsFlinkKubernetesSessionClusterService.url}/` + id, {
      method: 'GET',
    });
  },

  asYAML: async (row: WsFlinkKubernetesSessionCluster) => {
    return request<ResponseBody<any>>(`${WsFlinkKubernetesSessionClusterService.url}/asYAML`, {
      method: 'POST',
      data: row,
    });
  },

  fromTemplate: async (row: WsFlinkKubernetesTemplate) => {
    return request<ResponseBody<any>>(`${WsFlinkKubernetesSessionClusterService.url}/fromTemplate`, {
      method: 'POST',
      data: row,
    });
  },

  add: async (row: WsFlinkKubernetesSessionCluster) => {
    return request<ResponseBody<any>>(`${WsFlinkKubernetesSessionClusterService.url}`, {
      method: 'PUT',
      data: row,
    });
  },

  update: async (row: WsFlinkKubernetesSessionCluster) => {
    return request<ResponseBody<any>>(`${WsFlinkKubernetesSessionClusterService.url}`, {
      method: 'POST',
      data: row,
    });
  },

  delete: async (row: WsFlinkKubernetesSessionCluster) => {
    return request<ResponseBody<any>>(`${WsFlinkKubernetesSessionClusterService.url}/` + row.id, {
      method: 'DELETE',
    });
  },

  deleteBatch: async (rows: WsFlinkKubernetesSessionCluster[]) => {
    const params = rows.map((row) => row.id);
    return request<ResponseBody<any>>(`${WsFlinkKubernetesSessionClusterService.url}/batch`, {
      method: 'DELETE',
      data: params,
    });
  },

  deploy: async (row: WsFlinkKubernetesSessionCluster) => {
    return request<ResponseBody<any>>(`${WsFlinkKubernetesSessionClusterService.url}/deploy/${row.id}`, {
      method: 'POST',
    });
  },

  shutdown: async (row: WsFlinkKubernetesSessionCluster) => {
    return request<ResponseBody<any>>(`${WsFlinkKubernetesSessionClusterService.url}/shutdown/${row.id}`, {
      method: 'POST',
    });
  },

};