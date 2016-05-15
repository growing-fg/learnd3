(function(){
    /**
     * 集群图
     */

    var canvas = makeCanvas('集群图', true);

    var cluster = d3.layout.cluster()
            .size([2 * Math.PI, cw / 2 * 0.7]);

    function paintCluster (data) {
        var nodes = cluster.nodes(data);
        var links = cluster.links(nodes);

        // 对角贝塞尔曲线
        var diagonal = d3.svg.diagonal()
                .projection(function (d) {
                    return [d.y * Math.cos(d.x),
                            d.y * Math.sin(d.x)]
                }); // 调换x、y，使图垂直显示

        canvas.selectAll('.link')
            .data(links)
            .enter()
            .append('path')
                .attr('class', 'link')
                .attr('d', diagonal);

        var nodes = canvas.selectAll('.node')
            .data(nodes)
            .enter()
            .append('g')
                .attr('transform', function (d) { return 'translate(' + diagonal.projection()(d) + ')'})
                .attr('class', 'node')
                .attr('fill', 'white')
                .attr('stroke', 'steelblue')
                .attr('strokeWidth', 2);

        nodes.append('circle')
                .attr('r', 5);

        nodes.append('text')
            .attr('alignment-baseline', 'middle')
            .attr('text-anchor', function (d) { return Math.cos(d.x) >= 0 ? 'start' : 'end'})
            .attr('dx', function (d) { return Math.cos(d.x) >= 0 ? 10 : -10})
            .attr('transform', function (d) {
                return [
                    'rotate(', d.x * 180 / Math.PI + (Math.cos(d.x) >= 0 ? 0 : 180), ')',
                ].join(' ');
            })
            .text(function (d) { return d.name});
    }

    // 加载数据
    d3.json('datas/city2.json', function(err, data) {
        if (err) console.log(err);
        else paintCluster(data);
    })
})();
