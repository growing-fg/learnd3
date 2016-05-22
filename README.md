# learnd3

## **d3.scale  比例转换**
*  linear  线性转换
*  ordinal  序列转换  
    数组元素按索引一一对应
    
## **d3.svg.axis  坐标轴**
*  scale()  定义数据转换
*  orient()  指定方向
*  ticks()  指定刻度个数

## **transition  动态改变状态**
*  duration()  持续时间，单位为毫秒
*  delay()  指定延时启动的时间
*  ease()  指定缓冲类型
    +  linear: 线性改变
    +  circle: 逐渐回事
    +  elastic: 超出终点反弹回最终状态
    +  bounce: 终点处反弹

## **d3.geom.voronoi  泰森多边形**
*  voronoi(data)  返回多边形数组，每个多边形是个点坐标数组[[x,y], [x,y]...]
    data是一个点坐标数组[[x,y],[x,y]...]
*  voronoi.links(data)  返回link数据，这些link是三角形的边