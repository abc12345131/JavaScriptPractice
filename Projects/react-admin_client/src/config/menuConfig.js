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
    PieChartOutlined
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
        key: '/commodity',
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
                title: 'Acquisition',
                key: '/charts/acquisition',
                icon: <LineChartOutlined style={{fontSize: 20}}/>,
            },
            {
                title: 'Demographics',
                key: '/charts/demographics',
                icon: <PieChartOutlined style={{fontSize: 20}}/>,
            },
            {
                title: 'Engagement',
                key: '/charts/engagement',
                icon: <BarChartOutlined style={{fontSize: 20}}/>,
            },
        ]
    }
]
  
export default menuList