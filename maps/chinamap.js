(function () {

    var projection = d3.geo.mercator()
            .center([107, 31])
            .scale(420)
            .translate([cw / 2, ch / 2]);

    var path = d3.geo.path()
            .projection(projection);

    var canvas = makeCanvas('中国地图');

    function paint (data) {
        var color = d3.scale.category20();

        canvas.selectAll('path')
            .data(data.features)
            .enter()
            .append('path')
            .attr('fill', 'steelblue')
            .attr('stroke', '#ccc')
            .attr('stroke-width', 1)
            .attr('d', path)
            .on('mouseover', function() {
                d3.select(this)
                    .transition()
                    .duration(100)
                    .attr('fill', 'green');
            })
            .on('mouseout', function() {
                d3.select(this)
                    .transition()
                    .duration(500)
                    .attr('fill', 'steelblue');
            })

    }


    d3.json('datas/china.geojson', function(err, data) {
        if (err) console.log(err);
        else paint(data);
    })

})();
