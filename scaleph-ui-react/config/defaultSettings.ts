import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  primaryColor: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  splitMenus: true,
  title: 'Scaleph',
  pwa: false,
  logo: 'https://res.hc-cdn.com/x-roma-components/1.0.10/assets/devui/logo.svg',
  iconfontUrl: '',
};

export default Settings;
