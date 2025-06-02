// 初始化地图
const map = new AMap.Map('map-container', {
    zoom: 5,  // 初始缩放级别改为5以显示整个中国
    center: [116.397428, 39.90923],  // 初始中心点坐标（北京）
    viewMode: '2D',  // 使用2D模式
    mapStyle: 'amap://styles/satellite',  // 使用深色地图样式
    features: ['bg', 'road', 'building', 'point']  // 显示的要素
});

// 添加地图控件
map.addControl(new AMap.Scale({
    theme: 'dark'  // 使用深色主题的比例尺
}));

map.addControl(new AMap.ToolBar({
    theme: 'dark'  // 使用深色主题的工具条
}));

// 启用滚轮缩放
map.setStatus({
    scrollWheel: true
});

// 添加鼠标滚轮事件监听
map.on('mousewheel', function(e) {
    e.preventDefault();
    const delta = e.deltaY || e.delta || e.wheelDelta;
    if (delta > 0) {
        map.zoomIn();
    } else {
        map.zoomOut();
    }
});

// 定义城市数据
const cities = [
    { name: '广州市', location: [113.264385, 23.129112], index: 1.56 },
    { name: '香港', location: [114.165460, 22.275340], index: 1.53 },
    { name: '伊犁州', location: [81.317946, 43.921860], index: 1.53 },
    { name: '新乡市', location: [113.926800, 35.303004], index: 1.51 },
    { name: '济南市', location: [117.000923, 36.675807], index: 1.50 }
];

// 添加城市标记和圆形区域
cities.forEach(city => {
    // 创建标记点
    const marker = new AMap.Marker({
        position: city.location,
        title: `${city.name} - 拥堵指数: ${city.index}`
    });
    
    // 创建圆形区域表示拥堵程度
    const circle = new AMap.Circle({
        center: city.location,
        radius: 50000,  // 50公里半径
        fillColor: getColorByIndex(city.index),  // 根据拥堵指数设置颜色
        fillOpacity: 0.3,
        strokeWeight: 1,
        strokeColor: getColorByIndex(city.index),
        strokeOpacity: 0.8
    });
    
    map.add([marker, circle]);
});

// 根据拥堵指数返回对应的颜色
function getColorByIndex(index) {
    if (index >= 1.5) return '#FF4D4F';  // 严重拥堵
    if (index >= 1.3) return '#FAAD14';  // 中度拥堵
    return '#52C41A';  // 畅通
} 