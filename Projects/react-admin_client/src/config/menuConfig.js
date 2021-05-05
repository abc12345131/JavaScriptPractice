import {
  HomeOutlined,
  AppstoreOutlined,
  BarsOutlined,
  BarcodeOutlined,
  UserOutlined,
  SafetyOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  OrderedListOutlined,
} from '@ant-design/icons';

const  menuList = [
  {
    title: 'Home', 
    key: '/home', 
    icon: <HomeOutlined />, 
    isPublic: true, 
  },
  {
    title: 'Commodity',
    key: '/products',
    icon: <AppstoreOutlined />,
    children: [
      {
        title: 'Category Management',
        key: '/category',
        icon: <BarsOutlined />,
      },
      {
        title: 'Product Management',
        key: '/product',
        icon: <BarcodeOutlined />,
      },
    ]
  },

  {
    title: 'User Management',
    key: '/user',
    icon: <UserOutlined />,
  },
  {
    title: 'Role Management',
    key: '/role',
    icon: <SafetyOutlined />,
  },

  {
    title: 'Charts',
    key: '/charts',
    icon: <AreaChartOutlined />,
    children: [
      {
        title: 'Bar',
        key: '/charts/bar',
        icon: <BarChartOutlined />,
      },
      {
        title: 'Line',
        key: '/charts/line',
        icon: <LineChartOutlined />,
      },
      {
        title: 'Pie',
        key: '/charts/pie',
        icon: <PieChartOutlined />,
      },
    ]
  },

  {
    title: 'Order',
    key: '/order',
    icon: <OrderedListOutlined />,
  },
]

export default menuList