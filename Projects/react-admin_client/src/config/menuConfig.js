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
} from '@ant-design/icons'
  
const menuList = [
    {
        title: 'Home', 
        key: '/home', 
        icon: <HomeOutlined style={{fontSize: 20}}/>, 
        isPublic: true, 
    },
    {
        title: 'Commodity',
        key: '/products',
        icon: <AppstoreOutlined style={{fontSize: 20}}/>,
        children: [
            {
                title: 'Category',
                key: '/category',
                icon: <BarsOutlined style={{fontSize: 20}}/>,
            },
            {
                title: 'Product',
                key: '/product',
                icon: <BarcodeOutlined style={{fontSize: 20}}/>,
            },
        ]
    },  
    {
        title: 'User',
        key: '/user',
        icon: <UserOutlined style={{fontSize: 20}}/>,
    },
    {
        title: 'Role',
        key: '/role',
        icon: <SafetyOutlined style={{fontSize: 20}}/>,
    },  
    {
        title: 'Charts',
        key: '/charts',
        icon: <AreaChartOutlined style={{fontSize: 20}}/>,
        children: [
            {
                title: 'Bar',
                key: '/charts/bar',
                icon: <BarChartOutlined style={{fontSize: 20}}/>,
            },
            {
                title: 'Line',
                key: '/charts/line',
                icon: <LineChartOutlined style={{fontSize: 20}}/>,
            },
            {
                title: 'Pie',
                key: '/charts/pie',
                icon: <PieChartOutlined style={{fontSize: 20}}/>,
            },
        ]
    }
]
  
export default menuList